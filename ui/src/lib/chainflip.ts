import { Asset, AssetData, Chain, ChainData, ChainflipNetwork, QuoteResponse, SwapSDK, } from "@chainflip/sdk/swap"
import { ethers } from "ethers";
import { Token } from "./types";

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

interface QouteOptions {
    srcChain: Chain;
    srcAsset: Token;
    destChain: Chain;
    destAsset: Token;
    amount:string;
    brokerCommissionBps?: number;
    affliateBrokers?: {account:string, commissionBps:number}[]; 
}

export class ChainflipSdkProvider {
    private sdk: SwapSDK
    constructor(options: sdkInitiationOptions) {
        this.sdk = new SwapSDK(options)
    }

    public async getQoute(
        params: QouteOptions
    ): Promise<QuoteResponse> {
        const {amount,srcAsset} = params
        const amountInAsset = ethers.parseUnits(amount,srcAsset.data.decimals) 
        return await this.sdk.getQuote({
            ...params,
            srcAsset:params.srcAsset.id,
            destAsset:params.destAsset.id,
            amount:amountInAsset.toString()
        })
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