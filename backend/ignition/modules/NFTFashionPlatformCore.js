const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("NFTFashionPlatformCore", (m) => {
  const NFTFashionPlatformCore = m.contract("NFTFashionPlatformCore", []);
  return { NFTFashionPlatformCore };
});
