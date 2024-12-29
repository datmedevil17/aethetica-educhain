import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { ethers } from "ethers"; // Import ethers.js

const Profile = () => {
  const { account, state } = useContext(WalletContext);
  const { core } = state;

  const [profile, setProfile] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [isRegisteredArtist, setIsRegisteredArtist] = useState(false);

  // Fetch artist's profile and designs
  useEffect(() => {
    if (core) {
      checkIfRegisteredArtist(core, account);
      fetchDesigns(core, account);
    }
  }, );

  // Check if the current account is a registered artist
  const checkIfRegisteredArtist = async (contract, address) => {
    const artist = await contract.artists(address);
    if (artist.registered) {
      setProfile(artist);  // Set the artist's profile if registered
      setIsRegisteredArtist(true);
    } else {
      setIsRegisteredArtist(false);
    }
  };

  // Fetch designs based on whether the user is an artist or not
  const fetchDesigns = async (contract, address) => {
    try {
      if (isRegisteredArtist) {
        // Fetch all designs created by the registered artist
        const totalDesigns = await contract.tokenCounter();
        const artistDesigns = [];

        for (let i = 0; i < totalDesigns; i++) {
          const design = await contract.designs(i); // Fetch designs
          if (design.creator === address) {
            artistDesigns.push(design);
          }
        }
        setDesigns(artistDesigns); // Set the designs for the artist
      } else {
        // Fetch all designs bought by the user if not an artist
        const boughtDesigns = await contract.userOwnedDesigns(address);
        setDesigns(boughtDesigns); // Set the bought designs
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        {isRegisteredArtist ? "Artist Profile" : "Customer Profile"}
      </h2>

      {profile && isRegisteredArtist ? (
        <div className="flex justify-center mb-6">
          <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={profile.profileURI}
              alt="Profile Picture"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold">{profile.name}</h3>
              <p className="text-gray-600">Registered Artist</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-6">
          <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-2xl font-semibold">Customer Profile</h3>
              <p className="text-gray-600">{account}</p>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold mb-4">My Designs</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {designs.length > 0 ? (
          designs.map((design) => (
            <div key={design.tokenId} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={design.designURI}
                alt={`Design ${design.tokenId}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">Price: {ethers.formatUnits(design.price)} ETH</h3>
                <p className="text-gray-600">Likes: {(design.likes).toString()}</p>

                {/* Add Premium or General tags without changing the card color */}
                <div className="mt-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${
                      design.category === "Premium"
                        ? "border-yellow-400 text-yellow-400"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    {design.category === "Premium" ? "Premium" : "General"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-500">No designs available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
