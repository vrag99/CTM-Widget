import { ChainflipSdkProvider } from "@/lib/chainflip";
import { createContext } from "react";

interface contextType {
    thirdwebSecretKey?: string;
    mobulaAPIKey?: string;
    sdk: ChainflipSdkProvider;
}

export const ChainflipContext = createContext<contextType>({
    thirdwebSecretKey: "",
    mobulaAPIKey: "",
    sdk:new ChainflipSdkProvider({})
});