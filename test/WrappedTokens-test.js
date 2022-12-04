const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { developmentChains } = require("../hardhat.config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("TokenTest", function () {
          let ethWrapper;
          let admin;
          let addr;
          let tokenAddress;

          before(async () => {
              const [owner, addr1] = await ethers.getSigners();
              admin = owner;
              addr = addr1;
              let ethWrapperFactory = await ethers.getContractFactory(
                  "ETHWrapperContract"
              );
              ethWrapper = await ethWrapperFactory.deploy();
              await ethWrapper.deployed({
                  from: owner,
              });
          });

          it("Should create and mint normal token", async () => {
              let erc20Factory = await ethers.getContractFactory("ERC20Token");
              erc20 = await erc20Factory.deploy("NToken", "NTK", admin.address);
              await erc20.deployed({
                  from: admin,
              });
              expect(await erc20.connect(admin).mint(admin.address, 1)).to.emit(
                  ethWrapper,
                  "LogERC20Minted"
              );
              expect(
                  erc20.connect(addr).mint(addr.address, 1)
              ).to.be.revertedWith("Ownable: caller is not the owner");
          });

          it("Should initiate token and check if ownership is transferred", async () => {
              let token = await ethWrapper
                  .connect(admin)
                  .initiateToken("WrappedToken", "WTK");
              const receipt = await token.wait();
              const tkAddr = ethers.utils.hexStripZeros(
                  receipt.events.filter(
                      (e) => e.event == "LogETHTokenCreated"
                  )[0].topics[1]
              );
              const tokIds = await ethWrapper.getAllTokenIds();
              expect(tokIds).to.have.length(1);
              tokenAddress = tkAddr;
              expect(await ethWrapper.getTokenContractAddress(tkAddr)).to.be
                  .properAddress;
              expect(token.from).to.equal(admin.address);
          });

          it("Should initiate token owner error is thrown", async () => {
              expect(
                  ethWrapper.connect(addr).initiateToken("WrappedToken", "WTK")
              ).to.be.revertedWith("Ownable: caller is not the owner");
          });

          it("Should approve token", async function () {
              expect(
                  await ethWrapper
                      .connect(admin)
                      .approve(tokenAddress, admin.address, 1)
              ).to.emit(ethWrapper, "LogETHApproved");
          });
      });
