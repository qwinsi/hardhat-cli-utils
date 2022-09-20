# Hardhat CLI Utils

This repository contains many predefined [hardhat](https://hardhat.org/) [tasks](https://hardhat.org/hardhat-runner/docs/advanced/create-task) as hardhat subcommands to help you play with smart contracts by CLI.

| Task           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| balance        | Get the balance of given account                             |
| chain-id       | Get the chain ID of network                                  |
| deploy         | Deploy contract                                              |
| read           | Call (read) the method of contract on given address          |
| write          | Call (write) the method of contract on given address         |
| nonce          | Get the nonce of given account                               |
| bytecode       | Get the runtime byte code on given contract address          |
| initcode       | Get the creation byte code (excluding constructor parameters part) |
| dig            | Resolve given ENS domain name                                |
| version-pragma | Change version pragmas of solidity files in batch            |

## Installation

```shell
npm install --save-dev hardhat-cli-utils
```

And add the following statement to your `hardhat.config.js`:

```js
const hcu = require("hardhat-cli-utils");
hcu.registerAll();
```

Or, if you are using TypeScript, add this to your `hardhat.config.ts`:

```typescript
import hcu from "hardhat-cli-utils";
hcu.registerAll();
```

`hcu.registerAll` will register all subcommands predefined in this package. 

There are also additional ways to register subcommands more specifically.

You can use `hcu.register`   to explicitly specify which commands you want to register. For example, 

```js
hcu.register(['read', 'write', 'dig', 'deploy']); // Register these 4 only
```

You can use `hcu.registerExcluding` to register all subcommands apart from what you list. For example, you may prefer the `deploy` subcommand provided by [hardhat-deploy](https://github.com/wighawag/hardhat-deploy) instead of this package, so you write the following statement to avoid conflict.

```js
hcu.registerExcluding(['deploy']);
```



## Usage by Examples

Let's suppose you have `Box` contract in your hardhat project.

```solidity
contract Box {
    uint private value;
    constructor(uint initValue)  {
        value  = initValue;
    }
    function getValue() public view returns(uint) {
        return value;
    }
    function setValue(uint newValue) public {
        value = newValue;
    }
}
```

And you have set up a test-net environment, in our example, Goerli.

```js
// hardhat.config.js or hardhat.config.ts
const config = {
  networks: {
    goerli: {
      url: "REPLACE_THIS_WITH_YOUR_RPC_URL",
      accounts: ["REPLACE_THIS_WITH_YOUR_PRIVATE_KEY"]
    },
  }
}
```



### deploy

Run with `npx hardhat --network <network> deploy <class> [...params]`. 

On success, the address of contract created is outputted.

```shell
$ npx hardhat --network goerli deploy Box 123
0xb62208Cf91f8654D1Baa7Af12d1C6f7ad655dcd8
```

### read

Run with `npx hardhat --network <network> read <class> <address> <method> [...params]`. 

On success, the returned result is showed.

```shell
$ npx hardhat --network goerli read Box 0xb62208Cf91f8654D1Baa7Af12d1C6f7ad655dcd8 getValue
Return:  BigNumber { value: "123" }
```

### write

Run with `npx hardhat --network <network> write <class> <address> <method> [...params]`. 

On success, it output the link to view this transaction on [Etherscan](https://etherscan.io) . If there are events emitted during this transaction, then the events are showed.

```shell
$ npx hardhat --network goerli write Box 0xb62208Cf91f8654D1Baa7Af12d1C6f7ad655dcd8 setValue 456
View this tx at https://goerli.etherscan.io/tx/0x32e051dc4f3d20395b00b3715a23e908d5eaa4010ba237214f385676ff3c80bd
No event emitted.
Done!
```

### nonce

Run with `npx hardhat --network <network> nonce <address>`. 

Output the nonce of given account.

```shell
$ npx hardhat --network goerli nonce 0xb62208Cf91f8654D1Baa7Af12d1C6f7ad655dcd8
1
```


### initcode

For the creation byte code of a contract of given class, run `npx hardhat initcode <class>`.

```shell
$ npx hardhat initcode Box
0x608060405234801561001057600080fd5b5060405161010a38038061010a83398101604081905261002f91610037565b600055610050565b60006020828403121561004957600080fd5b5051919050565b60ac8061005e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c8063209652551460375780635524107714604c575b600080fd5b60005460405190815260200160405180910390f35b605c6057366004605e565b600055565b005b600060208284031215606f57600080fd5b503591905056fea2646970667358221220b23e771e24a1806f389a28918dce80947911d0a0243543ea7af07c813207c99564736f6c63430008090033
```

**Contracts with Libraries** 

Some contracts need to be linked with libraries before they are deployed. **In such case, the output will not be pure hex string**. Instead, the output contains a placeholder in which the library contract address should be filled.(See [related section in Solidity Docs](https://docs.soliditylang.org/en/v0.8.15/using-the-compiler.html#library-linking)) For example, an output may be like this: (Notice the two $ symbols in bytecode)

```
0x608060405234801561001057600080fd5b50610192806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063165c4a1614610030575b600080fd5b61004361003e3660046100fd565b610064565b604080519283526001600160a01b0390911660208301520160405180910390f35b6040516332292b2760e21b81526004810183905260248101829052600090819073__$118fb7ce387586ecccae2b5c8d4a11c6b1$__9063c8a4ac9c90604401604080518083038186803b1580156100ba57600080fd5b505af41580156100ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100f2919061011f565b915091509250929050565b6000806040838503121561011057600080fd5b50508035926020909101359150565b6000806040838503121561013257600080fd5b825160208401519092506001600160a01b038116811461015157600080fd5b80915050925092905056fea26469706673582212207fee896a627c16dca0cfa37edb26a96e129bc36672aabb59ce8f9ab5cdc7143664736f6c63430008090033
```

After replacing `__$118fb7ce387586ecccae2b5c8d4a11c6b1$__` with the library contract address, you get the actual creation code.

### bytecode

For the runtime byte code of a contract at given address, run `npx hardhat --network <network> bytecode <address>`.

```shell
$ npx hardhat --network goerli bytecode 0xb62208Cf91f8654D1Baa7Af12d1C6f7ad655dcd8
0x6080604052348015600f57600080fd5b506004361060325760003560e01c8063209652551460375780635524107714604c575b600080fd5b60005460405190815260200160405180910390f35b605c6057366004605e565b600055565b005b600060208284031215606f57600080fd5b503591905056fea2646970667358221220b23e771e24a1806f389a28918dce80947911d0a0243543ea7af07c813207c99564736f6c63430008090033
```

For the runtime byte code of a contract of given class, run `npx hardhat bytecode <class>`.

```shell
$ npx hardhat bytecode Box
# The output is the same, so omitted...
```

**Contracts with Libraries**

Similar to the situation of the `initcode` command, if your contract need to be linked with libraries, the output will contain an address placeholder.


### dig

```shell
$ npx hardhat --network goerli dig example.eth
0x9548650b6A1775d3d411D625207519b7Fe227A5a
```

### version-pragma

If you want change the [version pragma](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#version-pragma) in all solidity files to the following:

```solidity
pragma solidity ^0.8.0;
```

then you can run

```shell
$ npx hardhat version-pragma "^0.8.0"
```

> **WARNING** This subcommand may damage the compatibility of your project since it will modify your source files. Make sure you can roll back the project in case of any unexpected modification before running this subcommand.

### Other subcommands

We are not covering usage of all subcommands, but you can run `npx hardhat <task name> --help` for their usage.

```shell
$ npx hardhat balance --help
```


## Looking for other features?

Well, there are also many other awesome packages extending hardhat CLI, such as
- verify

  [hardhat-etherscan](https://github.com/NomicFoundation/hardhat/tree/master/packages/hardhat-etherscan) can help you verify and publish contract source code on  [Etherscan](https://etherscan.io).
  
- prepend-spdx-license

  [Hardhat SPDX License Identifier](https://github.com/ItsNickBarry/hardhat-spdx-license-identifier) can help you prepend local Solidity source files with an SPDX License Identifier.

Or, any contribution to this repository is welcome :-)

