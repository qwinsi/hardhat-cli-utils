/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param address: string, address of deployed contract
 * @returns
 */
async function getRuntimeCodeAtAddress(hre, address) {
    const code = await hre.ethers.provider.getCode(address);
    console.log(code);
}

/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param name: string, contract class name
 * @returns
 */
function getRuntimeCodeOfClass(hre, name) {
    const code = hre.artifacts.readArtifactSync(name).deployedBytecode;
    console.log(code);
}

function registerTask(commandName) {
    task(commandName, "Get the runtime bytecode on given contract address")
        .addPositionalParam('addressOrClass', "Address of deployed contract or contract class name")
        .setAction(async (taskArgs, hre) => {
            if (taskArgs.addressOrClass.startsWith("0x")) {
                const address = taskArgs.addressOrClass;
                await getRuntimeCodeAtAddress(hre, address);
            }
            else {
                const name = taskArgs.addressOrClass;
                getRuntimeCodeOfClass(hre, name);
            }
        });
}

module.exports = registerTask;
