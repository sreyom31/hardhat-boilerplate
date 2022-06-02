require("dotenv").config(".env");
const hre = require("hardhat");
const fs = require("fs");
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account Balance:", balance.toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  console.log("Token Deployed to:", token.address);
  await token.deployTransaction.wait([(confirms = 6)]);
  if (process.env.VERIFY === "verify") {
    const data = {
      address: token.address,
      abi: JSON.parse(token.interface.format("json")),
    };
    fs.writeFileSync("constants/Token.json", JSON.stringify(data));
    await hre.run("verify:verify", {
      address: token.address,
      // constructorArguments: ["My NFT",WETH],
    });
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
