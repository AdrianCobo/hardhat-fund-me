// //lo de abajo es lo mismo que
// async function deployFunc(hre){

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

//     console.log("hi")
//     hexStripZeros.getNamedAccounts()
//     hexStripZeros.deployements
// }
// module.exports.default = deployFunc

// module.exports = async (hre) => {
//     const {getNamedAccounts, deployements} = hre
//que es lo mismo que lo de abajao
//hre es un objeto de hardhat que nos permite obtener parametros
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts() //esto se obtiene del hardat.config.js
    const chainId = network.config.chainId

    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    //if the contract doesn't exist, we deploy a minimal version of for our local testing

    //when goin for localhost or hardhat network we want to use a mock. A mock is an object simulation.
    //this is goint to help us for using the contract which gives us the info about the eth/usd  when we change the deploy network
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }

    log("---------------------------------------------------")
}
module.exports.tags = ["all", "fundme"]
