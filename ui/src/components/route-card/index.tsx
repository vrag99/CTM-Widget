import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/types";
import SwapRoute from "./route";

// TODO: Replace with chain-icons and token-icons


export default function RouteCard() {
  const sampleData: Route[] = [
    {
      metadata: {
        gasPrice: "0.00018",
        time: 1690726456000,
      },
      path: [
        {
          amount: "1.0",
          amountInUSD: "1000.00",
          token: "eth",
          chain: "ethereum",
        },
        {
          amount: "2.0",
          amountInUSD: "2000.00",
          token: "usdc",
          chain: "arbitrum",
        },
      ],
    },
    {
      metadata: {
        gasPrice: "0.00009",
        time: 1690726456000,
      },
      path: [
        {
          amount: "10.0",
          amountInUSD: "5000.00",
          token: "btc",
          chain: "bitcoin",
        },
        {
          amount: "10.0",
          amountInUSD: "5000.00",
          token: "btc",
          chain: "bitcoin",
        },
        {
          amount: "10.0",
          amountInUSD: "5000.00",
          token: "btc",
          chain: "bitcoin",
        },
        {
          amount: "10.0",
          amountInUSD: "5000.00",
          token: "btc",
          chain: "bitcoin",
        },
        {
          amount: "10.0",
          amountInUSD: "5000.00",
          token: "btc",
          chain: "bitcoin",
        },
      ],
    },
    {
      metadata: {
        gasPrice: "0.00036",
        time: 1690726456000,
      },
      path: [
        {
          amount: "5.0",
          amountInUSD: "2500.00",
          token: "dot",
          chain: "polkadot",
        },
        {
          amount: "3.0",
          amountInUSD: "1500.00",
          token: "usdt",
          chain: "ethereum",
        },
        {
          amount: "3.0",
          amountInUSD: "1500.00",
          token: "usdt",
          chain: "ethereum",
        },
        {
          amount: "3.0",
          amountInUSD: "1500.00",
          token: "usdt",
          chain: "ethereum",
        },

      ],
    },
  ];

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Routes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sampleData.map((route, index) => (
          <SwapRoute key={index} route={route} />
        ))}
      </CardContent>
      <CardFooter>
        <Button>Learn More</Button>
      </CardFooter>
    </Card>
  );
}
