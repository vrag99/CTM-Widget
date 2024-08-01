import { Chains ,Chain} from "@chainflip/sdk/swap";

const eth = Chains.Ethereum
const btc = Chains.Bitcoin
const arb = Chains.Arbitrum
const pol = Chains.Polkadot
interface ChainWallets {
    [index:string]:{
        id:string[],
        name:string
    }
}
export const WALLETS :ChainWallets= {
    "Ethereum":{
        id:["io.metamask","io.xdefi","app.subwallet"],
        name:"Metamask"
    },
    "Bitcoin":{
        id:["io.xdefi"],
        name:"XDEFI"
    },
    "Arbitrum":{
        id:["io.xdefi","app.subwallet","io.metamask"],
        name:"XDEFI"
    },
    "Polkadot":{
        id:["app.subwallet"],
        name:"Subwallet"
    }
}