import axios from "axios";

const TESTNET_API = "https://blockstream.info/testnet/api/"
const MAINNET_API = "https://blockstream.info/api/"

export const getBitcoinBalance = async (address: string, testnet: boolean) => {
    const url = testnet ? `${TESTNET_API}address/${address}` : `${MAINNET_API}address/${address}`
    const response = await axios.get(url)
    console.log(response.data)
    const chain_stats = response.data.chain_stats
    const mempool_stats = response.data.mempool_stats
    const balance = chain_stats.funded_txo_sum - chain_stats.spent_txo_sum + (mempool_stats.funded_txo_sum - mempool_stats.spent_txo_sum)
    return balance
}