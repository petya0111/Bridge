const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { developmentChains } = require("../hardhat.config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("TokenTest", function () {
          let ethWrapper;
          let admin;
          let tokenAddress;
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
          });
          it("Should initiate token and check if ownership is transferred", async () => {
              let token = await ethWrapper.initiateToken("WrappedToken", "WTK");
              const receipt = await token.wait();
              const tkAddr = ethers.utils.hexStripZeros(
                  receipt.events.filter(
                      (e) => e.event == "LogETHTokenCreated"
                  )[0].topics[1]
              );
              tokenAddress = tkAddr;
              expect(await ethWrapper.getTokenContractAddress(tkAddr)).to.be
                  .properAddress;
              expect(token.from).to.equal(admin.address);
          });
          it("Should mint token", async function () {
            expect(
                await ethWrapper
                    .connect(admin)
                    .mint(admin.address, 1)
            ).to.emit(ethWrapper, "LogETHApproved");
        });
          it("Should approve token", async function () {
              expect(
                  await ethWrapper
                      .connect(admin)
                      .approve(tokenAddress, admin.address, 1)
              ).to.emit(ethWrapper, "LogETHApproved");
          });
          it("Should wrap token", async function () {
              let wrap = await ethWrapper
                  .connect(admin)
                  .wrap(tokenAddress, { value: 1 });
              wrap.wait();
              expect(wrap).to.emit(ethWrapper, "LogETHWrapped");
          });

          it("Should unwrap token", async function () {
              expect(
                  await ethWrapper.connect(admin).unwrap(tokenAddress, 1)
              ).to.emit(ethWrapper, "LogETHUnwrapped");
          });
      });
