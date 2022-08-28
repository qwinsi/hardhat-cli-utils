/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param name: string
 * @returns
 */
async function ensResolve(hre, name) {
    const address = await hre.ethers.provider.resolveName(name);
    console.log(address);
}

function registerTask(commandName) {
    task(commandName, "Resolve given ENS domain name")
        .addPositionalParam('domain', "Domain name")
        .setAction(async (taskArgs, hre) => {
            await ensResolve(hre, taskArgs.domain);
        });
}

module.exports = registerTask;
