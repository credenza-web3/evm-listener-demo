## Setup

1. Install dependencies:

```bash
npm install
```

2. Compile contracts:

```bash
npx hardhat compile
```

## Running things

1. Run the application in one terminal:

```bash
npm run dev
```

2. Run tests in a second terminal:

```bash
npm run test
```

After tests complete, you can see the logs in the first terminal.

## Event Listening

ERC-1155 and ERC-721 contracts will be very similar to ERC-20 for event listening.

### Arguments Passed to Listener Callback

The arguments passed to the listener callback are defined in the contract ABI. For example, for ERC-20:

```json
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "Transfer",
  "type": "event"
}
```

You will have `(from, to, value, event)` in the arguments. The first 3 arguments come from the ABI and `event` is added by Ethers.

Everything of type "event" that is specified in the ABI can be listened to.

## Addresses

- Deployer address: `0xA290DD3014737aEBC4086290348dB04c76628dd9`
- ERC-20 address: `0x43b5318E311b8F3337E476EE4673A349b74e3272`

## Deploy new contract

```bash
npx hardhat run scripts/deploy-erc20.ts --network baseSepolia
```