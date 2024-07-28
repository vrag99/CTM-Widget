import { Asset, AssetData, Chain, ChainData, ChainflipNetwork, QuoteResponse, SwapSDK, } from "@chainflip/sdk/swap"
import { ethers } from "ethers";

interface brokerOptions {
    url: string;
    commissionBps: number;
}

interface sdkInitiationOptions {
    network?: ChainflipNetwork;
    signer?: ethers.Signer;
    rpcUrl?: string;
    broker?: brokerOptions;
    backendServiceUrl?: string;

}

export class ChainflipSdkProvider {
    private sdk: SwapSDK
    constructor(options: sdkInitiationOptions) {
        this.sdk = new SwapSDK(options)
    }

    public async getQoute(
        srcChain: Chain, 
        srcAsset: Asset, 
        destChain: Chain, 
        destAsset: Asset, 
        amount: string, 
        destAddress: string, 
    ): Promise<QuoteResponse> {
        const swapParams = {
            srcChain: srcChain,
            srcAsset: srcAsset,
            destChain: destChain,
            destAsset: destAsset,
            amount: amount,
            destAddress: destAddress,
        }
        return await this.sdk.getQuote(swapParams)
    }

    public getImmediates(
        qoute:QuoteResponse
    )  {
        return qoute.quote.poolInfo
    }


    public async getAvailableChains(srcChain:Chain): Promise<ChainData[]> {
        return await this.sdk.getChains(srcChain)
    }

    public async getChains(): Promise<ChainData[]> {
        return await this.sdk.getChains()
    }

    public async getAwailableAssets(srcChain:Chain): Promise<AssetData[]> {
        return await this.sdk.getAssets(srcChain)
    }
}