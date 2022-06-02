/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config(".env");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const { utils } = require("ethers");
const chalk = require("chalk");
const defaultNetwork = "localhost";

module.exports = {
  defaultNetwork,
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mainnet: {
      url: process.env.NODE_API,
      accounts: [`0x${process.env.PRIVATEKEY}`],
    },
    rinkeby: {
      url: process.env.NODE_API,
      accounts: [`0x${process.env.PRIVATEKEY}`],
    },
    kovan: {
      url: process.env.NODE_API,
      accounts: [`0x${process.env.PRIVATEKEY}`],
    },
    ropsten: {
      url: process.env.NODE_API,
      accounts: [`0x${process.env.PRIVATEKEY}`],
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [`0x${process.env.PRIVATEKEY}`],
    },
    bsctestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [`0x${process.env.PRIVATEKEY}`],
    },
    bscmainnet: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [`0x${process.env.PRIVATEKEY}`],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.4.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
task("accounts", "Prints the list of accounts", async () => {
  if (defaultNetwork === "localhost") {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const accounts = await provider.listAccounts();
    for (let i = 0; i < accounts.length; i++) {
      const accountBalance = await provider.getBalance(accounts[i]);
      console.log(
        "📄",
        chalk.cyan(accounts[i]),
        "💸",
        chalk.magenta(utils.formatEther(accountBalance), "ETH")
      );
    }
    console.log("\n");
  } else {
    console.log(
      " ⚠️  This task only runs on JsonRpcProvider running a node at " +
        chalk.magenta("localhost:8545") +
        "\n"
    );
  }
});
