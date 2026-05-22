'use client';

import { useState } from 'react';

export default function SessionGenerator() {
  const [method, setMethod] = useState<'pairing' | 'qr'>('pairing');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const generate = async () => {
    setPairingCode('');
    setQrImage('');
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const body: any = { method };
      if (method === 'pairing') {
        if (!phoneNumber) {
          throw new Error('Phone number is required for pairing code');
        }
        body.phoneNumber = phoneNumber;
      }

      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate');
      }

      if (data.pairingCode) {
        setPairingCode(data.pairingCode);
      } else if (data.qr) {
        setQrImage(data.qr);
      } else if (data.message) {
        setSuccessMessage(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Vord Session Manager
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Connect your WhatsApp bot using pairing code (8 digits) or QR code.
        </p>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          {/* Method selector */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMethod('pairing')}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                method === 'pairing' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Pairing Code (8 digits)
            </button>
            <button
              onClick={() => setMethod('qr')}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                method === 'qr' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              QR Code
            </button>
          </div>

          {/* Phone number input (only for pairing) */}
          {method === 'pairing' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your WhatsApp Number (with country code)
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., 447700900000 (no '+' or spaces)"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/50 border border-red-700 text-red-200 text-sm">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-green-900/50 border border-green-700 text-green-200 text-sm">
              {successMessage}
            </div>
          )}

          {pairingCode && (
            <div className="mb-6 p-4 rounded-lg bg-gray-900 border border-purple-500 text-center">
              <p className="text-sm text-gray-400 mb-2">Your 8-digit pairing code:</p>
              <p className="text-3xl font-mono font-bold text-purple-400">{pairingCode}</p>
              <p className="text-xs text-gray-500 mt-2">
                Open WhatsApp → Settings → Linked Devices → Link a Device → Enter this code
              </p>
            </div>
          )}

          {qrImage && (
            <div className="mb-6 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrImage} alt="QR Code" className="border-4 border-white rounded-xl" />
            </div>
          )}

          <button
            onClick={generate}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed rounded-lg font-semibold transition"
          >
            {isLoading ? 'Connecting...' : 'Generate & Connect'}
          </button>
        </div>
      </div>
    </main>
  );
}