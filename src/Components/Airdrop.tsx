import { useWallet} from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState } from "react";

const RequestAirdrop: React.FC = () => {
  // The useWallet Hook is used to access the wallet public key
  const wallet = useWallet();
  const { connection } = useConnection(); // to provide connection with RPC to send airdrop

  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleRequestAirdrop = async () => {
    if (!wallet.publicKey) {
      setMessage("Wallet is not connected.");
      setLoading(false);
      return;
    }
    setLoading(true);
    await connection.requestAirdrop(wallet.publicKey, Number(amount) * LAMPORTS_PER_SOL);
    setMessage("");

    // Simulating an API call
    setTimeout(() => {
      setLoading(false);
      if (wallet.publicKey) {
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
        setMessage(`Successfully requested ${amount} tokens!`);
      } else {
        setMessage("Failed to request airdrop: No wallet connected.");
      }
      setAmount("");
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Your Public Key {wallet.publicKey.toString().slice(0, 8) + "..." + wallet.publicKey.toString().slice(-8)}
      </h2> */}
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            Ξ
          </span>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full pl-8 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
            placeholder="Enter amount"
          />
        </div>
        <button
          onClick={handleRequestAirdrop}
          disabled={loading || !amount}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${loading || !amount
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            "Request Airdrop"
          )}
        </button>
      </div>
      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default RequestAirdrop;
