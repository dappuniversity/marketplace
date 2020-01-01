const Marketplace = artifacts.require("Marketplace");
// The SimpleMarketplace is Failing Deployment
// Invalid number of parameters for "undefined". Got 0 expected 2!
//const SimpleMarketplace = artifacts.require("SimpleMarketplace");

module.exports = function(deployer) {
  deployer.deploy(Marketplace);
  //deployer.deploy(SimpleMarketplace);
};


