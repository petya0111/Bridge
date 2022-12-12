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
          it("Should create and lock unlock erc20 token", async () => {
              let erc20Factory = await ethers.getContractFactory("ERC20Token");
              let extraToken = await erc20Factory.deploy(
                  "ExtraToken",
                  "ETK",
                  admin.address
              );
              await extraToken.deployed({
                  from: admin,
              });
              expect(
                  await extraToken
                      .connect(admin)
                      .mint(admin.address, TOKEN_AMOUNT)
              ).to.emit(ethWrapper, "LogERC20Minted");
              const tx = await extraToken
                  .connect(admin)
                  .mint(admin.address, TOKEN_AMOUNT);
              const receipt = await tx.wait();
              let erc20ExtraToken = receipt.events[0].address;
              await extraToken.approve(bridge.address, TOKEN_AMOUNT);
              expect(
                  await bridge
                      .connect(admin)
                      .lockToken(5, erc20ExtraToken, TOKEN_AMOUNT, {
                          value: serviceFee,
                      })
              ).to.emit(bridge, "LogLock");
              expect(
                  await bridge
                      .connect(admin)
                      .release(TOKEN_AMOUNT, erc20ExtraToken)
              ).to.emit(bridge, "LogRelease");
            //   expect(await bridge
            //       .connect(admin)
            //       .burn(5, erc20ExtraToken,TOKEN_AMOUNT, {
            //           value: serviceFee,
            //       })).to.emit(bridge,"LogBurn");
          });

          it("Should reject locking token, not enough service fee", async () => {
              await expect(
                  bridge
                      .connect(admin)
                      .lockToken(5, erc20Token.address, 1, { value: 0 })
              ).to.be.revertedWith("Not enough service fee");
          });
          it("Should lock token with provided service fee", async () => {
              await ethWrapper.balanceOf(wBridgeToken, bridge.address);
              await ethWrapper
                  .connect(admin)
                  .approve(wBridgeToken, bridge.address, TOKEN_AMOUNT);
              await ethWrapper
                  .connect(admin)
                  .increaseAllowance(
                      wBridgeToken,
                      bridge.address,
                      TOKEN_AMOUNT
                  );
              expect(
                  bridge.lockToken(5, wBridgeToken, 0, {
                      value: serviceFee,
                  })
              ).to.be.revertedWith("Bridged amount is required.");
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
              //   await ethWrapper.transfer(
              //       wBridgeToken,
              //       bridge.address,
              //       TOKEN_AMOUNT
              //   );

             await expect(
                  bridge.burn(5, wBridgeToken, TOKEN_AMOUNT, {
                      value: serviceFee,
                  })
              ).to.be.rejectedWith("ERC20: insufficient allowance");
          });

          it("Should release the token", async () => {
              ethWrapper.approve(wBridgeToken, bridge.address, TOKEN_AMOUNT);

              expect(
                  bridge.release(TOKEN_AMOUNT, wBridgeToken)
              ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
          });

          it("Should register token for claim", async () => {
              expect(
                  await bridge.setTokensForClaim(
                      admin.address,
                      erc20Token.address,
                      "WrappedERC",
                      "WERC",
                      TOKEN_AMOUNT
                  )
              ).to.emit("LogTokenClaimRegistered");
              let token = await bridge.setTokensForClaim(
                  admin.address,
                  erc20Token.address,
                  "WrappedERC",
                  "WERC",
                  TOKEN_AMOUNT
              );
              const receipt = await token.wait();
              expect(token).to.emit("LogTokenClaimRegistered");
              const tkAddr = ethers.utils.hexStripZeros(
                  receipt.events.filter(
                      (e) => e.event == "LogTokenClaimRegistered"
                  )[0].topics[1]
              );
              expect(
                  await bridge.setTokensForClaim(
                      admin.address,
                      tkAddr,
                      "WrappedERC",
                      "WERC",
                      TOKEN_AMOUNT
                  )
              ).to.emit("LogTokenClaimRegistered");
          });
      });
