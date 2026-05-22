// File: app/api/session/route.ts

import { NextResponse } from 'next/server';
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason, Browsers } from '@whiskeysockets/baileys';
import Pino from 'pino';
import path from 'path';

const cleanNumber = (num: string) => num.replace(/\D/g, '');

export async function POST(request: Request) {
  try {
    const { method, phoneNumber } = await request.json();

    if (method !== 'pairing') {
      return NextResponse.json({ error: 'Only pairing method is active in this version for troubleshooting' }, { status: 400 });
    }

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const cleanedNumber = cleanNumber(phoneNumber);
    if (cleanedNumber.length < 10) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    // --- Clean Slate: Delete the old session data to ensure a fresh start ---
    const sessionDir = path.join(process.cwd(), 'session_data', `pairing_session`);
    const fs = require('fs');
    if (fs.existsSync(sessionDir)) {
      fs.rmSync(sessionDir, { recursive: true, force: true });
    }
    // --- End of Clean Slate ---

    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,
      auth: state,
      logger: Pino({ level: 'silent' }),
      printQRInTerminal: false,
      // A user-agent string that matches a real browser for better compatibility
      browser: Browsers.macOS('Chrome'), 
    });

    sock.ev.on('creds.update', saveCreds);

    let pairingCodeRequested = false;

    // The main solution: Listen for the connection update event
    const resultPromise = new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Request timed out. Please try again.'));
      }, 60000);

      sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        // *** This is the key change: Wait for the 'connecting' state ***
        if (connection === 'connecting' && !pairingCodeRequested) {
          console.log('Connection is being established, requesting pairing code...');
          pairingCodeRequested = true;
          try {
            // Request the code only when we know the socket is ready
            const code = await sock.requestPairingCode(cleanedNumber);
            console.log(`Pairing code generated: ${code}`);
            clearTimeout(timeoutId);
            resolve({ success: true, pairingCode: code });
            // Perform cleanup after a short delay
            setTimeout(() => {
              sock.end(new Error('Session closed after code generation'));
            }, 3000);
          } catch (error: any) {
            console.error('Error requesting pairing code:', error);
            clearTimeout(timeoutId);
            reject(new Error(error.message || 'Failed to get pairing code'));
          }
        }

        if (connection === 'close') {
          if (!pairingCodeRequested) {
            clearTimeout(timeoutId);
            const errorMessage = (lastDisconnect?.error as any)?.output?.payload?.message || lastDisconnect?.error?.message || 'Connection closed unexpectedly';
            reject(new Error(`Connection failed: ${errorMessage}. Please try again.`));
          }
        }
      });
    });

    const result = await resultPromise;
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}