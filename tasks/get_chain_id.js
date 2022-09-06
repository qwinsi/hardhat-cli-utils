/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @returns
 */
 async function getChainId(hre) {
    const network = await hre.ethers.provider.getNetwork();
    console.log(network.chainId);
}

function registerTask(commandName) {
    task(commandName, "Get the chain ID of network")
        .setAction(async (taskArgs, hre) => {
            await getChainId(hre, taskArgs.address);
        });
}

module.exports = registerTask;
