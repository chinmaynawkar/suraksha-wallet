import './App.css'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './Components/Airdrop';
import ShowSolBalance from './Components/ShowBalance';
import SignMessage from './Components/SignMessage';
import SendToken from './Components/SendToken'; // Import SendToken component

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-mono">
      <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/oHVsO576901oPGnsan6EGn62_56jXPFj'}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="p-10">
              {/* Header with wallet buttons and description */}
              <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold mb-4">Suraksha Wallet</h1>
                <p className="mb-6">Your डिजिटल World Wallet: Fast, Secure & Convenient.</p>
                <div className="flex justify-center gap-4">
                  <WalletMultiButton className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-lg mb-4" />
                  <WalletDisconnectButton className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg" />
                </div>
              </div>
              {/* Balance and transaction cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className=" bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 rounded-lg shadow-lg">
                  <ShowSolBalance />
                </div>
                <div className=" bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 rounded-lg shadow-lg">
                  <RequestAirdrop />
                </div>
                <div className=" bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 rounded-lg shadow-lg">
                  <SignMessage />
                </div>
                <div className=" bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 rounded-lg shadow-lg">
                  <SendToken />
                </div>
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;