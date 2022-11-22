const hre = require("hardhat");
const ethers = hre.ethers;

async function deployLibraryContract() {
    await hre.run("compile"); // We are compiling the contracts using subtask
    const [deployer] = await ethers.getSigners(); // We are getting the deployer

    await hre.run("print", {
        message: "Deploying contracts with the account:" + deployer.address,
    }); // We are printing the address of the deployer
    await hre.run("print", {
        message: "Account balance:" + (await deployer.getBalance()).toString(),
    }); // We are printing the account balance

    const ETHWrapper = await ethers.getContractFactory("ETHWrapperContract"); 
    const ETHWrapperContract = await ETHWrapper.deploy();
    await hre.run("print", {
        message: "Waiting for ETHWrapperContract deployment...",
    });
    await ETHWrapperContract.deployed();

    const TokenBase = await ethers.getContractFactory("TokenBaseContract"); 
    const TokenBaseContract = await TokenBase.deploy();
    await hre.run("print", {
        message: "Waiting for TokenBaseContract deployment...",
    });
    await TokenBaseContract.deployed();

    await hre.run("print", {
        message:
            "Deployed ETHWrapperContract on contract address: " +
            ETHWrapperContract.address,
    });

    await hre.run("verify:verify", {
        address: ETHWrapperContract.address,
        constructorArguments: [],
    });

    await hre.run("print", { message: "Verified." });
    await hre.run("print", { message: "Done!" });
}

module.exports = deployLibraryContract;
