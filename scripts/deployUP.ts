import hre from 'hardhat';
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

// load env vars
dotenv.config();

async function main() {
  // setup provider
  const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');
  // setup signer (the browser extension controller)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
  // load the associated UP
  const UP = await ethers.getContractAt('UniversalProfile', process.env.UP_ADDR as string);
  console.log('🔑 EOA: ', signer.address);
  console.log('🆙 Universal Profile: ', await UP.getAddress());

  /**
   * Custom LSP7 Token
   */
  console.log('⏳ Deploying the custom Token');
  const CustomTokenBytecode = hre.artifacts.readArtifactSync('CustomToken').bytecode;

  // get the address of the contract that will be created
  const CustomTokenAddress = await UP.connect(signer).execute.staticCall(
    1,
    ethers.ZeroAddress,
    0,
    CustomTokenBytecode,
  );

  // deploy CustomLSP7 as the UP (signed by the browser extension controller)
  const tx1 = await UP.connect(signer).execute(1, ethers.ZeroAddress, 0, CustomTokenBytecode);
  await tx1.wait();

  console.log('Custom token address: ', CustomTokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
