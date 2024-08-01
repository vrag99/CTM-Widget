import axios from "axios"

interface ThorAsset {
    asset: string;
    chain: string;
    assetContractAddr?:string
}
export class ThorchainSDKProvider {

    public POOLS_ENDPOINT = "https://thornode.ninerealms.com/thorchain/pools"
    public SWAP_ENDPOINT = "https://thornode.ninerealms.com/thorchain/quote/swap?"
    public Assets: ThorAsset[] = []



    public async getQouteParam(fromIndex:number,toIndex:number, amount: number) {
        const from = this.Assets[fromIndex]
        const to = this.Assets[toIndex]
        const url = `${this.SWAP_ENDPOINT}from_asset=${from.chain}.${from.asset}&to_asset=${to.chain}.${to.asset}&amount=${amount}`
        const response = await axios.get(url,{
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.data
    }

    public async getAssets() {
        const response = await axios.get(
            this.POOLS_ENDPOINT,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data
    }

    public async setAssets() {
        console.log("setting assets")
       const data = await this.getAssets()
         this.Assets = data.map((asset: any) => {
            const splitted = asset.asset.split(".")
              return {
                asset: splitted[1],
                chain: splitted[0],
              }
         }) 
    }

}