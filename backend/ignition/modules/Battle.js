const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("Battle", (m) => {
  const Battle = m.contract("Battle", []);
  return { Battle };
});
