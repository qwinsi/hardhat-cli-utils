/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param name: string
 * @param argv: any[]
 * @param verbose: boolean
 * @returns
 */
async function deploy(hre, name, argv, verbose) {
    const factory = await hre.ethers.getContractFactory(name);
    if (verbose) {
        console.log("Creation code:");
        console.log(factory.bytecode);
    }

    // Check that whether `argv` inputted match the constructor prototype
    {
        const abi = hre.artifacts.readArtifactSync(name).abi;
        const constructor_func = abi.find((func) => (func.type === "constructor"));
        if (constructor_func !== undefined) {
            // will go here if the contract do have a constructor
            if (constructor_func.inputs.length !== argv.length) {
                throw Error(`Expect ${constructor_func.inputs.length} parameter(s) to constructor, got ${argv.length}`);
            }
        }
    }

    const contract = await factory.deploy(...argv);

    await contract.deployed();
    console.log(contract.address);
    // TODO: get tx hash of contract creation
}


// interface DeployTaskArgs {
//     detailed:   boolean
//     name:       string,
//     params?:    any[],
// }

// Usage: hardhat deploy [--detailed] <name> [...params]
task('deploy', "Deploy contract")
    // We cannot use 'verbose' as flag name since it's reserved by Hardhat :(
    .addFlag('detailed', "Expose details")
    .addPositionalParam('name', "Name of contract to deploy")
    .addOptionalVariadicPositionalParam('params', "Parameters passed to constructor")
    .setAction(async (taskArgs /* DeployTaskArgs */, hre) => {
        const verbose = taskArgs.detailed;
        const argv = taskArgs.params? taskArgs.params: [];
        await deploy(hre, taskArgs.name, argv, verbose);
    });
