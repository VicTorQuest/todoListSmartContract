const main = async ()=> {
    const todoListContractFactory = await hre.ethers.getContractFactory('TodoList');
    const todoListContract = await todoListContractFactory.deploy();
    await todoListContract.waitForDeployment();


    // Log the deployed contract address
    // console.log("TodoList deployed to:", await todoListContract.getAddress());


    const today = Math.floor(Date.now() / 1000);
    await todoListContract.addTodo("first todo task", today, false);
    await todoListContract.addTodo("Second todo task", today, false);



    const todlist = await todoListContract.listTodos();
    console.log("Todo List:", todlist);


    await todoListContract.removeTodo(1);
    await todoListContract.updateTodo(2, 'New Second message');

    await todoListContract.completeTodo(2)
}




const runMain = async ()=> {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log();
        process.exit(1);
    }
}

runMain();