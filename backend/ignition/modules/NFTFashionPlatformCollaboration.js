const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("NFTFashionPlatformCollaboration", (m) => {
  const NFTFashionPlatformCollaboration = m.contract("NFTFashionPlatformCollaboration", []);
  return { NFTFashionPlatformCollaboration };
});
