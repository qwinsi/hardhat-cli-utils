/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param address: string
 * @returns
 */
async function getNonce(hre, address) {
    const nonce = await hre.ethers.provider.getTransactionCount(address);
    console.log(nonce);
}


task('nonce', "Get the nonce of given account")
    .addPositionalParam('address', "Address of account")
    .setAction(async (taskArgs, hre) => {
        await getNonce(hre, taskArgs.address);
    });
