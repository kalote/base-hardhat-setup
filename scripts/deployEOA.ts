import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Hardhat has some issues with EIP 1559 settings, so we force it
  // See this issue for more info: https://github.com/NomicFoundation/hardhat/issues/3418
  const { maxFeePerGas, maxPriorityFeePerGas } = await ethers.provider.getFeeData();
  const customToken = await ethers.deployContract('CustomToken', {
    maxFeePerGas,
    maxPriorityFeePerGas,
    type: 2,
  });

  await customToken.waitForDeployment();
  const CustomTokenAddress = await customToken.getAddress();
  console.log(`Token address: ${CustomTokenAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
