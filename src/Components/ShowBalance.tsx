import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import SolanaLogo from '../assets/solana-sol-logo.svg'

const ShowSolBalance: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    };

    fetchBalance();
  }, [connection, publicKey]);

  return (
<div className="max-w-sm mx-auto mt-10 p-6 bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg shadow-lg flex items-center space-x-4">      <div className="flex-shrink-0">
        <img src={SolanaLogo} alt="Solana symbol" className="h-10 w-10 rounded-full" />
      </div>
      <div className="flex-1">
        <div className="text-lg font-bold">Current Funds</div>
        <div className="text-sm text-white">
          {publicKey ? `${publicKey.toBase58().slice(0, 6)}...${publicKey.toBase58().slice(-4)}` : 'No Wallet Connected'}
        </div>
      </div>
      <div className="text-xl font-semibold">
        {balance !== null ? `${balance.toFixed(2)} SOL` : 'Loading...'}
      </div>
    </div>
  );
};

export default ShowSolBalance;