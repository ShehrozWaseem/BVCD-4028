const Web3 = require("web3");
const contractOneABI = require("./build/contracts/BridgeOne.json").abi;
const contractTwoABI = require("./build/contracts/BridgeTwo.json").abi;



const web3ContractOne = new Web3("http://127.0.0.1:7545/");
const web3ContractTwo = new Web3("https://rpc-mumbai.maticvigil.com/");

const contractOneAddress = "0x4F9e72FF701E397Aeac54Bf4438E6532424617FF";
const contractTwoAddress = "0x5F6e863438204e47308427b72d80a3Ce38760A72";
const senderAddress = "0x637F7FfeDC1158b016e29274F4021C06677D63Bf";

const contractOne = new web3ContractOne.eth.Contract(contractOneABI, contractOneAddress);
const contractTwo = new web3ContractTwo.eth.Contract(contractTwoABI, contractTwoAddress);

async function transferTokens() {
  const amount = web3ContractOne.utils.toWei("1", "ether");

  // Deposit tokens on Ethereum
  await contractOne.methods.deposit(amount).send({ from: senderAddress });

  // Wait for confirmation and check bridge balance on Ethereum
  const contractOneBalance = await web3ContractOne.eth.getBalance(contractOneAddress);
  console.log(`ContractOne Bridge Balance: ${web3ContractOne.utils.fromWei(contractOneBalance, "ether")} TOKEN`);


  // Withdraw tokens on Sepolia
//   await contractTwo.methods.withdraw(senderAddress, amount).send({ from: senderAddress });

  // Wait for confirmation and check bridge balance on polygon
  const contractTwoBalance = await web3ContractTwo.eth.getBalance(contractTwoAddress);
  console.log(`ContractTwo Bridge Balance: ${web3ContractTwo.utils.fromWei(contractTwoBalance, "ether")} TOKEN`);
}

transferTokens();
