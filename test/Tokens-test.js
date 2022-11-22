const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { developmentChains } = require("../hardhat.config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("TokenTest", function () {
          let ethWrapper;
          let tokenBase;
          before(async () => {
              //   TokenBase
              let tokenBaseFactory = await ethers.getContractFactory(
                  "TokenBaseContract"
              );
              tokenBase = await tokenBaseFactory.deploy(
                  "SourceChainToken",
                  "SCT"
              );
              const [owner, addr1] = await ethers.getSigners();
              await tokenBase.deployed({
                  from: owner,
              });

              // ETHWrapper
              let ethWrapperFactory = await ethers.getContractFactory(
                  "ETHWrapperContract"
              );
              ethWrapper = await ethWrapperFactory.deploy(
                  "WrappedToken",
                  "WETH"
              );
              await ethWrapper.deployed({
                  from: owner,
              });
          });

          describe("wrap token", function () {
              it("Should wrap token", async function () {
                  const [owner, addr1] = await ethers.getSigners();
                  expect(
                      await ethWrapper.connect(owner).wrap()
                  ).to.be.revertedWith("We need to wrap at least 1 WETH");
              });
          });
      });
