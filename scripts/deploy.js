const main = async ()=> {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await hre.ethers.provider.getBalance(deployer);
    
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account Balance ", accountBalance.toString());


    const todoListContractFactory = await hre.ethers.getContractFactory("TodoList");
    const feedbackContract = await todoListContractFactory.deploy();

    await feedbackContract.waitForDeployment();
    console.log("Contract deployed to:", feedbackContract.target);
}



const runMain = async ()=> {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

runMain();