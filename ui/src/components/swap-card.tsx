import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FromAddress, ToAddress, SwapIcon } from "@/components/swap-user-data";
import TokenBox from "@/components/token-box";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import TransactionHistory from "./transaction-history";
import Settings from "./settings";
import { ChainInfo } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { CHAIN_ICONS } from "@/lib/chain-icon";
import { ChainflipContext } from "@/context/chainflip";
import {
  ThirdwebProvider
} from "thirdweb/react";
import RouteCard from "./routes";
import { type Route } from "@/lib/types";

import SwapProgress from "@/components/swap-progress";
import ConnectWallet from "./connect-wallet";
import { SelectedRoute, SelectedRouteLoadingSkeleton } from "./routes/selectedRoute";
import { useCentralStore } from "@/hooks/central-store";
import { convertToRoute, thorchainQouteToRoute } from "@/lib/helper/qouteToRoute";
import { QouteOptions } from "@/lib/chainflip";
import { Chain } from "@chainflip/sdk/swap";
import { ethers } from "ethers";

export default function SwapCard() {
  const [availableChains, setAvailableChains] = useState<ChainInfo[]>([]);
  const sdk = useContext(ChainflipContext);
  useEffect(() => {
    sdk.getChains().then((chains) => {
      const chainsInfo = chains.map((chain) => ({
        id: chain.chain,
        data: chain,
        icon: CHAIN_ICONS.find((chainIcon) => chainIcon.name === chain.name)
          ?.icon,
      }));
      setAvailableChains(chainsInfo);
    });
  }, []);

  const {
    fromChain,
    fromAmount,
    fromToken,
    toChain,
    toToken,
    setSwapEnabled,
    qoute,
    walletConnected,
    loading,
    thorchainQoute,
    fromAmountUSD,
    setToAmount,
    setToAmountUSD,
    setDepositAddressResponse,
    destinationAddress


  } = useCentralStore();

  const [openRouteCard, setOpenRouteCard] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState<Route | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);


  const qouteToRoute = async () => {
    if (qoute !== null) {
      setIsRouteLoading(true);
      setSwapEnabled(true);
      const route = await convertToRoute(qoute, sdk);
      setSelectedRoutes(route);
      setRoutes([route]);
      if (thorchainQoute === null) {
        setIsRouteLoading(false);
      }
    }
  };

  useEffect(() => {
    qouteToRoute();
  }, [qoute]);


  async function setRoutesAsync() {
    if (thorchainQoute && fromToken && toToken) {
      const thorRoute = await thorchainQouteToRoute({
        qoute: thorchainQoute,
        fromToken,
        toToken,
        toChain,
        fromChain,
        fromAmount,
        fromAmountUSD,
      });
      if (thorRoute !== undefined) {
        const prevroutes = [...routes];
        const newRoutes = [...prevroutes, thorRoute];
        setRoutes(newRoutes);
      }
    }
  }
  useEffect(() => {
    setRoutesAsync().finally(() => setIsRouteLoading(false));
  }, [selectedRoutes, thorchainQoute])

  useEffect(() => {
    if (selectedRouteIndex >= 0 && selectedRouteIndex < routes.length && selectedRouteIndex !== null) {
      const route = routes[selectedRouteIndex];
      setToAmount(route.path[route.path.length - 1].amount.toString())
      setToAmountUSD(route.path[route.path.length - 1].amountInUSD)
      setOpenRouteCard(false)
    }
  }, [selectedRouteIndex])

  const hanleSwapClicked = async () => {
    if (destinationAddress === "") return;
    setOpenSwapProgress(true);
    const route = routes[selectedRouteIndex];
    console.log(route)
    if (route.sdk === "Chainflip" && fromToken && toToken) {
      console.log("hrere")
      console.log(Number(fromAmount))
      const options: QouteOptions = {
        srcAsset:fromToken,
        destAsset:toToken,
        amount: (Number(fromAmount)*(10**fromToken.data.decimals)).toString(),
        srcChain:fromChain as Chain,
        destChain:toChain as Chain
      }
      console.log(options)
      const depositAddr = await sdk.getDepositAddress(options, destinationAddress);
      console.log(depositAddr )
      setDepositAddressResponse(depositAddr);
    }

  }


  const [openSwapProgress, setOpenSwapProgress] = useState(false);

  const { swapEnabled } = useCentralStore();

  return (
    <>
      <ThirdwebProvider>
        <div className="*:w-[420px] relative overflow-hidden">
          <Card
            className={`bg-card/20 min-h-[42rem] max-h-[50rem] backdrop-blur-md z-50 transition-all duration-500 ${openRouteCard || (openSwapProgress && "brightness-50")
              }`}
          >
            <CardHeader className="flex flex-row items-center mb-2 justify-between">
              <CardTitle>Swap</CardTitle>
              <div className="space-x-2">
                <Settings />
                <TransactionHistory />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FromAddress />
              <TokenBox availableChains={availableChains} type="from" />
              <SwapIcon />
              <ToAddress />
              <TokenBox availableChains={availableChains} type="to" />
              {selectedRoutes &&
                (loading || isRouteLoading ? (
                  <SelectedRouteLoadingSkeleton />
                ) : (
                  <SelectedRoute
                    route={
                      routes[selectedRouteIndex]
                    }
                    openRouteCard={openRouteCard}
                    setOpenRouteCard={setOpenRouteCard}
                  />
                ))}
            </CardContent>
            <CardFooter>
              {!walletConnected ? (
                <ConnectWallet />
              ) : (
                <Button
                  className="w-full text-base"
                  size={"lg"}
                  variant={"expandIcon"}
                  iconPlacement="right"
                  Icon={ArrowUpDown}
                  disabled={!swapEnabled}
                  onClick={hanleSwapClicked}
                >
                  Swap
                </Button>
              )}
            </CardFooter>
          </Card>
          <RouteCard
            selectedRouteIndex={selectedRouteIndex}
            setSelectedRouteIndex={setSelectedRouteIndex}
            routes={routes}
            open={openRouteCard}
            setOpen={setOpenRouteCard}
          />
          <SwapProgress open={openSwapProgress} setOpen={setOpenSwapProgress} />
        </div>
      </ThirdwebProvider>
    </>
  );
}
