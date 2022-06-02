
# Hardhat BoilerPlate

BoilerPlate for Hardhat with network configuration, frontend json generator, scripts and verification etc

## Project Setup
### Environment Variable Setup
    NODE_API= "JSON RPC NODE"
    ETHERSCAN_API_KEY = "Ether Scan Api Key"
    PRIVATEKEY = "Account Private Key"
    ACCOUNT = "Account Address"
Install Packages : ```npm i -D```\
Compile Contracts : ```npm run compile```
### Hardhat Commands
Test : ```npm run test```\
Deploy : ```npm run deploy```
### Localhost Commands
Start Local Blockchain Server : ```npm run node```\
Test on Localhost : ``` npm run test-localhost```\
Deploy on Localhost :  ```npm run deploy-localhost```
### Testnet Commands
Deploy on Testnet : ```npm run deploy-testnet```\
    Change the testnet as per requirement in package.json file in deploy-testnet script ```HARDHAT_NETWORK=your preferred testnet/mainnet name``` 
