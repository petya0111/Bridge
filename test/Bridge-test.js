const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { developmentChains } = require("../hardhat.config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("BridgeTest", function () {
          let bridge;
          let ethWrapper;
          let erc20Token;
          let admin;
          //   const serviceFee = ethers.utils.parseEther("0.005");
          //   const amount = ethers.utils.parseEther("0.001");
          before(async () => {
              const [owner, addr1] = await ethers.getSigners();
              admin = owner;

              let ethWrapperFactory = await ethers.getContractFactory(
                  "ETHWrapperContract"
              );
              ethWrapper = await ethWrapperFactory.deploy();
              await ethWrapper.deployed({
                  from: owner,
              });

              let bridgeFactory = await ethers.getContractFactory("BridgeBase");
              bridge = await bridgeFactory.deploy(ethWrapper.address);
              await bridge.deployed({
                  from: owner,
              });

              await ethWrapper.transferOwnership(bridge.address);

              let erc20TokenFactory = await ethers.getContractFactory(
                  "ERC20Token"
              );
              erc20Token = await erc20TokenFactory.deploy(
                  "TestToken",
                  "TTN",
                  admin.address
              );
              await erc20Token.deployed({
                  from: owner,
              });

              const tx = await bridge
                  .connect(admin)
                  .createToken("WTestToken", "WTTN");
              const receipt = await tx.wait();
              wrappedErc20Token = ethers.utils.hexStripZeros(
                  receipt.events[0].address
              );
          });

          it("Should reject locking token, not enough service fee", async () => {
              expect(
                  bridge
                      .connect(admin)
                      .lockToken(5, erc20Token.address, 1, { value: 0 })
              ).to.be.revertedWith("Not enough service fee");
              expect(
                  bridge
                      .connect(admin)
                      .lockToken(5, erc20Token.address, 1, { value: -1 })
              ).to.be.revertedWith("Bridged amount is required.");
          });
          it("Should lock token with provided service fee", async () => {
              const TOKEN_AMOUNT = ethers.utils.parseUnits("5000", 18);
              await erc20Token.approve(bridge.address, TOKEN_AMOUNT);
              //  await erc20Token.increaseAllowance(bridge.address, TOKEN_AMOUNT)

              const lockTx = await bridge.lockToken(
                  5,
                  erc20Token.address,
                  TOKEN_AMOUNT
              );
              lockTx.wait();
              expect(lockTx).to.emit(bridge, "LogLock");
              //      await erc20Token.connect(admin).approve(bridge.address, ethers.utils.parseEther("0.006"));
          });
      });
