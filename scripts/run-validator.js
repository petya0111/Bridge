const { ethers, network } = require("hardhat");
const { developmentChains } = require("../hardhat.config");
require("dotenv").config();
const { Web3 } = require("web3");
const {
    BridgeABI,
} = require("../artifacts/contracts/BridgeFactory.sol/BridgeBase.json");
const {
    ERC20ABI,
} = require("../artifacts/contracts/ERC20Token.sol/ERC20Token.json");
const {
    WETHABI,
} = require("../artifacts/contracts/ETHWrapper.sol/ETHWrapperContract.json");
const {
    TLedgerABI,
} = require("../artifacts/contracts/TokenLedger.sol/TokenLedger.json");
bridgeSourceChain = "0x";
bridgeTargetChain = "0x";

// const goerliSourceChain = new Web3(process.env.GOERLI_URL);
const bridgeContractTargetChain = new providerChainA.eth.Contract(
    BridgeABI.abi,
    bridgeSourceChain
);
bridges.set(chainIdA, bridgeContractChainA);

const bridgeContractSourceChain = new providerChainB.eth.Contract(
    BridgeABI.abi,
    bridgeSourceChain
);

async function main() {
    console.log("start");
    bridgeContractChainA.on(
        "Lock",
        async (from, tokenAddress, targetChainId, amount, event) =>
            startLockTokenProcedure(
                from,
                tokenAddress,
                targetChainId,
                amount,
                event,
                providerChainA
            )
    );

    bridgeContractChainA.on(
        "LogTokenClaimRegistered",
        async (sourceToken, tokenAddress, amount, to, event) =>
            startClaimationTokenProcedure(
                sourceToken,
                tokenAddress,
                amount,
                to,
                event,
                providerChainA
            )
    );
}

const startLockTokenProcedure = async (
    from,
    tokenAddress,
    targetChainId,
    amount,
    event,
    provider
) => {};

const startClaimationTokenProcedure = async (
    sourceToken,
    tokenAddress,
    amount,
    to,
    event,
    providerChainA
) => {
    const tokenContract = new ethers.Contract(
        tokenAddress,
        ERC20.abi,
        provider
    );
    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();

    const targetBridgeContract = bridgeContractSourceChain;
    const targetBridgeProvider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:7545"
    );
    const [owner, addr1] = await ethers.getSigners();
    const validatorWallet = new ethers.Wallet(
        process.env.VALIDATOR_GOERLI_PRIVATE_KEY,
        targetBridgeProvider
    );
    const tx = await targetBridgeContract
        ?.connect(validatorWallet) //target chain owner/relayer
        .setTokensForClaim(from, tokenAddress, tokenName, tokenSymbol, amount);
    const txReceipt = await tx.wait();
    console.log(
        "Registered token for claimation ",
        txReceipt.transactionHash,
        " from ",
        from,
        " token ",
        tokenAddress,
        " amount ",
        amount
    );
};

main();
