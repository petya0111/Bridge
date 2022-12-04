require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");
require("dotenv").config();
require("./tasks/hardhat-tasks");

/** @type import('hardhat/config').HardhatUserConfig */
const developmentChains = ["hardhat", "localhost"];
module.exports = {
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    defaultNetwork: "goerli",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            accounts: [process.env.PRIVATE_KEY],
        },
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/40c2813049e44ec79cb4d7e0d18de173",
            accounts: [process.env.PRIVATE_KEY],
        },
        goerli: {
            url: "https://eth-goerli.g.alchemy.com/v2/cSdN5NKZvLG6YDW9cXYHf_oKbeUywY7_",
            chainId: 5,
            accounts: [process.env.DEPLOYER_GOERLI_PRIVATE_KEY],
        },
        mumbai: {
          url: "https://matic-mumbai.chainstacklabs.com",
          chainId: 80001,
          accounts: [process.env.DEPLOYER_MUMBAI_PRIVATE_KEY],
        }
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: "CHIRAADNUI814XIT9ST36R63UFNBNDKBDY", // etherscan
        // apiKey: "ATZEWNYTM7R1K34CBKQBFRQFP3M5J2B8MC" // polygon etherscan
    },
    developmentChains,
};
