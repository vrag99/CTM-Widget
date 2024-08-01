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
import {
  ThirdwebProvider,
  useActiveAccount,
  useActiveWallet,
  useConnectModal,
  useDisconnect,
} from "thirdweb/react";
import RouteCard from "./routes";
import { type Route } from "@/lib/types";
import { UI_TOKEN_ICONS, UI_CHAIN_ICONS } from "@/lib/ui-icon-mappings";
import { ChevronRight } from "lucide-react";
import SwapProgress from "@/components/swap-progress";

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
        time: 500,
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
        time: 600,
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
        time: 0,
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

  const {
    fromChain,
    fromAmount,
    fromToken,
    toChain,
    toToken,
    activeAddress,
    setActiveAddress,
    setSwapEnabled,
    qoute,
  } = useCentralStore();

  // Route states
  const showRoutes = fromChain && fromToken && toChain && toToken && fromAmount;
  const [openRouteCard, setOpenRouteCard] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState<Route | null>(null);

  const { walletConnected } = useCentralStore();

  async function convertToRoute(qoute: QuoteResponse): Promise<Route> {
    const data = qoute.quote;
    const fee = qoute.quote.includedFees
      .map(async (fee) => {
        const tokenData = await sdk.getAwailableAssets(fee.chain);
        const token = tokenData.find((token) => token.asset === fee.asset);
        if (!token) return 0;
        const amount =
          (Number(fee.amount) / 10 ** token.decimals) *
          (await getPrice(fee.asset));
        return amount;
      })
      .reduce(async (a, b) => (await a) + (await b));
    const metadata = {
      gasPrice: await fee,
      time: data.estimatedDurationSeconds,
    };
    const path: {
      amount: number;
      amountInUSD: number;
      token: string;
      chain: string;
    }[] = [];

    for (const [index, pool] of data.poolInfo.entries()) {
      const baseAssetPrice = await getPrice(pool.baseAsset.asset);
      const quoteAssetPrice = await getPrice(pool.quoteAsset.asset);
      const baseAssetTokenData = (
        await sdk.getAwailableAssets(pool.baseAsset.chain)
      ).find((token) => token.asset === pool.baseAsset.asset);
      const quoteAssetTokenData = (
        await sdk.getAwailableAssets(pool.quoteAsset.chain)
      ).find((token) => token.asset === pool.quoteAsset.asset);
      if (baseAssetTokenData && quoteAssetTokenData) {
        const quoteAssetAmount =
          Number(data.intermediateAmount) / 10 ** quoteAssetTokenData.decimals;
        let baseAssetAmount = 0; // Assuming this amount represents the intermediate amount in quote asset
        if (index === 0) {
          baseAssetAmount =
            Number(qoute.amount) / 10 ** baseAssetTokenData.decimals;
        } else if (index === data.poolInfo.length - 1) {
          baseAssetAmount =
            Number(data.egressAmount) / 10 ** baseAssetTokenData.decimals;
        }
        if (index % 2 === 0) {
          path.push(
            {
              amount: baseAssetAmount,
              amountInUSD: baseAssetAmount * baseAssetPrice,
              token: pool.baseAsset.asset,
              chain: pool.baseAsset.chain,
            },
            {
              amount: quoteAssetAmount,
              amountInUSD: quoteAssetAmount * quoteAssetPrice,
              token: pool.quoteAsset.asset,
              chain: pool.quoteAsset.chain,
            }
          );
        } else {
          path.push(
            {
              amount: Number(quoteAssetAmount.toFixed(2)),
              amountInUSD: Number(
                (quoteAssetAmount * quoteAssetPrice).toFixed(2)
              ),
              token: pool.quoteAsset.asset,
              chain: pool.quoteAsset.chain,
            },
            {
              amount: Number(baseAssetAmount.toFixed(2)),
              amountInUSD: Number(
                (baseAssetAmount * baseAssetPrice).toFixed(2)
              ),
              token: pool.baseAsset.asset,
              chain: pool.baseAsset.chain,
            }
          );
        }
      }
    }

    return {
      metadata,
      path: removeConsecutiveDuplicates(path),
    };
  }
  const qouteToRoute = async () => {
    if (qoute !== null) {
      setIsRouteLoading(true);
      setSwapEnabled(true);
      console.log(qoute);

      const route = await convertToRoute(qoute);
      console.log(route);
      setSelectedRoutes(route);
      setIsRouteLoading(false);
    }
  };

  useEffect(() => {
    qouteToRoute();
  }, [qoute]);
  // Swap progress states
  const [openSwapProgress, setOpenSwapProgress] = useState(false);

  const { swapEnabled } = useCentralStore();

  return (
    <>
      <ThirdwebProvider>
        <div className="*:w-[420px] relative overflow-hidden">
          <Card
            className={`bg-card/20 min-h-[42rem] max-h-[50rem] backdrop-blur-md z-50 transition-all duration-500 ${
              openRouteCard || (openSwapProgress && "brightness-50")
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
                    route={
                      selectedRoutes
                        ? selectedRoutes
                        : sampleRoutes[selectedRouteIndex]
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
                >
                  Swap
                </Button>
              )}
            </CardFooter>
          </Card>
          <RouteCard
            selectedRouteIndex={selectedRouteIndex}
            setSelectedRouteIndex={setSelectedRouteIndex}
            routes={sampleRoutes}
            open={openRouteCard}
            setOpen={setOpenRouteCard}
          />
          <SwapProgress open={openSwapProgress} setOpen={setOpenSwapProgress} />
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
import { getPrice } from "@/lib/exchangeRate";
import { Assets, Chain, Chains, QuoteResponse } from "@chainflip/sdk/swap";
import { removeConsecutiveDuplicates } from "@/lib/helper/removeDups";
import ConnectWallet from "./connect-wallet";

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
