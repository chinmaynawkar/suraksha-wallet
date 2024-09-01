import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

const SendTokens: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [to, setTo] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);

  const sendTokens = async () => {
    try {
      if (!wallet.publicKey) throw new Error('Wallet not connected!');
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
      const slicedPublicKey = to.slice(0, 8) + "..." + to.slice(-8);
      setStatus(`Sent ${amount} SOL to ${slicedPublicKey}`);
      console.log(`Sent ${amount} SOL to ${slicedPublicKey}`);
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Tokens</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
          placeholder="Recipient Address"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
          placeholder="Amount in SOL"
        />
        <button
          onClick={sendTokens}
          className="w-full py-2 px-4 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send
        </button>
        {status && (
          <div className={`mt-4 p-3 rounded-md ${status.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendTokens;