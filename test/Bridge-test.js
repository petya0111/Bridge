const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { developmentChains } = require("../hardhat.config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("BridgeTest", function () {
          let bridge;
          let ethWrapper;
          let wBridgeToken;
          let erc20Token;
          let admin;
          const serviceFee = ethers.utils.parseEther("0.006");
          const TOKEN_AMOUNT = ethers.utils.parseUnits("5000", 18);
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
              wBridgeToken = wrappedErc20Token;
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
              //   const lockTx = await bridge.lockToken(
              //       5,
              //       erc20Token.address,
              //       TOKEN_AMOUNT
              //   );
              //   lockTx.wait();
              //   expect(lockTx).to.emit(bridge, "LogLock");
              expect(
                  bridge.lockToken(5, erc20Token.address, 0, {
                      value: serviceFee,
                  })
              ).to.be.revertedWith("Bridged amount is required.");

              await ethWrapper.approve(
                  wBridgeToken,
                  bridge.address,
                  TOKEN_AMOUNT
              );
              expect(
                  bridge.lockToken(5, wBridgeToken, serviceFee, {
                      value: serviceFee,
                  })
              ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
          });

          it("Should mint token with provided service fee", async () => {
              expect(
                  await bridge.mint(admin.address, TOKEN_AMOUNT, wBridgeToken)
              ).to.emit("LogMint");
          });

          it("Should fail wrong input on burn function", async () => {
              expect(
                  bridge.burn(5, ethers.constants.AddressZero, 0)
              ).to.be.revertedWith("Burnt amount is required.");
              expect(
                  bridge.burn(5, ethers.constants.AddressZero, TOKEN_AMOUNT)
              ).to.be.revertedWith("Not enough service fee");
              expect(
                  bridge.burn(5, ethers.constants.AddressZero, TOKEN_AMOUNT, {
                      value: serviceFee,
                  })
              ).to.be.revertedWith("Wrapped Token is not existing");
          });

          it("Should burn token with provided service fee", async () => {
              await ethWrapper.approve(
                  wBridgeToken,
                  bridge.address,
                  TOKEN_AMOUNT
              );

              expect(
                  bridge.burn(5, wBridgeToken, TOKEN_AMOUNT, {
                      value: serviceFee,
                  })
              ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
          });
          
          it("Should release the token", async () => {
              await ethWrapper.approve(
                  wBridgeToken,
                  bridge.address,
                  TOKEN_AMOUNT
              );
              expect(
                  bridge.release(TOKEN_AMOUNT, wBridgeToken)
              ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
          });
      });
