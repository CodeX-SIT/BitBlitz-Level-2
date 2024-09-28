require("@nomiclabs/hardhat-ethers");

module.exports = {
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/nH3RNEH5wOfGy6DjMi5k70oEG4aCkisF`,
      accounts: [`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`]
    },
  },
  solidity: "0.8.27",
};
