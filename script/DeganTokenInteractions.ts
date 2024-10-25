const ethers = require('ethers');

// ABI of the DegenToken contract (this is a simplified version, you'll need the full ABI in practice)
const abi = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address, uint256)",
  "function approve(address, uint256)",
  "function transferFrom(address, address, uint256)",
  "function burn(uint256)",
  "function mint(address, uint256)",
  "function redeemItem(uint8)",
  "function transferOwnership(address)"
];

// Replace with your contract address
const contractAddress = "YOUR_CONTRACT_ADDRESS";

// Replace with your Ethereum node URL (e.g., Infura endpoint)
const providerUrl = "YOUR_PROVIDER_URL";

// Replace with your private key (be careful with this!)
const privateKey = "YOUR_PRIVATE_KEY";

async function main() {
  //  ######## Connect to the Ethereum network ######

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  // ######## Create a contract instance #########
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  try {
    // ####### Check balance #######

    const balance = await contract.balanceOf(wallet.address);
    console.log(`Balance: ${ethers.utils.formatEther(balance)} DEGEN`);

    // ######## Transfer tokens #######

    const transferAmount = ethers.utils.parseEther("10");
    const transferTx = await contract.transfer("RECIPIENT_ADDRESS", transferAmount);
    await transferTx.wait();
    console.log(`Transferred 10 DEGEN tokens`);

    // ########### Approve tokens for another address #######

    const approveTx = await contract.approve("SPENDER_ADDRESS", transferAmount);
    await approveTx.wait();
    console.log(`Approved 10 DEGEN tokens for spending`);

    // ########## Burn tokens ###########

    const burnAmount = ethers.utils.parseEther("5");
    const burnTx = await contract.burn(burnAmount);
    await burnTx.wait();
    console.log(`Burned 5 DEGEN tokens`);

    // ####### Redeem an item (assuming item ID 0 exists) #######

    const redeemTx = await contract.redeemItem(0);
    await redeemTx.wait();
    console.log(`Redeemed item with ID 0`);

    // ####### Transfer ownership (only if you're the current owner) #######

    const newOwnerTx = await contract.transferOwnership("NEW_OWNER_ADDRESS");
    await newOwnerTx.wait();
    console.log(`Transferred ownership to new address`);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();