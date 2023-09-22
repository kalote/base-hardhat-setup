# Basic sample hardhat project

This project is used as a guide to show how to setup hardhat with LUKSO. You can find more info here: [Hardhat guide](https://docs.lukso.tech/guides/hardhat-walkthrough/hardhat-base-setup)

## Environment variables

This example requires 2 environment variables. To set it up, use `cp .env.example .env` to copy the example file provided. In the `.env`, fill the following info:

- `PRIVATE_KEY` => your UP private key. To get it:
  - go in the UP browser extension
  - click on the ⚙️ icon in the top right
  - click on "Reveal private keys"
  - copy the value of the `privateKey` fied
- `UP_ADDR` => the address of your UP (you can find it in your browser extension)

## Contracts

There are 2 contracts in the `contracts/` folder:

- MyCustomToken.sol => a simple LSP7 token
- MockContract.sol => used to generate the `universalProfile` TypeScript type

## Deploy

There are 2 deployment scripts in the `scripts/` folder:

- deployUP.ts => deploy the custom LSP7 token as a Universal Profile (recommended)
- deployEOA.ts => deploy the custom LSP7 token as an EOA

## Run

```bash
npm i
cp .env.example .env # provide the value for PRIVATE_KEY and UP_ADDR
npm run build
npx hardhat --network luksoTestnet run scripts/deployUP.ts # deploy the customToken contract as a UP (recommended)
npx hardhat --network luksoTestnet run scripts/deployEOA.ts # deploy the customToken contract as an EOA
```
