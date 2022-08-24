/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param address: string
 * @returns
 */
async function getRuntimeCode(hre, address) {
    const code = await hre.ethers.provider.getCode(address);
    console.log(code);
}

task('bytecode', "Get the runtime bytecode on given contract address")
    .addPositionalParam('address', "Address of contract")
    .setAction(async (taskArgs, hre) => {
        await getRuntimeCode(hre, taskArgs.address);
    });
