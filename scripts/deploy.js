const main = async ()=> {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await hre.ethers.provider.getBalance(deployer);
    
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account Balance ", accountBalance.toString());


    const FeedbackContractFactory = await hre.ethers.getContractFactory("Feedback");
    const feedbackContract = await FeedbackContractFactory.deploy();

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