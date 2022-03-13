const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("lobster");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of burgers lol
    let txn = await domainContract.register("burger", { value: hre.ethers.utils.parseEther('0.1') });
    await txn.wait();
    console.log("Minted domain burger.lobster");

    txn = await domainContract.setRecord("burger", "Am I a burger or a lobster??");
    await txn.wait();
    console.log("Set record for burger.lobster");

    const address = await domainContract.getAddress("burger");
    console.log("Owner of domain burger:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();