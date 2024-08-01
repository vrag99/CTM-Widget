import { SwapSDK, Assets, Chains } from "@chainflip/sdk/swap";
import { Wallet, getDefaultProvider, ethers } from "ethers";
import axios from "axios";



const sdk = new SwapSDK({ network: "perseverance" })//testnet

//@ts-ignore
const abiCoder = new ethers.utils.AbiCoder();
const provider = getDefaultProvider("sepolia")

async function main() {

    const feeData = await provider.getFeeData()
    let arr: any = [];
    let gasPrice = feeData.gasPrice;
    let maxFeePerGas = feeData.maxFeePerGas;
    let maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
    // these are for the Gas calcualations for the ccm swap 

    if (gasPrice) {
        //@ts-ignore
        const gas = BigInt(2e7) * BigInt(ethers.utils.formatUnits(gasPrice, "wei"))

        const quoteRequest = {
            srcChain: Chains.Ethereum,
            destChain: Chains.Arbitrum,
            srcAsset: Assets.ETH,
            destAsset: Assets.ETH,
            amount: (1.5e16).toString(), // 0.015 ETH
        };

        // quote request for the step x--> ARB.ETH
        console.log(quoteRequest)
        console.log(await sdk.getQuote(quoteRequest));

        const config = {
            method: 'get',
            url: 'https://mayanode.mayachain.info/mayachain/quote/swap',
            params: {
                from_asset: 'ARB.ETH',
                to_asset: 'ETH.USDC',
                amount: '1500000',
                destination: '0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4'
            }
        };

        axios(config)
            .then(response => {
                //console.log(JSON.stringify(response.data));
                // arr.push(response.data.expected_amount_out)
                arr.push[response.data.inbound_address]
                arr.push[response.data.memo]
                arr.push[response.data.expiry]



            })
            .catch(error => {
                console.error(error);
            });

        // the response of the above get request results in the quote for the 
        // swap of ARB.ETH --> Y
        // where Y is the asset on the destination chain
        // this also gives us the memo, inbound address, expiry time

        const wallet = new Wallet("76585d57ace9d6a5baa80855f462f470aceaeecf3b7999a076ea5b9b861d1370", provider);
        // wallet from which the swap is to be executed

        const transactionHash = await sdk.executeSwap({
            srcChain: Chains.Ethereum,
            srcAsset: Assets.ETH,
            destChain: Chains.Arbitrum,
            destAsset: Assets.ETH,
            amount: (15e15).toString(),
            destAddress: "0x98C2D2B26C9B488D709281269e5937cE2604feDa",
            ccmMetadata: {
                message: abiCoder.encode(["address", "address", "uint", "string", "uint"], ["0x37f4bc8B3a06A751fC36BAA928d3fA5b63A540FC", "0x0000000000000000000000000000000000000000", "15000000000000000", `${arr[1]}`, `${arr[2]}`]) as '0x${string}',
                gasBudget: gas.toString()
            }
        },
            { //@ts-ignore
                signer: wallet
            })

            console.log(transactionHash)
            // this is the execute swap call along with ccm of the Chainflip SDK
            

    }
}

main();
