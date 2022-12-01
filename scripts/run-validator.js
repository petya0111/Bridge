const { ethers, network } = require("hardhat");
const { developmentChains } = require("../hardhat.config");
require("dotenv").config();
const { Web3 } = require("web3");
const { BridgeABI } = require("../abis/BridgeBase.json");
const { ERC20ABI } = require("../abis/ERC20Token.json");
const { WETHABI } = require("../abis/ETHWrapper.json");
const { TLedgerABI } = require("../abis/TokenLedger.json");
bridgeSourceChain = "0x";
bridgeTargetChain = "0x";
sourceChain = process.env.GOERLI_URL;
tagetChain = process.env.MUMBAI_URL;
let bridgeContracts = new Map();

const bridgeContractSourceChain = new ethers.Contract(
    bridgeTargetChain,
    BridgeABI,
    new ethers.providers.JsonRpcProvider(sourceChain)
);

const bridgeContractTargetChain = new ethers.Contract(
    bridgeSourceChain,
    BridgeABI,
    new ethers.providers.JsonRpcProvider(targetChainId)
);

bridgeContracts.set(sourceChain, bridgeContractSourceChain);
bridgeContracts.set(tagetChain, bridgeContractTargetChain);

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
    const tokenContract = new ethers.Contract(tokenAddress, ERC20, provider);
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
