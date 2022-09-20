const available_tasks = {};
available_tasks['balance']  = require("./tasks/get_balance.js");
available_tasks['chain-id'] = require("./tasks/get_chain_id.js");
available_tasks['deploy']   = require("./tasks/deploy.js");
available_tasks['dig']      = require("./tasks/dig.js");
available_tasks['nonce']    = require("./tasks/get_nonce.js");
available_tasks['initcode'] = require("./tasks/get_init_code.js");
available_tasks['read']     = require("./tasks/read_contract.js");
available_tasks['bytecode'] = require("./tasks/get_runtime_code.js");
available_tasks['write']    = require("./tasks/write_contract.js");
available_tasks['version-pragma'] = require("./tasks/change-version-pragma.js");

function _register(taskName, commandName) {
    available_tasks[taskName](commandName);
}

function register(tasks, prefix="") {
    for (const task_name of tasks) {
        _register(task_name, prefix + task_name);
    }
}

function registerExcluding(tasks, prefix="") {
    const tasks_to_add = new Set(Object.keys(available_tasks));
    for (const task_name of tasks) {
        tasks_to_add.delete(task_name);
    }
    register(tasks_to_add, prefix);
}

function registerAll(prefix="") {
    register(Object.keys(available_tasks), prefix);
}


module.exports = {
    AllAvailableTasks: new Set(Object.keys(available_tasks)),
    register: register,
    registerAll: registerAll,
    registerExcluding: registerExcluding
}
