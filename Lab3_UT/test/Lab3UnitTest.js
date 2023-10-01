// const UnitTestingLab = artifacts.require("UnitTestingLab");

// contract("UnitTestingLab", (accounts) => {
//   let utLabInstance;

//   const owner = accounts[0];

//   const borrower = accounts[1];
//   const depositAmount = web3.utils.toWei("1", "ether");
//   const borrowAmount = web3.utils.toWei("0.000000000001", "ether");

//   before(async () => {
//     utLabInstance = await UnitTestingLab.deployed();
//   });

//   it("should allow the owner to deposit Ether", async () => {
//     await utLabInstance.depositFunds({ from: owner, value: depositAmount });
//     const utlab3 = await utLabInstance.getVaultBalance();
//     assert.equal(utlab3.toString(), depositAmount, "Deposit failed");
//   });



// });


const LendingContract = artifacts.require("LendingContract");

contract("LendingContract", (accounts) => {
  let lendingContractInstance;
  const owner = accounts[0];
  const user1 = accounts[1];
  const depositAmount = web3.utils.toWei("1", "ether");
  const borrowAmount = web3.utils.toWei("0.5", "ether");

  beforeEach(async () => {
    lendingContractInstance = await LendingContract.new({ from: owner });
  });

  it("should allow users to depositFunds Ether", async () => {
    await lendingContractInstance.depositFunds({ from: user1, value: depositAmount });
    const user1Balance = await lendingContractInstance.balances(user1);
    assert.equal(user1Balance.toString(), depositAmount, "Deposit failed for user1");
  });

  it("should allow users to borrowFunds Ether", async () => {
    await lendingContractInstance.depositFunds({ from: user1, value: depositAmount });

    const initialUser1Balance = await web3.eth.getBalance(user1);
    await lendingContractInstance.borrowFunds(borrowAmount, { from: user1 });
    const finalUser1Balance = await web3.eth.getBalance(user1);

    // Check that user1's balance is approximately equal to the expected balance
    const expectedFinalBalance = new web3.utils.BN(initialUser1Balance).sub(new web3.utils.BN(borrowAmount));
    const tolerance = new web3.utils.BN("1e14"); // Define a tolerance level (adjust as needed)

    assert.isTrue(
      finalUser1Balance.sub(expectedFinalBalance).abs().lte(tolerance),
      "Borrowing failed for user1"
    );
  });

  it("should not allow users to borrow more than available liquidity", async () => {
    await lendingContractInstance.depositFunds({ from: user1, value: depositAmount });

    try {
      // Attempt to borrow more than the available balance
      await lendingContractInstance.borrowFunds(depositAmount + 1, { from: user1 });
      // If the borrow succeeds, fail the test
      assert.fail("Borrowing more than available liquidity should fail");
    } catch (error) {
      // Check that the error message indicates "Insufficient balance"
      assert.include(error.message, "Insufficient balance", "Unexpected error message");
    }
  });
});
