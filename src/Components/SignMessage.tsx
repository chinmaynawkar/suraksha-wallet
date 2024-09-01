import React, { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

const SignMessage: React.FC = () => {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onClick = async () => {
    setError(null);
    setSignature(null);

    try {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        throw new Error("Message signature invalid!");
      }
      setSignature(bs58.encode(signature));
      console.log("Success", `Message signature: ${bs58.encode(signature)}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-50">
        Sign Message
      </h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
          placeholder="Enter message"
        />
        <button
          onClick={onClick}
          className="w-full py-2 px-4 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign Message
        </button>
        {signature && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            Signature: {signature.slice(0, 10) + "..." + signature.slice(-10)}
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignMessage;
