/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param name: string
 * @param address: string
 * @param method: string
 * @param argv: any[]
 * @returns
 */
async function writeContract(hre, name, address, method, argv) {
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

    const contract = await hre.ethers.getContractAt(name, address);
    const tx = await contract[method](...argv);

    const network = await hre.ethers.provider.getNetwork();
    console.log("View this tx at", `https://${network.name}.etherscan.io/tx/${tx.hash}`);
    const receipt = await tx.wait();
    if (receipt.events.length > 0) {
        console.log("Events emitted:");
        for(const event of receipt.events) {
            console.log(event.event, event.args)
        }
    }
    else {
        console.log("No event emitted.");
    }
    console.log("Done!");
}

// interface CallTaskArgs {
//     name:       string,
//     address:    string,
//     method:     string,
//     params?:    any[],
// }

function registerTask(commandName) {
    task(commandName, "Write contract on given address")
        .addPositionalParam('name', "Name of contract type")
        .addPositionalParam('address', "Address of contract to call")
        .addPositionalParam('method', "Method to call")
        .addOptionalVariadicPositionalParam('params', "Parameters passed to method")
        .setAction(async (taskArgs /* CallTaskArgs */, hre) => {
            const {name, address, method} = taskArgs;
            const argv = taskArgs.params?? [];
            await writeContract(hre, name, address, method, argv);
        });
}

module.exports = registerTask;
