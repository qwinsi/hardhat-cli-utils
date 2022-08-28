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

function registerTask(commandName) {
task(commandName, "Get the creation bytecode (excluding constructor parameters part)")
    .addPositionalParam('name', "Name of contract type")
    .setAction(async (taskArgs, hre) => {
        await getInitCode(hre, taskArgs.name);
    });
}

module.exports = registerTask;
