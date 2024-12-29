import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";

const Navbar = () => {
  const { account, connectWallet } = useContext(WalletContext);

  return (
    <div className="flex justify-between items-center px-4 py-5 bg-black text-white sticky top-0 shadow-md">
      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link to="/battle" className="hover:text-gray-300 transition">
          Battle
        </Link>
        <Link to="/canvas" className="hover:text-gray-300 transition">
          Canvas
        </Link>
        <Link to="/marketplace" className="hover:text-gray-300 transition">
          Marketplace
        </Link>
        <Link to="/profile" className="hover:text-gray-300 transition">
          Profile
        </Link>
        <Link to="/artists" className="hover:text-gray-300 transition">
          Artists
        </Link>
      </div>

      {/* Wallet Connect Button */}
      <div className="flex items-center space-x-4">
        {account ? (
          <span className="bg-gray-800 py-2 px-4 rounded-lg shadow-lg">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </span>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition-all"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
