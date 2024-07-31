import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FromAddress, ToAddress, SwapIcon } from "@/components/swap-user-data";
import TokenBox from "@/components/token-box";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import TransactionHistory from "./transaction-history";
import Settings from "./settings";
import { ChainflipSdkProvider } from "@/lib/chainflip";
import { ChainInfo } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { CHAIN_ICONS } from "@/lib/chain-icon";
import { ChainflipContext } from "@/context/chainflip";
import { ThirdwebProvider } from "thirdweb/react";
import RouteCard from "./route-card";

export default function SwapCard() {
  const [availableChains, setAvailableChains] = useState<ChainInfo[]>([]);
  const sdk = useContext(ChainflipContext);
  useEffect(() => {
    //TODO: Add loading state and error handling
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

  const [showRoutes, setShowRoutes] = useState(false);

  return (
    <>
      <ThirdwebProvider>
        <div className="*:w-[400px] *:h-[44rem] relative overflow-hidden">
          <Card className="bg-card/20 backdrop-blur-md z-50">
            <CardHeader className="flex flex-row items-center mb-2 justify-between">
              <h1 className="text-3xl font-semibold">Swap</h1>
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
              <Button variant={"outline"} onClick={() => setShowRoutes(true)}>
                Show Routes
              </Button>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full text-base"
                size={"lg"}
                variant={"expandIcon"}
                iconPlacement="right"
                Icon={ArrowUpDown}
              >
                Swap
              </Button>
            </CardFooter>
          </Card>
          <RouteCard open={showRoutes} setOpen={setShowRoutes} />
        </div>
      </ThirdwebProvider>
    </>
  );
}
