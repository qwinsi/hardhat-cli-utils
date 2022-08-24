# Hardhat CLI Utils

This package contains many predefined hardhat tasks to help you play with smart contracts by CLI.

| Task     | Description                                                   |
| -------- | ------------------------------------------------------------- |
| deploy   | Deploy contract.                                              |
| read     | Call (read) the method of contract on given address           |
| write    | Call (write) the method of contract on given address          |
| nonce    | Get the nonce of given account                                |
| bytecode | Get the runtime byte code on given contract address           |
| initcode | Get the creation byte code (excluding constructor parameters part) |
| dig      | Resolve given ENS domain name                                 |

## Installation

```shell
npm install --save-dev hardhat-cli-utils
```

And add the following statement to your `hardhat.config.js`:

```shell
require("hardhat-cli-utils");
```

Or, if you are using TypeScript, add this to your `hardhat.config.ts`:

```shell
import "hardhat-cli-utils";
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
// hardhat.config.js or hardhat.config.js
const config = {
    networks: {
        goerli: {
            url: "REPLACE_THIS_WITH_YOUR_RPC_URL",
            accounts: ["REPLACE_THIS_WITH_YOUR_PRIVATE_KEY"]
        },
}
```



- deploy

  Run with `npx hardhat --network <network> deploy <class> [...params]`. 

  On success, the address of contract created is outputted.

  ```shell
  $ npx hardhat --network goerli deploy Box 123
  0xb62208Cf91f8654D1Baa7Af12d1C6f7ad655dcd8
  ```

- read

  Run with `npx hardhat --network <network> read <class> <address> <method> [...params]`. 

  On success, the returned result is showed.
  
  ```shell
  $ npx hardhat --network goerli read Box 0xb62208Cf91f8654D1Baa7Af12d1C6f7ad655dcd8 getValue
  Return:  BigNumber { value: "123" }
  ```

- write

  Run with `npx hardhat --network <network> write <class> <address> <method> [...params]`. 

  On success, it output the link to view this transaction on [Etherscan](https://etherscan.io) . If there are events emitted during this transaction, then the events are showed.

  ```shell
  $ npx hardhat --network goerli write Box 0xb62208Cf91f8654D1Baa7Af12d1C6f7ad655dcd8 setValue 456
  View this tx at https://goerli.etherscan.io/tx/0x32e051dc4f3d20395b00b3715a23e908d5eaa4010ba237214f385676ff3c80bd
  No event emitted.
  Done!
  ```

- nonce

  Run with `npx hardhat --network <network> nonce <address>`. 

  Output the nonce of given account.

  ```shell
  $ npx hardhat --network goerli nonce 0xb62208Cf91f8654D1Baa7Af12d1C6f7ad655dcd8
  1
  ```

- etc.

  For usage of other more tasks, run `npx hardhat <task> --help`.

  ```shell
  $ npx hardhat bytecode --help
  $ npx hardhat initcode --help
  $ npx hardhat dig --help
  ```  


## Looking for other features?

- verify

  [hardhat-etherscan](https://github.com/NomicFoundation/hardhat/tree/master/packages/hardhat-etherscan) can help you verify and publish contract source code on  [Etherscan](https://etherscan.io).

  
