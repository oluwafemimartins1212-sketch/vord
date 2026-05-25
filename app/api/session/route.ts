import { NextResponse } from 'next/server';
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from '@whiskeysockets/baileys';
import Pino from 'pino';
import path from 'path';
import QRCode from 'qrcode';

export async function POST(request: Request) {
  const { method, phoneNumber } = await request.json();
  const sessionId = `session_${Date.now()}`;
  const sessionDir = path.join(process.cwd(), 'session_data', sessionId);

  let sock: any;
  let timeoutId: NodeJS.Timeout;
  let isResolved = false;

  try {
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
      version,
      auth: state,
      logger: Pino({ level: 'silent' }),
      printQRInTerminal: false,
      browser: ['Vord Bot', 'Chrome', '1.0'],
    });

    sock.ev.on('creds.update', saveCreds);

    const resultPromise = new Promise(async (resolve, reject) => {
      timeoutId = setTimeout(() => {
        if (!isResolved) reject(new Error('Request timed out. Please try again.'));
      }, 60000);

      sock.ev.on('connection.update', async (update: any) => {
        const { connection, lastDisconnect, qr } = update;

        if (method === 'qr' && qr && !isResolved) {
          isResolved = true;
          const qrImage = await QRCode.toDataURL(qr);
          clearTimeout(timeoutId);
          sock.end(new Error('Session ended'));
          resolve({ success: true, qr: qrImage });
        }

        if (method === 'pairing' && connection === 'connecting' && !isResolved) {
          try {
            const cleaned = phoneNumber.replace(/\D/g, '');
            if (cleaned.length < 10) throw new Error('Invalid phone number');
            const code = await sock.requestPairingCode(cleaned);
            isResolved = true;
            clearTimeout(timeoutId);
            sock.end(new Error('Session ended'));
            resolve({ success: true, pairingCode: code });
          } catch (err: any) {
            reject(err);
          }
        }

        if (connection === 'close' && !isResolved) {
          reject(new Error(`Connection failed: ${lastDisconnect?.error?.message || 'Unknown reason'}`));
        }
      });
    });

    const result = await resultPromise;
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}