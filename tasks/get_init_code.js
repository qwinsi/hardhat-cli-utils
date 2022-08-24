/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param name: string
 * @returns
 */
async function getInitCode(hre, name) {
    const factory = await hre.ethers.getContractFactory(name);
    console.log(factory.bytecode);
}

task('initcode', "Get the creation bytecode (excluding constructor parameters part)")
    .addPositionalParam('name', "Name of contract type")
    .setAction(async (taskArgs, hre) => {
        await getInitCode(hre, taskArgs.name);
    });
