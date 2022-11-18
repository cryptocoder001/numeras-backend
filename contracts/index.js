require("dotenv").config();
const { ethers } = require("ethers");

const Contrats = require("./contracts/4.json");

const supportChainId = 5;

const RPCS = {
    1: "http://13.59.118.124/eth",
    4: "https://rinkeby-light.eth.linkpool.io",
    5: "https://goerli.infura.io/v3/",
    250: "https://rpc.ftm.tools/",
    4002: "https://rpc.testnet.fantom.network",
    26: "https://rpc.icicb.com",
    417: "https://testnet-rpc.icicbchain.org",
    1337: "http://localhost:7545",
    31337: "http://localhost:8545/",
};

const providers = {
    4: new ethers.providers.JsonRpcProvider(RPCS[4]),
    5: new ethers.providers.JsonRpcProvider(RPCS[5]),
    // 250: new ethers.providers.JsonRpcProvider(RPCS[250]),
    // 4002: new ethers.providers.JsonRpcProvider(RPCS[4002]),
    26: new ethers.providers.JsonRpcProvider(RPCS[4]),
    // 417: new ethers.providers.JsonRpcProvider(RPCS[417]),
    // 1337: new ethers.providers.JsonRpcProvider(RPCS[1337]),
    // 31337: new ethers.providers.JsonRpcProvider(RPCS[31337]),
};

const wallet = new ethers.Wallet(
    process.env.PRIVATEKEY,
    providers[supportChainId]
);

const fswlContract = new ethers.Contract(
    Contrats.fswl.address,
    Contrats.fswl.abi,
    wallet
);
const syndicateContract = new ethers.Contract(
    Contrats.syndicate.address,
    Contrats.syndicate.abi,
    providers[supportChainId]
);

module.exports = {
    providers,
    fswlContract,
    syndicateContract,
    supportChainId,
};
