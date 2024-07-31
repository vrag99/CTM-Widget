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
import { ChevronLeft } from "lucide-react";

interface RouteCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function RouteCard(props: RouteCardProps) {
  const sampleData: Route[] = [
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

  return (
    <Card
      className={`h-[50rem] absolute z-50 border-t transition-all duration-500 ease-in-out ${
        props.open && "-translate-y-[80%]"
      }`}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <Button
          size={"iconSm"}
          className="mt-2"
          variant={"secondary"}
          onClick={() => {
            props.setOpen(false);
          }}
        >
          <ChevronLeft />
        </Button>
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
