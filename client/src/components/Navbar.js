'use client'
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex justify-between items-center px-4 py-5 bg-gray-900 text-white sticky top-0 shadow-md">
        <div className="flex space-x-6">
          {["Home", "Market", "Canvas", "Battle", "Profile"].map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-white font-medium hover:text-cyan-400 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
