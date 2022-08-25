/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param name: string, contract class name
 * @returns
 */
function getInitCode(hre, name) {
    const bytecode = hre.artifacts.readArtifactSync(name).bytecode;
    console.log(bytecode);
}

task('initcode', "Get the creation bytecode (excluding constructor parameters part)")
    .addPositionalParam('name', "Name of contract type")
    .setAction(async (taskArgs, hre) => {
        getInitCode(hre, taskArgs.name);
    });
