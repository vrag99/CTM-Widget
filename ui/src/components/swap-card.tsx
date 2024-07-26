import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FromAddress, ToAddress, SwapIcon } from "@/components/swap-user-data";
import TokenBox from "@/components/token-box";

export default function SwapCard() {
  return (
    <>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Swap</CardTitle>
        </CardHeader>
        <CardContent>
          <FromAddress />
          <TokenBox />
          <SwapIcon />
          <ToAddress />
          <TokenBox />
        </CardContent>
        <CardFooter>
          <CardDescription>Swap description</CardDescription>
        </CardFooter>
      </Card>
    </>
  );
}
