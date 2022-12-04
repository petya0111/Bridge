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
Deployed ERC20TokenContract on contract address: 0x35EEe5251fD07DE8f75bc4908e383bB2d5Df49A4
Deployed ETHWrapperContract on contract address: 0x0A6779139cba89a49E332C52d2DA8A75068A1a30
Deployed BridgeContract on contract address: 0x9B294b82Bb76fa14dA7D780f02eAe4Aa43e2E8C7
Deployed TokenLedgerContract on contract address: 0x744063127BD52c49236F134434d7d65339F71B2C
Successfully verified contract ETHWrapperContract on Etherscan.
https://goerli.etherscan.io/address/0x0A6779139cba89a49E332C52d2DA8A75068A1a30#code
Successfully verified contract TokenLedger on Etherscan.
https://goerli.etherscan.io/address/0x744063127BD52c49236F134434d7d65339F71B2C#code
Successfully verified contract ERC20Token on Etherscan.
https://goerli.etherscan.io/address/0x35EEe5251fD07DE8f75bc4908e383bB2d5Df49A4#code
Successfully verified contract BridgeBase on Etherscan.
https://goerli.etherscan.io/address/0x9B294b82Bb76fa14dA7D780f02eAe4Aa43e2E8C7#code
```

## Deployments on mumbai
```
Waiting for ERC20TokenContract deployment...
Deployed ERC20TokenContract on contract address: 0x65FEEe1E7AfC554D2aCe534ed8D02635a444FE46
Deployed ETHWrapperContract on contract address: 0x57e2D4eD61ba635129732f3cDd01c424fe6a67E0 
Deployed TokenLedgerContract on contract address: 0xb7fcB4407a440e1caE647408a684d35D1BC478AB
Deployed BridgeContract on contract address: 0xc982F93FC30dd910584b0b47426e5c26abb297f5

Successfully verified contract ETHWrapperContract on Etherscan.
https://mumbai.polygonscan.com/address/0x57e2D4eD61ba635129732f3cDd01c424fe6a67E0#code
Successfully verified contract TokenLedger on Etherscan.
https://mumbai.polygonscan.com/address/0xb7fcB4407a440e1caE647408a684d35D1BC478AB#code
Successfully verified contract ERC20Token on Etherscan.
https://mumbai.polygonscan.com/address/0x65FEEe1E7AfC554D2aCe534ed8D02635a444FE46#code
Successfully verified contract BridgeBase on Etherscan.
https://mumbai.polygonscan.com/address/0xc982F93FC30dd910584b0b47426e5c26abb297f5#code
```