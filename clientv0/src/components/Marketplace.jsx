import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import axios from "axios";
import { ethers } from "ethers"; // Import ethers.js
import CollabForm from "./CollabForm";

// Modal component
const Modal = ({ showModal, onClose, children }) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 text-xl font-bold absolute top-2 right-2"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const Marketplace = () => {
  const { account, state } = useContext(WalletContext);
  const { core } = state;

  const [artistName, setArtistName] = useState("");
  const [artistProfilePicture, setArtistProfilePicture] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showUploadDesignModal, setShowUploadDesignModal] = useState(false);
  const [showCollaborateModal, setShowCollaborateModal] = useState(false);
  const [category, setCategory] = useState("General");
  const [designType, setDesignType] = useState("Clothing");
  const [price, setPrice] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if the artist is registered when the component mounts
  useEffect(() => {
    const checkArtistRegistration = async () => {
      const artist = await core.artists(account);
      setIsRegistered(artist.registered); // Set the registration status
    };

    if (account) {
      checkArtistRegistration();
    }
  }, [account, core]);

  // Handle form submission for registering an artist
  const registerProfile = async (e) => {
    e.preventDefault();
    const tx = await core.registerArtist(artistName, artistProfilePicture);
    await tx.wait();
    console.log(tx);

    setArtistName("");
    setArtistProfilePicture(null);
    setIsRegistered(true); // Mark as registered after successful transaction
  };

  // Handle file upload to IPFS
  const uploadToIpfs = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `35cb1bf7be19d2a8fa0d`,
            pinata_secret_api_key: `2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        const resData = res.data;
        setArtistProfilePicture(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
      } catch (error) {
        window.alert(error);
      }
    }
  };
  const uploadDesignToIpfs = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `35cb1bf7be19d2a8fa0d`,
            pinata_secret_api_key: `2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        const resData = res.data;
        setTokenURI(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
      } catch (error) {
        window.alert(error);
      }
    }
  };
  const uploadDesign = async(e)=>{
    e.preventDefault()
    console.log(tokenURI,category,designType,price)
    const tx = await core.singleUploadDesign(tokenURI,category,designType,price)
    await tx.wait()
    console.log(tx,"Tx successful")

  }
  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const totalDesigns = await core.tokenCounter(); // Assuming this function is available
      const fetchedDesigns = [];

      for (let i = 1; i <= totalDesigns; i++) {
        const design = await core.designs(i); // Fetch design details by tokenId
        const { tokenId, designURI, category, price, creator, likes } = design;

        // Only add designs with category "General"
        if (category === "General") {
          fetchedDesigns.push({
            tokenId,
            designURI,
            category,
            price: ethers.formatEther(price), // Formatting price from Wei to ETH
            creator,
            likes:likes.toString(),
          });
        }
      }

      setDesigns(fetchedDesigns);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching designs:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (core && account) {
      fetchDesigns();
    }
  }, [core, account]);
  const handleLike = async (tokenId) => {
    try {
      await core.likeDesign(tokenId); // Call the contract to like the design
      fetchDesigns(); // Refresh the designs after liking
    } catch (error) {
      console.error("Error liking the design:", error);
    }
  };
  const handleBuy = async (tokenId, price) => {
    try {
      const transaction = await core.buyDesign(tokenId, {
        value: ethers.parseEther(price), // Convert price to Wei
      });
      await transaction.wait();
      fetchDesigns(); // Refresh after buying
    } catch (error) {
      console.error("Error buying the design:", error);
    }
  };
  // Open/close modals
  const openUploadDesignModal = () => setShowUploadDesignModal(true);
  const closeUploadDesignModal = () => setShowUploadDesignModal(false);
  const openCollaborateModal = () => setShowCollaborateModal(true);
  const closeCollaborateModal = () => setShowCollaborateModal(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>

      {/* Registration Form */}
      {!isRegistered ? (
        <form
          onSubmit={registerProfile}
          className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto"
        >
          {/* Artist Name Input */}
          <div className="mb-4">
            <label
              htmlFor="artistName"
              className="block text-gray-700 font-medium mb-2"
            >
              Artist Name
            </label>
            <input
              type="text"
              id="artistName"
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Enter artist's name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Profile Picture Input */}
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-gray-700 font-medium mb-2"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={uploadToIpfs}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition-all"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={openUploadDesignModal}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transition-all"
          >
            Upload Design
          </button>
          <button
            onClick={openCollaborateModal}
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg shadow-lg transition-all"
          >
            Collaborate
          </button>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {designs.map((design) => (
        <div
          key={design.tokenId}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={design.designURI}
            alt={design.tokenId}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">{design.designType}</h3>
            <p className="text-gray-600">{design.category}</p>
            <p className="mt-2 text-lg font-bold text-gray-800">
              Price: {design.price} ETH
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Creator: {design.creator.slice(0, 6)}...{design.creator.slice(-4)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Likes: {design.likes}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleBuy(design.tokenId)} // Replace with your buy functionality
              >
                Buy
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                onClick={() => handleLike(design.tokenId)} // Replace with your like functionality
              >
                Like
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
      )}


      {/* Modals for Upload Design and Collaborate */}
      <Modal showModal={showUploadDesignModal} onClose={closeUploadDesignModal}>
        <h2 className="text-xl font-semibold mb-4">Upload Design</h2>
        {/* Form for Upload Design */}
        <form className="space-y-4" onSubmit={uploadDesign}>
        <div>
        <label className="block text-gray-700">Category</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="General">General</option>
          <option value="Premium">Premium</option>
        </select>
      </div>


      {/* Design Type Dropdown */}
      <div>
        <label className="block text-gray-700">Design Type</label>
        <select
          onChange={(e) => setDesignType(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="Clothing">Clothing</option>
          <option value="Fabric">Fabric</option>
        </select>
      </div>

      {/* Price Input */}
      <div>
        <label className="block text-gray-700">Price</label>
        <input
          type="text"
          onChange={(e) => setPrice(ethers.parseEther(e.target.value))}
          className="w-full p-3 border rounded-lg"
          placeholder="Enter price in ETH"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Design</label>
        <input
          type="file"
          onChange={uploadDesignToIpfs}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
      >
        Upload Design
      </button>
        </form>
      </Modal>

      <Modal
        showModal={showCollaborateModal}
        onClose={closeCollaborateModal}
      >
        <h2 className="text-xl font-semibold mb-4">Collaborate</h2>
        {/* Form for Collaborate */}
        <CollabForm/>

      </Modal>
    </div>
  );
};

export default Marketplace;
