const ApprovalContract = artifacts.require("../../contracts/ApprovalContract.sol")

contract("ApprovalContract", function (accounts) {
    it("initiates contract", async function() {
        const contract = await ApprovalContract.deployed();
        const approver = await contract.approver.call();
        assert.equal(approver, 0xD516AEFa17fbc6aCe949bCDF2275E2c93fE8FA52, "approvers don't match");
    });

    it("takes a deposit", async function() {
        const contract = await ApprovalContract.deployed();
        await contract.deposit(accounts[0], {value: 1e+18, from: accounts[1]});
        var balance = await web3.eth.getBalance(contract.address);
        assert.equal(balance, 1e+18, "amount did not match");
    });
});