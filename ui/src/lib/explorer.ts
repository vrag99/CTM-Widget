import { Chain, Chains } from "@chainflip/sdk/swap";


export const getExplorerLink = (chain: Chain, address: string, testnet: boolean): string => {
    if (!testnet) {
        switch (chain) {
            case Chains.Ethereum:
                return `https://etherscan.io/address/${address}`
            case Chains.Bitcoin:
                return "https://blockstream.info/address/" + address
            case Chains.Polkadot:
                return `https://polkadot.subscan.io/account/` + address
            default:
                return ""
        }
    } else {
        switch (chain) {
            case Chains.Ethereum:
                return `https://sepolia.etherscan.io/address/${address}`
            case Chains.Bitcoin:
                return "https://blockstream.info/testnet/address/" + address
            case Chains.Polkadot:
                return `https://polkadot.subscan.io/account/` + address
            default:
                return ""
        }
    }
}
