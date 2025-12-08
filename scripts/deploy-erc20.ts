import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance))
  // === Your custom token settings ===
  const TOKEN_NAME = "OneFootballTokenDemo";
  const TOKEN_SYMBOL = "OFTD";
  const INITIAL_SUPPLY = "1000000"; // readable units, without decimals
  const DECIMALS = 18;

  console.log("Deploying ERC-20 token...");
  console.log(`Name: ${TOKEN_NAME}`);
  console.log(`Symbol: ${TOKEN_SYMBOL}`);
  console.log(`Initial Supply: ${INITIAL_SUPPLY} (before decimals)`);

  const initialSupplyWei = ethers.parseUnits(INITIAL_SUPPLY, DECIMALS);

  const Token = await ethers.getContractFactory("CustomToken");
  const token = await Token.deploy(TOKEN_NAME, TOKEN_SYMBOL, initialSupplyWei);

  await token.waitForDeployment();

  const address = await token.getAddress();

  console.log("\n🎉 Deployment complete!");
  console.log("Token address:", address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
