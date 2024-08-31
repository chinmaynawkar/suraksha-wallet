import './App.css'
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import fs from 'fs';
import express from 'express';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './Components/Airdrop';
import ShowSolBalance from './Components/ShowBalance';
import SignMessage from './Components/SignMessage';

function App() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-mono">
      <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/oHVsO576901oPGnsan6EGn62_56jXPFj'}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
              <div className="col-span-1 lg:col-span-2">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <WalletMultiButton className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-lg" />
                  <WalletDisconnectButton className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg" />
                  <div className="text-4xl font-extrabold text-center">
                    Suraksha Wallet
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <ShowSolBalance />
              </div>
              <div className="col-span-1">
                <RequestAirdrop />
              </div>
              <div className="col-span-1">
                <SignMessage />
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;