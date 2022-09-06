/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param address: string
 * @returns
 */
 async function getBalance(hre, address) {
    const balance = await hre.ethers.provider.getBalance(address);
    console.log(balance.toString());
}

function registerTask(commandName) {
    task(commandName, "Get the native token balance of given account")
        .addPositionalParam('address', "Address of account")
        .setAction(async (taskArgs, hre) => {
            await getBalance(hre, taskArgs.address);
        });
}

module.exports = registerTask;
