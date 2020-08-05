const Marketplace = artifacts.require("./src/contracts/Census.sol");

module.exports = function(deployer) {
  deployer.deploy(Marketplace);
};
