# Bridge Hardhat Project

This project demonstrates a Bridge contracts. 

<!-- > **_NOTE:_**  Contract is already deployed in  testnet-->

## Execute tasks for local setup

Install the dependencies

```shell
npm install
```

Compile the contracts
```shell
npx hardhat compile
```

Run local network with test accounts
```shell
npx hardhat node
```

Run tests with high coverage. Unit tests are typically run on hardhat networks or ganache.
```shell
npm run test
```

Run tests coverage. 
```shell
npm run coverage
```

#### Create .env file with keys from .env.example. 

Deploying on testnet networks
```shell
npx hardhat deploy-testnets --network goerli --private-key=0x
```

Run validator script
```shell
npx hardhat run-validator
```

## Deployments on goerli
Deployed ERC20TokenContract on contract address: 0xE5E8CbE8080d7414a0Db72F28942B3feBc8a745e
Deployed ETHWrapperContract on contract address: 0x8D298Ea7c1E6E2C41259c67fDEeFFb603058a0A1
Deployed BridgeContract on contract address: 0x5beF86E76bFec3C84dE3BEe6F8963959Ec18F5a5
Deployed TokenLedgerContract on contract address: 0xc14eDD8F2A94434A6D291472dB7fE397bd021e30
Successfully verified contract ETHWrapperContract on Etherscan.
https://goerli.etherscan.io/address/0x8D298Ea7c1E6E2C41259c67fDEeFFb603058a0A1#code
Successfully verified contract TokenLedger on Etherscan.
https://goerli.etherscan.io/address/0xc14eDD8F2A94434A6D291472dB7fE397bd021e30#code
Successfully verified contract ERC20Token on Etherscan.
https://goerli.etherscan.io/address/0xE5E8CbE8080d7414a0Db72F28942B3feBc8a745e#code
Successfully verified contract BridgeBase on Etherscan.
https://goerli.etherscan.io/address/0x5beF86E76bFec3C84dE3BEe6F8963959Ec18F5a5#code

## Deployments on mumbai
Waiting for ERC20TokenContract deployment...
Deployed ERC20TokenContract on contract address: 0xf4DBb2292D6893CD84aE3Dfe94539A0e74A54BF2
Deployed ETHWrapperContract on contract address: 0x177484CF0de138b01B7Ae5abE7651B02dA4B450e
Deployed TokenLedgerContract on contract address: 0x0e93149394aAF1a7D067b9f58998E347627B4496
Deployed BridgeContract on contract address: 0x79d9996C8236d2F8C6A0f3eDE93F4Da2668fB56F

Successfully verified contract ETHWrapperContract on Etherscan.
https://mumbai.polygonscan.com/address/0x177484CF0de138b01B7Ae5abE7651B02dA4B450e#code
Successfully verified contract TokenLedger on Etherscan.
https://mumbai.polygonscan.com/address/0xfcCd4A872c923De8e2a963204E6Ab2560B7B4F14#code
Successfully verified contract ERC20Token on Etherscan.
https://mumbai.polygonscan.com/address/0xf4DBb2292D6893CD84aE3Dfe94539A0e74A54BF2#code
Successfully verified contract BridgeBase on Etherscan.
https://mumbai.polygonscan.com/address/0x79d9996C8236d2F8C6A0f3eDE93F4Da2668fB56F#code