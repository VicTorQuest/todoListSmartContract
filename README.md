# TodoList Smart Contract

A simple Solidity-based smart contract for managing a to-do list on the Ethereum blockchain. This contract allows users to add, remove, update, and mark to-do items as completed.

## Features

- **Add a Todo**: Add a new to-do item with a message, due date, and completion status.
- **Remove a Todo**: Remove a to-do item by its ID.
- **Update a Todo**: Update the message of an existing to-do item.
- **Complete a Todo**: Mark a to-do item as completed.
- **List Todos**: Retrieve the list of all to-do items.


## Contract Address
0x93027f1AF05BC281aB808Bf92A25c031ccC1799F


### Block Explorer Link
- View the contract on [Sepolia Etherscan](https://sepolia.etherscan.io/address/0x93027f1AF05BC281aB808Bf92A25c031ccC1799F#code).


### Network
- **Network**: Sepolia Testnet
- **Chain ID**: 11155111


### How to Interact
1. Go to the [Sepolia Etherscan contract page](https://sepolia.etherscan.io/address/0x93027f1AF05BC281aB808Bf92A25c031ccC1799F#code).
2. Use the **"Read Contract"** tab to view data (e.g., list todos).
3. Use the **"Write Contract"** tab to interact with the contract (e.g., add or remove todos). Connect your wallet (e.g., MetaMask) to submit transactions.



## Smart Contract Code

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract TodoList {
    constructor () {
        console.log("Todolist is now running");
    }

    struct TodoItem {
        uint id;
        string message;
        uint dueDate;
        bool completed;
    }

    TodoItem[] public todoList;
    uint public nextId = 1; // Unique ID for each todoitem

    function findTodoIndex(uint _id) internal view returns (uint) {
        for (uint i = 0; i < todoList.length; i++) {
            if (todoList[i].id == _id) {
                return i;
            }
        }
        return type(uint).max; // Return max uint if not found
    }

    function addTodo(string memory message, uint dueDate, bool completed) public  {
        todoList.push(TodoItem(nextId, message, dueDate, completed));
        nextId++;
        console.log(string(abi.encodePacked("Added '", message, "' to todo list")));
    }

    function removeTodo(uint _id) public {
        uint index = findTodoIndex(_id); // Find index of the item
        require(index < todoList.length, "Todo not found");
        string memory message = todoList[index].message;

        // Replace the item with the last item and pop
        todoList[index] = todoList[todoList.length - 1];
        todoList.pop(); // Remove the last item to prevent duplicates

        console.log(string(abi.encodePacked("Removed '", message, "' from todo list")));
    }

    function updateTodo(uint _id, string memory newMessage) public {
        uint index = findTodoIndex(_id); // Find index of the item
        require(index < todoList.length, "Todo not found");
        string memory message = todoList[index].message;
        todoList[index].message = newMessage;
        console.log(string(abi.encodePacked("Todo task '", message, "' has been updated to '", newMessage, "'")));
    }

    function completeTodo(uint _id) public {
        uint index = findTodoIndex(_id); // Find index of the item
        require(index < todoList.length, "Todo not found");
        string memory message = todoList[index].message;
        todoList[index].completed = true;
        console.log(string(abi.encodePacked("Todo task: ", message, " Has now been Completed")));
    }

    function listTodos() public view returns(TodoItem[] memory) {
        return todoList;
    }
}
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Hardhat](https://hardhat.org/) (for development and deployment)
---

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/todo-list-smart-contract.git
   cd todo-list-smart-contract
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
   PRIVATE_KEY=YOUR_PRIVATE_KEY
   ```
   - Replace `YOUR_ALCHEMY_API_KEY` with your Alchemy API key.
   - Replace `YOUR_PRIVATE_KEY` with your wallet's private key.

4. **Compile the Contract**:
   ```bash
   npx hardhat compile
   ```

---

## Deployment

### Deploy to Sepolia Testnet

1. **Fund Your Wallet**:
   Get Sepolia ETH from a faucet like [Alchemy Sepolia Faucet](https://sepoliafaucet.com/).

2. **Deploy the Contract**:
   Run the deployment script:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

   If successful, you'll see output like:
   ```
   TodoList deployed to: 0xYourContractAddress
   ```

3. **Verify the Contract (Optional)**:
   Verify your contract on Etherscan:
   ```bash
   npx hardhat verify --network sepolia 0xYourContractAddress
   ```

---

## Interacting with the Contract

### Using Hardhat Console

1. Start the Hardhat console:
   ```bash
   npx hardhat console --network sepolia
   ```

2. Interact with the contract:
   ```javascript
   const TodoList = await ethers.getContractFactory("TodoList");
   const todoList = await TodoList.attach("0xYourContractAddress");

   // Add a todo
   await todoList.addTodo("Buy groceries", Math.floor(Date.now() / 1000), false);

   // List todos
   const todos = await todoList.listTodos();
   console.log(todos);
   ```

