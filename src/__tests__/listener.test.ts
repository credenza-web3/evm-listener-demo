import dotenv from "dotenv";
import { Contract, Wallet, JsonRpcProvider } from "ethers";
import { abi as erc20Abi } from '../../artifacts/contracts/erc20.sol/CustomToken.json'

dotenv.config();

if (!process.env.RPC_URL) {
  throw new Error('WS_URL is not defined in .env');
}
if (!process.env.ERC_20_CONTRACT_ADDRESS) {
  throw new Error('ERC_20_CONTRACT_ADDRESS is not defined in .env');
}
if (!process.env.PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY is not defined in .env');
}

describe('ERC20 Listener', () => {
  test('Should transfer token', async () => {
    const provider = new JsonRpcProvider(process.env.RPC_URL);
    const wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);
    const contract = new Contract(process.env.ERC_20_CONTRACT_ADDRESS as string, erc20Abi, wallet);
    
    const transferTo = '0xc4f69e4fb203f832616f8ccb134ba25417455039'
    const transferAmount = 1; // wei
    
    const transferTx = await contract.transfer(transferTo, transferAmount);
    console.log(transferTx);
    expect(transferTx?.hash).toBeTruthy();
  });
});
