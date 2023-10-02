const ContractTwo = artifacts.require('ContractTwo');

module.exports = function(deployer) {
    deployer.deploy(ContractTwo);
};