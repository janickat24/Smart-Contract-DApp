# Simple Decentralized App (DApp) on Ethereum Ropsten Testnet

### Introduction
This repository contains the source code of a smart contract written in Solidity that is deployed on the Ethereum Ropsten testnet network. There is also a web app hosted on Swarm (this is the DApp) that interacts with the smart contract in the back-end through the Ethereum web3 stack. The DApp provides a user interface (UI) to facilitate the transfer of ether between two Ethereum addresses through the smart contract which also requires an approver to complete the transaction.

### Repository Structure
```
.
├───bin
│   └───contracts
├───build
│   └───contracts
├───contracts
├───migrations
├───test
└───web
```

### Setup Development Environment
1. First install truffle. Truffle functions as a test server and compiler for our smart contracts written in Solidity: `npm install -g truffle`
2. Install the MetaMask extension on Google Chrome. Setup a password and save your seed words as a file. MetaMask will manage our Ethereum accounts.
3. Start the truffle development environment in the project root directory: `truffle develop`. Take note of the see phrase returned by this command. If starting a new truffle project it is necessary to run `truffle init` first.
4. In MetaMask, create a custom RPC network by select the current network and changing it to `Custom RPC`. Set the value of `New RPC URL` to `http://localhost:9545` which is where the truffle development server is running.
5. In MetaMask, click on the account icon and hit lock. Now restore the account in MetaMask using the `Import using account seed phrase` option. Follow the instructions on-screen using seed phrase from step 3.

### Compile and Test Smart Contract
1. Compile smart contract:
```
cd ./contracts
truffle compile
```
2. Start truffle development server: `truffle develop`
3. In a new terminal run the tests:
```
cd ./
truffle tests
```

### Deploy Smart Contract to the Ropsten Testnet Network
1. Install Go Ethereum from [here](https://geth.ethereum.org/downloads/).
2. Create an account on the Ropsten testnet using geth: `geth --testnet account new`
3. Sync blocks from the Ropsten testnet network to your local machine: `geth --testnet --syncmode fast --cache 1024 --rpc --rpcapi eth,net,web3,personal`. Keep this command running as long as you are using geth.
4. Check to see if the sync completed by running the following commands in a new terminal (`eth.syncing` will return false if the network has completed syncing, otherwise it will return information describing sync progress):
```
getch attach http://127.0.0.1:8545
eth.syncing
```
5. Deposit some ether into the account created in step 2 from the [Ropsten faucet](https://faucet.ropsten.be/).
6. If the sync has completed then you should be able to check the balance of the account created in step 2 in a new terminal (there should be 1 ETH):
```
getch attach http://127.0.0.1:8545
eth.getBalance(eth.accounts[0])
```
7. If you want to be able to approve the contract with one of your own accounts change `address public constant approver` in `./contracts/ApprovalContract.sol` to one of your geth accounts. Change the `from:` address in line 136 of `./web/index.html` to match as well. The approver account must have some ether to pay the gas cost associated with approving the transaction.
8. In a new terminal, deploy the smart contract to the ropsten testnet: `truffle migrate --network ropsten`
9. Update `var contractAddress` in `./web/index.html` with the address of the newly deployed contract. You can find the contract address on [Etherscan](https://ropsten.etherscan.io/) by looking up the transaction history for the address created in step 2.

### Deploy DApp to Swarm
1. Download [Swarm](https://swarm.ethereum.org/downloads/)
2. Find your default `--datadir value` for geth by running: `geth --help` and locating the default value.
3. Navigate to the directory with swarm.exe and run the following command: `swarm --ens-api "" --bzzaccount <your geth account address> --datadir C:\Users\joanicka\AppData\Local\Ethereum\ropsten`. Set the `--datadir` option to the value from step 2 with the `ropsten` path appended. Keep this command running as long as you are using swarm.
4. Upload the web assets to swarm: `swarm --recursive up ".\web"`. Take note of the returned value.
5. Navigate to the deployed DApp on swarm in Google Chrome: `http://localhost:8500/bzz:/<value returned in step 4>/index.html?`
6. Before you use the DApp click on the three dots by your account in MetaMask and select `Connected Sites` then select `Manually connect to current site`. You should also import your geth accounts to MetaMask by clicking on the account icon in MetaMask and selecting `Import Account`.




