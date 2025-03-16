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
