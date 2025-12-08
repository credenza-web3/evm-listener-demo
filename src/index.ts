import { WebSocketProvider, Contract, BigNumberish } from "ethers";
import dotenv from "dotenv";

import { abi as erc20Abi } from '../artifacts/contracts/erc20.sol/CustomToken.json'

dotenv.config();

if (!process.env.WS_URL) {
  throw new Error('WS_URL is not defined in .env');
}
if (!process.env.ERC_20_CONTRACT_ADDRESS) {
  throw new Error('ERC_20_CONTRACT_ADDRESS is not defined in .env');
}

const provider = new WebSocketProvider(process.env.WS_URL as string);

async function listenErc20() { 
  const contract = new Contract(
    process.env.ERC_20_CONTRACT_ADDRESS as string,
    erc20Abi,
    provider
  );
  
  contract.on("Transfer", (...args) => {
    console.log(`Tx Hash: ${JSON.stringify(args)}`);
  })
  
  console.log('Listening to ERC20 contract events...');
}

async function main() { 
  await listenErc20();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});