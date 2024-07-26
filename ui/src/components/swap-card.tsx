import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FromAddress,
  ToAddress,
  SwapIcon,
  GasFees,
} from "@/components/swap-user-data";
import TokenBox from "@/components/token-box";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import TransactionHistory from "./transaction-history";
import Settings from "./settings";

export default function SwapCard() {
  return (
    <>
      <Card className="min-w-[400px] bg-transparent backdrop-blur-[3px]">
        <CardHeader className="flex flex-row items-center mb-2 justify-between">
          <h1 className="text-3xl font-semibold">Swap</h1 >
          <div className="space-x-2">
            <Settings />
            <TransactionHistory />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FromAddress />
          <TokenBox type="from" />
          <SwapIcon />
          <ToAddress />
          <TokenBox type="to" />
          <GasFees />
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
    </>
  );
}
