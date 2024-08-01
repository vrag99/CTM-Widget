import { ThorchainSDKProvider } from "@/lib/thorchain";
import { createContext } from "react";

export const ThorchainContext = createContext(new ThorchainSDKProvider());