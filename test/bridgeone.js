const BridgeOne = artifacts.require('BridgeOne');
const ContractOne = artifacts.require('ContractOne');

contract("BridgeOne", (accounts) => {
  it("should deposit and withdraw tokens", async () => {
    const bridgeInstance = await BridgeOne.deployed();
    const tokenInstance = await ContractOne.deployed();

    const sender = accounts[0];
    const recipient = accounts[1];
    const amount = web3.utils.toWei("1", "ether");

    // Deposit tokens
    await tokenInstance.approve(bridgeInstance.address, amount, { from: sender });
    await bridgeInstance.deposit(amount, { from: sender });

    // Check balance in the bridge contract
    const bridgeBalance = await tokenInstance.balanceOf(bridgeInstance.address);
    assert.equal(bridgeBalance.toString(), amount, "Bridge balance is incorrect");

    // Withdraw tokens
    await bridgeInstance.withdraw(recipient, amount, { from: sender });

    // Check recipient balance
    const recipientBalance = await tokenInstance.balanceOf(recipient);
    assert.equal(recipientBalance.toString(), amount, "Recipient balance is incorrect");
  });
});
