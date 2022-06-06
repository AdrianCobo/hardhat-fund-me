const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts() //esto se obtiene del hardat.config.js

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true, //imprime la direccion de contrato, el tx, el gas que costo desplegarlo...
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed")
        log("------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"] //ahora con yarn hardhat deploy --tags mocks y hacemos deploy del mock script
