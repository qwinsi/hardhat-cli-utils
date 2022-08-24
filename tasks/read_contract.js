/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param name: string
 * @param address: string
 * @param method: string
 * @param argv: any[]
 * @returns
 */
async function readContract(hre, name, address, method, argv) {
    const factory = await hre.ethers.getContractFactory(name);

    // Check that:
    // 1. `method` is a method of contract
    // 2. `argv` inputted matches the prototype of method
    {
        const abi = hre.artifacts.readArtifactSync(name).abi;
        const prototype = abi.find((func) => (func.name === method));
        if (prototype === undefined) {
            throw Error(`${method}: No such method in ${name}`);
        }
        if (prototype.inputs.length !== argv.length) {
            throw Error(`Expect ${prototype.inputs.length} parameter(s) to call method, got ${argv.length}`);
        }
    }

    const contract = factory.attach(address);
    const result = await contract[method](...argv);
    console.log("Return: ", result);
}

// interface CallTaskArgs {
//     name:       string,
//     address:    string,
//     method:     string,
//     params?:    any[],
// }

task('read', "Call (read) the method of contract on given address")
    .addPositionalParam('name', "Name of contract type")
    .addPositionalParam('address', "Address of contract to call")
    .addPositionalParam('method', "Method to call")
    .addOptionalVariadicPositionalParam('params', "Parameters passed to method")
    .setAction(async (taskArgs /* CallTaskArgs */, hre) => {
        const {name, address, method} = taskArgs;
        const argv = taskArgs.params? taskArgs.params: [];
        await readContract(hre, name, address, method, argv);
    });
