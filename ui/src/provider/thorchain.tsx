import { ThorchainContext } from "@/context/thorchain";
import { ThorchainSDKProvider } from "@/lib/thorchain";
import { useEffect, useState } from "react";


export const ThorChainProvider = ({ children }:{children:React.ReactNode}) => {
    const [sdk,] = useState<ThorchainSDKProvider>(new ThorchainSDKProvider());
    useEffect(()=>{
        sdk.setAssets()
    },[sdk])
    return (
        <ThorchainContext.Provider value={sdk}>
            {children}
        </ThorchainContext.Provider>
    );
}