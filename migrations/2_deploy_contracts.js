const Marketplace = artifacts.require("Census");

module.exports = function(deployer) {
  deployer.deploy(Marketplace);
};
