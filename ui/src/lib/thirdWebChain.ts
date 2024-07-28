import { Chains } from "@chainflip/sdk/swap"
import { arbitrum, arbitrumSepolia, ethereum,  sepolia } from "thirdweb/chains"
export const ThirdWebChainsMap  = [
    {
        id:Chains.Ethereum,
        isTestnet:true,
        twChain:sepolia
    },
    {
        id:Chains.Arbitrum,
        isTestnet:true,
        twChain:arbitrumSepolia
    },
    {
        id:Chains.Ethereum,
        isTestnet:false,
        twChain:ethereum
    },
    {
        id:Chains.Arbitrum,
        isTestnet:false,
        twChain:arbitrum
    }
]