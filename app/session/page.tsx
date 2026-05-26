'use client';

import { useState, useEffect } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_SESSION_BACKEND_URL || 'http://localhost:3002';

export default function SessionPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [requestId, setRequestId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'waiting' | 'complete' | 'error'>('idle');
  const [sessionId, setSessionId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const generatePairing = async () => {
    if (!phoneNumber) {
      setErrorMsg('Please enter your phone number with country code');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    setPairingCode('');
    setSessionId('');
    try {
      const res = await fetch(`${BACKEND_URL}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate pairing code');
      setPairingCode(data.pairingCode);
      setRequestId(data.requestId);
      setStatus('waiting');
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'waiting' && requestId) {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/status/${requestId}`);
          const data = await res.json();
          if (data.sessionId) {
            setSessionId(data.sessionId);
            setStatus('complete');
            clearInterval(interval);
          }
        } catch (err) {
          console.error(err);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [status, requestId]);

  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">Generate Session</h1>
        <p className="text-center text-gray-400 mb-8">Create a session ID for your Vord Wa Bot using pairing code.</p>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Enter Phone Number with Country Code</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+2347025431762"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500"
              disabled={status === 'loading' || status === 'waiting'}
            />
          </div>

          {status === 'loading' && <p className="text-yellow-400">Requesting pairing code...</p>}

          {pairingCode && (
            <div className="mb-6 p-4 bg-gray-900 border border-purple-500 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Your 8-digit pairing code:</p>
              <p className="text-3xl font-mono font-bold text-purple-400">{pairingCode}</p>
              <p className="text-xs text-gray-500 mt-2">Open WhatsApp → Settings → Linked Devices → Link a Device → Enter this code</p>
              {status === 'waiting' && <p className="text-green-400 mt-3">Waiting for you to enter the code on your phone...</p>}
            </div>
          )}

          {status === 'complete' && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg text-center">
              <p className="text-sm text-gray-300 mb-1">Your session ID has been generated!</p>
              <p className="text-xl font-mono font-bold text-green-400 break-all">{sessionId}</p>
              <p className="text-xs text-gray-400 mt-2">Use this Session ID in your deployment script (config.env). A copy was also sent to your WhatsApp.</p>
            </div>
          )}

          {errorMsg && <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">{errorMsg}</div>}

          <button
            onClick={generatePairing}
            disabled={!phoneNumber || status === 'loading' || status === 'waiting'}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed rounded-lg font-semibold transition"
          >
            {status === 'loading' ? 'Generating...' : status === 'waiting' ? 'Waiting for pairing...' : 'Generate Pairing Code'}
          </button>
        </div>
      </div>
    </main>
  );
}