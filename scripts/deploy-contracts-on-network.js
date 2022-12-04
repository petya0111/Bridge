const hre = require("hardhat");
const ethers = hre.ethers;

async function deployContractsOnNetwork() {
    await hre.run("compile"); // We are compiling the contracts using subtask
    const [deployer] = await ethers.getSigners(); // We are getting the deployer

    await hre.run("print", {
        message: "Deploying contracts with the account:" + deployer.address,
    }); // We are printing the address of the deployer
    await hre.run("print", {
        message: "Account balance:" + (await deployer.getBalance()).toString(),
    }); // We are printing the account balance

    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const ERC20TokenContract = await ERC20Token.deploy(
        "LimeERC",
        "LRC",
        deployer.address
    );
    await hre.run("print", {
        message: "Waiting for ERC20TokenContract deployment...",
    });
    await ERC20TokenContract.deployed();

    await hre.run("print", {
        message:
            "Deployed ERC20TokenContract on contract address: " +
            ERC20TokenContract.address,
    });

    const ETHWrapper = await ethers.getContractFactory("ETHWrapperContract");
    const ETHWrapperContract = await ETHWrapper.deploy();
    await hre.run("print", {
        message: "Waiting for ETHWrapperContract deployment...",
    });
    await ETHWrapperContract.deployed();

    await hre.run("print", {
        message:
            "Deployed ETHWrapperContract on contract address: " +
            ETHWrapperContract.address,
    });

    const TokenLedger = await ethers.getContractFactory("TokenLedger");
    const TokenLedgerContract = await TokenLedger.deploy();
    await hre.run("print", {
        message: "Waiting for TokenLedgerContract deployment...",
    });
    await TokenLedgerContract.deployed();

    await hre.run("print", {
        message:
            "Deployed TokenLedgerContract on contract address: " +
            TokenLedgerContract.address,
    });

    const Bridge = await ethers.getContractFactory("BridgeBase");
    const BridgeContract = await Bridge.deploy(ETHWrapperContract.address);
    await hre.run("print", {
        message: "Waiting for BridgeContract deployment...",
    });
    await BridgeContract.deployed();

    await hre.run("print", {
        message:
            "Deployed BridgeContract on contract address: " +
            BridgeContract.address,
    });

    await hre.run("print", {
        message: "Waiting 7 confirmation blocks...",
    });
    await BridgeContract.deployTransaction.wait(7);

    await hre.run("print", {
        message: "Starting verification of contracts...",
    });
    await hre.run("verify:verify", {
        address: ETHWrapperContract.address,
        constructorArguments: [],
    });
    await hre.run("verify:verify", {
        address: TokenLedgerContract.address,
        constructorArguments: [],
    });
    await hre.run("verify:verify", {
        address: ERC20TokenContract.address,
        constructorArguments: ["LimeERC", "LRC", deployer.address],
    });
    await hre.run("verify:verify", {
        address: BridgeContract.address,
        constructorArguments: [ETHWrapperContract.address],
    });

    await hre.run("print", { message: "Verified." });
    await hre.run("print", { message: "Done!" });
}

module.exports = deployContractsOnNetwork;
