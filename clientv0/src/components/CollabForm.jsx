import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import axios from "axios";

const CollabForm = () => {
  const { account, state } = useContext(WalletContext);
  const { collab } = state; // Assuming `collab` is the smart contract instance
  const [designURI, setDesignURI] = useState("");
  const [collaborators, setCollaborators] = useState([""]);
  const [shares, setShares] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Function to handle IPFS upload
  const handleIPFSUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
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

        const resData = res.data;
        setDesignURI(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
      } catch (error) {
        console.error(error);
        alert("Error uploading file to IPFS");
      }
    }
  };

  // Function to add a new collaborator input field
  const addCollaborator = () => {
    setCollaborators([...collaborators, ""]);
    setShares([...shares, ""]);
  };

  // Function to handle collaborator address change
  const handleCollaboratorChange = (index, value) => {
    const updatedCollaborators = [...collaborators];
    updatedCollaborators[index] = value;
    setCollaborators(updatedCollaborators);
  };

  // Function to handle share change
  const handleShareChange = (index, value) => {
    const updatedShares = [...shares];
    updatedShares[index] = value;
    setShares(updatedShares);
  };

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};
    if (!designURI) newErrors.designURI = "Please upload a design to IPFS";
    if (collaborators.some((addr) => !addr)) newErrors.collaborators = "All collaborator addresses must be filled";
    if (shares.some((share) => !share || isNaN(share))) newErrors.shares = "All share values must be valid numbers";
    const totalShare = shares.reduce((acc, share) => acc + parseFloat(share), 0);
    if (totalShare !== 100) newErrors.totalShare = "Total shares must equal 100%";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Interact with the smart contract
      const tx = await collab.uploadDesignWithCollaboration(
        designURI,
        collaborators,
        shares.map((share) => parseInt(share)) // Convert to integers
      );
      await tx.wait();
      alert("Design with collaboration uploaded successfully!");
      setDesignURI("");
      setCollaborators([""]);
      setShares([""]);
    } catch (error) {
      console.log(error);
      alert("Error uploading design with collaboration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Upload Design with Collaboration</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Design Upload */}
        <div className="flex flex-col">
          <input
            type="file"
            onChange={handleIPFSUpload}
            className="border-4 border-gray-300 rounded p-3 w-full"
          />
          {designURI && (
            <p className="text-sm text-green-500 mt-2">
              File uploaded successfully:{" "}
              <a href={designURI} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                View on IPFS
              </a>
            </p>
          )}
          {errors.designURI && <p className="text-red-500 text-sm">{errors.designURI}</p>}
        </div>

        {/* Collaborators and Shares */}
        <div>
          <label className="text-lg font-medium mb-2">Collaborators and Shares:</label>
          {collaborators.map((collaborator, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <input
                type="text"
                placeholder="Collaborator Address"
                value={collaborator}
                onChange={(e) => handleCollaboratorChange(index, e.target.value)}
                className="border-2 border-gray-300 rounded p-3 w-1/2"
              />
              <input
                type="number"
                placeholder="Share (%)"
                value={shares[index]}
                onChange={(e) => handleShareChange(index, e.target.value)}
                className="border-2 border-gray-300 rounded p-3 w-1/4"
              />
            </div>
          ))}
          {errors.collaborators && <p className="text-red-500 text-sm">{errors.collaborators}</p>}
          {errors.shares && <p className="text-red-500 text-sm">{errors.shares}</p>}

          {/* Add Collaborator Button */}
          <button
            type="button"
            onClick={addCollaborator}
            className="text-blue-600 underline mt-2"
          >
            + Add Collaborator
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-6 py-3 w-full"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Design"}
        </button>

        {/* Total Share Error */}
        {errors.totalShare && <p className="text-red-500 text-sm">{errors.totalShare}</p>}
      </form>
    </div>
  );
};

export default CollabForm;
