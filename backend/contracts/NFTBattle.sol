// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTBattle is ERC721URIStorage, Ownable(msg.sender) {
    uint256 public battleCounter;
    uint256 public tokenCounter;

    struct Design {
        address creator;
        string designURI;
        uint256 votes;
    }

    struct Battle {
        uint256 startTime;
        uint256 endTime;
        bool ended;
        mapping(uint256 => Design) designs;
        uint256 designCount;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Battle) public battles;

    event BattleCreated(uint256 battleId, uint256 startTime, uint256 endTime);
    event DesignSubmitted(uint256 battleId, uint256 designId, address creator);
    event Voted(uint256 battleId, uint256 designId, address voter);
    event WinnerDeclared(uint256 battleId, uint256 designId, address winner);

    constructor() ERC721("NFTBattle", "NFTB") {}

    function createBattle(uint256 duration) external onlyOwner {
        battleCounter++;
        uint256 battleId = battleCounter;

        battles[battleId].startTime = block.timestamp;
        battles[battleId].endTime = block.timestamp + duration;
        battles[battleId].ended = false;

        emit BattleCreated(battleId, block.timestamp, block.timestamp + duration);
    }

    function submitDesign(uint256 battleId, string memory designURI) external {
        require(block.timestamp >= battles[battleId].startTime, "Battle not started");
        require(block.timestamp <= battles[battleId].endTime, "Battle ended");

        Battle storage battle = battles[battleId];
        uint256 designId = battle.designCount++;
        battle.designs[designId] = Design(msg.sender, designURI, 0);

        emit DesignSubmitted(battleId, designId, msg.sender);
    }

    function vote(uint256 battleId, uint256 designId) external {
        require(block.timestamp >= battles[battleId].startTime, "Battle not started");
        require(block.timestamp <= battles[battleId].endTime, "Battle ended");
        require(!battles[battleId].hasVoted[msg.sender], "Already voted");

        Battle storage battle = battles[battleId];
        battle.hasVoted[msg.sender] = true;
        battle.designs[designId].votes++;

        emit Voted(battleId, designId, msg.sender);
    }

    function declareWinner(uint256 battleId) external {
        require(block.timestamp > battles[battleId].endTime, "Battle ongoing");
        require(!battles[battleId].ended, "Winner already declared");

        Battle storage battle = battles[battleId];
        uint256 winningDesignId;
        uint256 highestVotes;

        for (uint256 i = 0; i < battle.designCount; i++) {
            if (battle.designs[i].votes > highestVotes) {
                highestVotes = battle.designs[i].votes;
                winningDesignId = i;
            }
        }

        battle.ended = true;

        Design memory winner = battle.designs[winningDesignId];
        tokenCounter++;
        _mint(winner.creator, tokenCounter);
        _setTokenURI(tokenCounter, winner.designURI);

        emit WinnerDeclared(battleId, winningDesignId, winner.creator);
    }
}
