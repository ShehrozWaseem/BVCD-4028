require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d`,
    //   //accounts: [process.env.privateKey]
    // },
    // matic: {
    //   url: "https://polygon-mainnet.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d",
    //   //accounts: [process.env.privateKey]
    // },
    sepolia: {
      url: "https://sepolia.infura.io/v3/fa5a67efb3534727ad0c55ff04ae32f4",
      accounts: ["c97b5381b9a9fa9c908cb712574ef965b3b450a2632b881829172df97cdcf001"]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};