import { ChainflipSdkProvider } from "@/lib/chainflip";
import { createContext } from "react";

export const ChainflipContext = createContext(new ChainflipSdkProvider({}));