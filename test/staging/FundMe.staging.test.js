//los stagging test a diverencia de los uintis, se ejecutan en testnets y es para ver que mas o menos las cosas estan saliendo bien
//yarn hardhat test --network rinkeby y se ejecutan estos tests

const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

developmentChains.includes(network.name) //solo se ejecuta en testnet
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("1")
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingDeployerBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingDeployerBalance.toString(), "0")
          })
      })
