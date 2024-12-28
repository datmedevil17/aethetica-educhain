const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("NFTBattle", (m) => {
  const NFTBattle = m.contract("NFTBattle", []);
  return { NFTBattle };
});
