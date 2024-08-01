import {  Chains } from "@chainflip/sdk/swap";

export function throchainMap(chain:string){
    if(chain === "ETH"){
        return Chains.Ethereum
    } else if(chain === "BTC"){
        return Chains.Bitcoin
    }
    return ""
}