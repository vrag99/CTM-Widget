import { ChainflipContext } from "@/context/chainflip";
import { ChainflipSdkProvider } from "@/lib/chainflip";
import { ChainflipNetwork } from "@chainflip/sdk/swap";
import { Signer } from "ethers";
import { ReactNode, useState } from "react";

interface ChainflipProviderProps {
  children: ReactNode;
  useTestnet?: boolean; // optional prop to switch between testnet and mainnet
  brokerUrl?: string; // optional prop to set the broker url
  backendServiceUrl?: string; // optional prop to set the backend service url
  network?: ChainflipNetwork;
  signer?: Signer;
  commisionBps?: number;
  rpcUrl?: string;
  thirdwebSecretKey?:string;
  mobulaAPIKey?:string;
}

export const ChainflipProvider = ({
  children,
  useTestnet = false,
  commisionBps,
  signer,
  backendServiceUrl,
  brokerUrl,
  rpcUrl,
  network,
  thirdwebSecretKey,
  mobulaAPIKey
}: ChainflipProviderProps) => {
  const getBroker = () => {
    if (brokerUrl) {
      return {
        url: brokerUrl,
        commissionBps: commisionBps ? commisionBps : 0,
      };
    }
    return undefined;
  };
  const [sdk, ] = useState(
    new ChainflipSdkProvider({
      network: network ? network : useTestnet ? "perseverance" : "mainnet",
      signer,
      rpcUrl,
      broker: getBroker(),
      backendServiceUrl,
    })
  );
  return (
    <ChainflipContext.Provider value={{sdk , thirdwebSecretKey,mobulaAPIKey}} >
      {children}
    </ChainflipContext.Provider>
  );
};
