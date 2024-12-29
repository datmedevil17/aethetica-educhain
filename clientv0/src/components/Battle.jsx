import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import axios from "axios";

const Battle = () => {
  const { account, state } = useContext(WalletContext);
  const { battle } = state;

  const [battles, setBattles] = useState([]);
  const [selectedBattleId, setSelectedBattleId] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [designURI, setDesignURI] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const [duration, setDuration] = useState(3600);

  useEffect(() => {
    const fetchBattles = async () => {
      if (!battle) return;

      try {
        const totalBattles = await battle.battleCounter();
        const battleData = [];

        for (let i = 1; i <= totalBattles; i++) {
          const battleInfo = await battle.battles(i);
          const metadataResponse = await fetch(battleInfo[1]);
          const metadata = await metadataResponse.json();
          battleData.push({
            battleId: i,
            metadata,
            ended: battleInfo[4],
            designsSubmitted: battleInfo[5],
          });
        }

        setBattles(battleData);
      } catch (error) {
        console.error("Error fetching battles:", error);
      }
    };

    const checkIfOwner = async () => {
      if (!battle) return;
      try {
        const owner = await battle.owner();
        setIsOwner(account.toLowerCase() === owner.toLowerCase());
      } catch (error) {
        console.error("Error checking owner:", error);
      }
    };

    fetchBattles();
    checkIfOwner();
  }, [battle, account]);

  const uploadCoverToIpfs = async (e) => {
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
            pinata_api_key: "YOUR_PINATA_API_KEY",
            pinata_secret_api_key: "YOUR_PINATA_SECRET_API_KEY",
          },
        });

        setCover(`https://ipfs.io/ipfs/${res.data.IpfsHash}`);
      } catch (error) {
        console.error("Error uploading cover to IPFS:", error);
      }
    }
  };

  const handleCreateBattle = async () => {
    if (!title || !desc || !cover) {
      alert("Please fill out all fields and upload a cover.");
      return;
    }

    try {
      const data = JSON.stringify({ title, desc, cover });
      const res = await axios({
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: "YOUR_PINATA_API_KEY",
          pinata_secret_api_key: "YOUR_PINATA_SECRET_API_KEY",
          "Content-Type": "multipart/form-data",
        },
      });

      const uri = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
      await battle.createBattle(duration, uri);

      alert("Battle created successfully!");
      setTitle("");
      setDesc("");
      setCover("");
      setDuration(3600);
    } catch (error) {
      console.error("Error creating battle:", error);
    }
  };

  const handleBattleSelect = async (battleId) => {
    setSelectedBattleId(battleId);

    try {
      const battleDesigns = await battle.viewDesigns(battleId);
      setDesigns(battleDesigns);
    } catch (error) {
      console.error("Error fetching designs:", error);
    }
  };

  const handleSubmitDesign = async () => {
    if (!designURI || !selectedBattleId) {
      alert("Please provide a design URI and select a battle.");
      return;
    }

    try {
      await battle.submitDesign(selectedBattleId, designURI);
      alert("Design submitted successfully!");
      setDesignURI("");
    } catch (error) {
      console.error("Error submitting design:", error);
    }
  };

  const ipfs = async (e) => {
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
            pinata_api_key: "YOUR_PINATA_API_KEY",
            pinata_secret_api_key: "YOUR_PINATA_SECRET_API_KEY",
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

  const handleVote = async (designId) => {
    if (!selectedBattleId || hasVoted) {
      alert("You have already voted or no battle selected.");
      return;
    }

    try {
      await battle.vote(selectedBattleId, designId);
      setHasVoted(true);
      alert("Vote successful!");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">NFT Battle</h1>

      {isOwner && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create a New Battle</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Battle Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <textarea
              placeholder="Enter Battle Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <input
              type="file"
              onChange={uploadCoverToIpfs}
              className="border rounded p-2 w-full"
            />
            {cover && (
              <p className="text-sm text-green-500">
                Cover uploaded: <a href={cover}>View Cover</a>
              </p>
            )}
            <input
              type="number"
              placeholder="Battle Duration (seconds)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <button
              onClick={handleCreateBattle}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Battle
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Active Battles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {battles.map((battle, index) => (
          <div
            key={index}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold">{battle.metadata.title}</h3>
            <p>{battle.metadata.desc}</p>
            {battle.metadata.cover && (
              <img
                src={battle.metadata.cover}
                alt="Battle Cover"
                className="mt-2 w-full h-40 object-cover"
              />
            )}
            <button
              onClick={() => handleBattleSelect(battle.battleId)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Join Battle
            </button>
          </div>
        ))}
      </div>

      {selectedBattleId && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Submit Your Design for Battle:{" "}
            <span className="text-blue-500">
              {battles.find((b) => b.battleId === selectedBattleId)?.metadata.title || "Unknown"}
            </span>
          </h2>
          <input
            type="text"
            placeholder="Enter Design URI (Optional)"
            value={designURI}
            onChange={(e) => setDesignURI(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={ipfs}
            className="border bg-black rounded p-2 w-full mb-4"
          />
          <button
            onClick={handleSubmitDesign}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Submit Design
          </button>
        </div>
      )}
    </div>
  );
};

export default Battle;
