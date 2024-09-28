const Contest = artifacts.require("Contest");

module.exports = function (deployer) {
  deployer.deploy(Contest);
};
