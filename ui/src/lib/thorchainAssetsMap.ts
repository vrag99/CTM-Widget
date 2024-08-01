import { Assets, Chains } from "@chainflip/sdk/swap";
import { Token } from "./types";

export function throchainMap(chain:string){
    if(chain === "ETH"){
        return Chains.Ethereum
    } else if(chain === "BTC"){
        return Chains.Bitcoin
    }
    return ""
}