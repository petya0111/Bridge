const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { developmentChains } = require("../hardhat.config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("TokenLedger", function () {
          let tokConn;
          let admin;
          let user1;
          let user2;
          before(async () => {
              const [owner, addr1, addr2] = await ethers.getSigners();
              admin = owner;
              user1 = addr1;
              user2 = addr2;
              let tokConnFactory = await ethers.getContractFactory(
                  "TokenLedger"
              );
              tokConn = await tokConnFactory.deploy();
              await tokConn.deployed({
                  from: owner,
              });
          });
          it("Should reject zero address input data", async () => {
              const zero_address = ethers.constants.AddressZero;
              const targetWToken = user1.address;
              expect(
                  tokConn
                      .connect(user2)
                      .registerTargetTokenAddress(zero_address, 5, targetWToken)
              ).to.be.rejectedWith("Invalid source address");

              expect(
                  tokConn
                      .connect(user2)
                      .registerTargetTokenAddress(targetWToken, 5, zero_address)
              ).to.be.rejectedWith("Invalid target address");
          });
          it("Should connect tokens", async () => {
              const sourceToken = admin.address;
              const targetWToken = user1.address;
              await expect(
                  tokConn
                      .connect(user2)
                      .registerTargetTokenAddress(sourceToken, 5, targetWToken)
              ).to.emit(tokConn, "TokenConnectionRegistered");
              await expect(
                  tokConn
                      .connect(user2)
                      .registerTargetTokenAddress(sourceToken, 5, targetWToken)
              ).to.emit(tokConn, "TokenConnectionRegistered");
              expect(
                  await tokConn.getTargetTokenAddress(sourceToken, 5)
              ).to.equal(targetWToken);
              expect(
                  await tokConn.getSourceTokenAddress(targetWToken, 5)
              ).to.equal(ethers.constants.AddressZero);
          });
      });
