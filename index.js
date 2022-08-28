const available_tasks = {};
available_tasks['deploy']   = require("./tasks/deploy.js");
available_tasks['dig']      = require("./tasks/dig.js");
available_tasks['nonce']    = require("./tasks/get_nonce.js");
available_tasks['initcode'] = require("./tasks/get_init_code.js");
available_tasks['read']     = require("./tasks/read_contract.js");
available_tasks['bytecode'] = require("./tasks/get_runtime_code.js");
available_tasks['write']    = require("./tasks/write_contract.js");


function register(tasks) {
    for (const task_name of tasks) {
        available_tasks[task_name](task_name);
    }
}

function registerExcluding(tasks) {
    const tasks_to_add = new Set(Object.keys(available_tasks));
    for (const task_name of tasks) {
        tasks_to_add.delete(task_name);
    }
    register(tasks_to_add)
}

function registerAll() {
    register(Object.keys(available_tasks))
}


module.exports = {
    AllAvailableTasks: new Set(Object.keys(available_tasks)),
    register: register,
    registerAll: registerAll,
    registerExcluding: registerExcluding
}
