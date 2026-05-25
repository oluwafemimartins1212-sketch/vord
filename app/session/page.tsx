'use client';

import { useState } from 'react';

export default function SessionPage() {
  const [method, setMethod] = useState<'pairing' | 'qr'>('pairing');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    setPairingCode('');
    setQrCode('');
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, phoneNumber: method === 'pairing' ? phoneNumber : undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');
      if (data.pairingCode) setPairingCode(data.pairingCode);
      if (data.qr) setQrCode(data.qr);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-2">Generate Session</h1>
        <p className="text-center text-gray-400 mb-8">Create a session ID for your Vord Wa Bot using either pairing code or QR code method.</p>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setMethod('pairing')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${method === 'pairing' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Pair with Code
            </button>
            <button
              onClick={() => setMethod('qr')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${method === 'qr' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Scan QR Code
            </button>
          </div>

          {method === 'pairing' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Enter Phone Number with Country Code</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+2347025431762"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">{error}</div>}

          {pairingCode && (
            <div className="mb-6 p-4 bg-gray-900 border border-purple-500 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Your 8-digit pairing code:</p>
              <p className="text-3xl font-mono font-bold text-purple-400">{pairingCode}</p>
              <p className="text-xs text-gray-500 mt-2">Open WhatsApp → Settings → Linked Devices → Link a Device → Enter this code</p>
            </div>
          )}

          {qrCode && (
            <div className="mb-6 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCode} alt="QR Code" className="border-4 border-white rounded-xl" />
            </div>
          )}

          <button
            onClick={generate}
            disabled={isLoading || (method === 'pairing' && !phoneNumber)}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed rounded-lg font-semibold transition"
          >
            {isLoading ? 'Generating...' : method === 'pairing' ? 'Generate Pairing Code' : 'Generate QR Code'}
          </button>
        </div>
      </div>
    </main>
  );
}