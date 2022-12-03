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
npx hardhat deploy-testnets --network goerli
npx hardhat deploy-testnets --network mumbai
```

Run validator script
```shell
npx hardhat run-validator
```

## Deployments on goerli
```
Deployed ERC20TokenContract on contract address: 0xE5E8CbE8080d7414a0Db72F28942B3feBc8a745e
Deployed ETHWrapperContract on contract address: 0x8D298Ea7c1E6E2C41259c67fDEeFFb603058a0A1
Deployed BridgeContract on contract address: 0x57E9Ef0Cc06C138e7F1F421C2c3C64603677C3cB
Deployed TokenLedgerContract on contract address: 0x744063127BD52c49236F134434d7d65339F71B2C
Successfully verified contract ETHWrapperContract on Etherscan.
https://goerli.etherscan.io/address/0x8D298Ea7c1E6E2C41259c67fDEeFFb603058a0A1#code
Successfully verified contract TokenLedger on Etherscan.
https://goerli.etherscan.io/address/0x744063127BD52c49236F134434d7d65339F71B2C#code
Successfully verified contract ERC20Token on Etherscan.
https://goerli.etherscan.io/address/0xE5E8CbE8080d7414a0Db72F28942B3feBc8a745e#code
Successfully verified contract BridgeBase on Etherscan.
https://goerli.etherscan.io/address/0x57E9Ef0Cc06C138e7F1F421C2c3C64603677C3cB#code
```

## Deployments on mumbai
```
Waiting for ERC20TokenContract deployment...
Deployed ERC20TokenContract on contract address: 0xf4DBb2292D6893CD84aE3Dfe94539A0e74A54BF2
Deployed ETHWrapperContract on contract address: 0x177484CF0de138b01B7Ae5abE7651B02dA4B450e
Deployed TokenLedgerContract on contract address: 0xb7fcB4407a440e1caE647408a684d35D1BC478AB
Deployed BridgeContract on contract address: 0xA0fd683E6c853985CcC4B52cb349fD32Fe05cE90

Successfully verified contract ETHWrapperContract on Etherscan.
https://mumbai.polygonscan.com/address/0x177484CF0de138b01B7Ae5abE7651B02dA4B450e#code
Successfully verified contract TokenLedger on Etherscan.
https://mumbai.polygonscan.com/address/0xb7fcB4407a440e1caE647408a684d35D1BC478AB#code
Successfully verified contract ERC20Token on Etherscan.
https://mumbai.polygonscan.com/address/0xf4DBb2292D6893CD84aE3Dfe94539A0e74A54BF2#code
Successfully verified contract BridgeBase on Etherscan.
https://mumbai.polygonscan.com/address/0xA0fd683E6c853985CcC4B52cb349fD32Fe05cE90#code
```