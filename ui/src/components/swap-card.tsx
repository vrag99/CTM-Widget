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
import { ArrowUpDown, MoveRight } from "lucide-react";
import TransactionHistory from "./transaction-history";
import Settings from "./settings";
import { ChainflipSdkProvider } from "@/lib/chainflip";
import { ChainInfo } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { CHAIN_ICONS } from "@/lib/chain-icon";
import { ChainflipContext } from "@/context/chainflip";
import { ThirdwebProvider } from "thirdweb/react";
import RouteCard from "./routes";
import { type Route } from "@/lib/types";
import { UI_TOKEN_ICONS, UI_CHAIN_ICONS } from "@/lib/ui-icon-mappings";
import { ChevronRight } from "lucide-react";

export default function SwapCard() {
  const [availableChains, setAvailableChains] = useState<ChainInfo[]>([]);
  const sdk = useContext(ChainflipContext);
  // const {fromChain,toChain,fromToken,toToken} = useContext(ChainflipContext);
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

  const sampleRoutes: Route[] = [
    {
      metadata: {
        gasPrice: 0.00018,
        time: new Date(
          0,
          0,
          0,
          0,
          Math.floor(1690726456000 / 60000) % 60,
          Math.floor(1690726456000 / 1000) % 60
        ),
      },
      path: [
        {
          amount: 1.0,
          amountInUSD: 1000.0,
          token: "eth",
          chain: "ethereum",
        },
        {
          amount: 2.0,
          amountInUSD: 2000.0,
          token: "usdc",
          chain: "arbitrum",
        },
      ],
    },
    {
      metadata: {
        gasPrice: 0.00009,
        time: new Date(
          0,
          0,
          0,
          0,
          Math.floor(1690726456000 / 60000) % 60,
          Math.floor(1690726456000 / 1000) % 60
        ),
      },
      path: [
        {
          amount: 10.0,
          amountInUSD: 5000.0,
          token: "btc",
          chain: "bitcoin",
        },
        {
          amount: 10.0,
          amountInUSD: 5000.0,
          token: "btc",
          chain: "bitcoin",
        },
      ],
    },
    {
      metadata: {
        gasPrice: 0.00036,
        time: new Date(
          0,
          0,
          0,
          0,
          Math.floor(1690726456000 / 60000) % 60,
          Math.floor(1690726456000 / 1000) % 60
        ),
      },
      path: [
        {
          amount: 5.0,
          amountInUSD: 2500.0,
          token: "dot",
          chain: "polkadot",
        },
        {
          amount: 3.0,
          amountInUSD: 1500.0,
          token: "usdt",
          chain: "ethereum",
        },
        {
          amount: 3.0,
          amountInUSD: 1500.0,
          token: "usdt",
          chain: "ethereum",
        },
        {
          amount: 3.0,
          amountInUSD: 1500.0,
          token: "usdt",
          chain: "ethereum",
        },
      ],
    },
  ];

  const { fromChain, fromAmount, fromToken, toChain, toToken } =
    useCentralStore();

  // Route states
  const showRoutes = fromChain && fromToken && toChain && toToken && fromAmount;
  const [openRouteCard, setOpenRouteCard] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  const {swapEnabled} =useCentralStore();


  return (
    <>
      <ThirdwebProvider>
        <div className="*:w-[420px] relative overflow-hidden">
          <Card
            className={`bg-card/20 min-h-[44rem] max-h-[50rem] backdrop-blur-md z-50 transition-all duration-500 ${
              openRouteCard && "brightness-50"
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
              {showRoutes &&
                (isRouteLoading ? (
                  <SelectedRouteLoadingSkeleton />
                ) : (
                  <SelectedRoute
                    route={sampleRoutes[selectedRouteIndex]}
                    openRouteCard={openRouteCard}
                    setOpenRouteCard={setOpenRouteCard}
                  />
                ))}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full text-base"
                size={"lg"}
                variant={"expandIcon"}
                iconPlacement="right"
                Icon={ArrowUpDown}
                disabled={!swapEnabled}
              >
                Swap
              </Button>
            </CardFooter>
          </Card>
          <RouteCard
            selectedRouteIndex={selectedRouteIndex}
            setSelectedRouteIndex={setSelectedRouteIndex}
            routes={sampleRoutes}
            open={openRouteCard}
            setOpen={setOpenRouteCard}
          />
        </div>
      </ThirdwebProvider>
    </>
  );
}

// Selected route ka component, abhi idhar hai, place krna hai dhang se.
interface SelectedRouteProps {
  route: Route;
  openRouteCard: boolean;
  setOpenRouteCard: (openRouteCard: boolean) => void;
}

import Metadata from "./routes/route/metadata";
import { Skeleton } from "@/components/ui/skeleton";
import { useCentralStore } from "@/hooks/central-store";

function SelectedRoute(props: SelectedRouteProps) {
  const initialStep = props.route.path[0];
  const finalStep = props.route.path[props.route.path.length - 1];
  return (
    <div className="w-full transition-all duration-300 rounded-md border bg-accent py-2 px-3 space-y-1">
      <div className="flex flex-row justify-between items-center">
        <Metadata metadata={props.route.metadata} />
        <Button
          size={"sm"}
          variant={"linkHover2"}
          onClick={() => props.setOpenRouteCard(true)}
          className="text-sm font-semibold"
        >
          See Routes
        </Button>
      </div>
      <div className="w-full">
        <p className="text-sm inline-flex font-semibold items-center gap-1.5">
          {initialStep.amount} {initialStep.token.toUpperCase()}{" "}
          <MoveRight className="w-4 text-muted-foreground" /> {finalStep.amount}{" "}
          {finalStep.token.toUpperCase()}{" "}
          <span className="text-muted-foreground text-xs">
            (${finalStep.amountInUSD.toFixed(2)})
          </span>
        </p>
      </div>
      <div className="w-full flex flex-row items-center py-2 gap-2 rounded-md">
        {props.route.path.map((step, index) => (
          <>
            <div className="flex flex-row gap-1">
              <div key={index} className="flex flex-col items-center gap-1">
                <div className="w-6 h-6">
                  <img
                    src={UI_TOKEN_ICONS[step.token.toLowerCase()]}
                    className="w-6 h-6"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs">{step.amount.toFixed(2)}</p>
                <p className="text-[0.52rem] text-muted-foreground">
                  {step.token.toUpperCase()}
                </p>
              </div>
            </div>
            {index !== props.route.path.length - 1 && (
              <ChevronRight className="text-muted-foreground" size={20} />
            )}
          </>
        ))}
      </div>
    </div>
  );
}

function SelectedRouteLoadingSkeleton() {
  return <Skeleton className="h-28 w-full" />;
}
