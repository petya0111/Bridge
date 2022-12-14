const { task } = require("hardhat/config");

task("deploy-testnets", "Deploys contract on a provided network")
.setAction(
    async () => {
        const deployBookLibraryContract = require("../scripts/deploy-contracts-on-network.js");
        await deployBookLibraryContract();
    }
);
task("run-validator", "Runs validator listening to the events from source chain").setAction(
    async () => {
        const runValidatorScript = require("../scripts/validator/run-validator.js");
        await runValidatorScript();
    }
);
subtask("print", "Prints a message")
    .addParam("message", "The message to print")
    .setAction(async (taskArgs) => {
        console.log(taskArgs.message);
    });
