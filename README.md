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
```

Deploying on mainnet networks
```shell
npx hardhat deploy-mainnet --private-key 0x
```
