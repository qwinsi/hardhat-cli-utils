/**
 * Some code in this file is adapted from https://github.com/ItsNickBarry/hardhat-spdx-license-identifier/tree/168abd7b0eb1309c0945f057a2e22dadc99f3c81
 * which is licensed under the MIT license.
 */
const { HardhatPluginError } = require("hardhat/plugins"); 
const { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } = require("hardhat/builtin-tasks/task-names");
const fs = require('fs');

/**
 *
 * @param hre: HardhatRuntimeEnvironment
 * @param version: string
 * @returns
 */
async function changeVersionPragma(hre, version) {
    let paths = await hre.run(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS, []);

    if (!(version.startsWith("^") || version.startsWith(">="))) {
        throw new HardhatPluginError("version-pragma", "Version must start with ^ or >=");
    }
    let regexp = new RegExp(/pragma(\s+)solidity(.*);/);
    let pragma = `pragma solidity ${version};`;

    let count = 0;

    for(const absolutePath of paths) {
        // content is read from disk for preprocessor compatibility
        const content = fs.readFileSync(absolutePath).toString();
        if (content.includes("pragma")) {
            fs.writeFileSync(absolutePath, content.replace(regexp, pragma));
            count++;
        }
    }

    if (count > 0) {
        console.log(`Changed version pragma to "${version}" in ${count} source files.`);
    }
}

function registerTask(commandName) {
    task(commandName, "Change version pragmas to given version in all solidity source files")
        .addPositionalParam('versionPragma', "destination version")
        .setAction(async (taskArgs, hre) => {
            await changeVersionPragma(hre, taskArgs.versionPragma);
        });
}

module.exports = registerTask;
