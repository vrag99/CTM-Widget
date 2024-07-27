import { type TokenBoxVariant } from "@/lib/types";
import { useCentralStore } from "@/hooks/central-store";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TokenInput({ type }: TokenBoxVariant) {
  const store = useCentralStore();
  const isFromTokenSelected = store.fromChain && store.fromToken != "";
  const isToTokenSelected = store.toChain && store.toToken != "";
  // isko useEffect mei dependency use krke data nikalo
  //  0 < store.fromAmount < Balance && isFromTokenSelected && isToTokenSelected --> fetch swap data

  // Just for the type = "to"
  const [loadingSwappedAmount, setLoadingSwappedAmount] = useState(false);

  //** This is a dummy useEffect to simulate the loading state of the swapped amount
  useEffect(() => {
    async function fetchSwappedAmount() {
      setLoadingSwappedAmount(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoadingSwappedAmount(false);
    }
    fetchSwappedAmount();
  }, []);

  return (
    <>
      {type === "from" ? (
        <input
          className="bg-transparent font-medium w-full text-4xl my-4 outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:brightness-50"
          placeholder={isFromTokenSelected ? "0.00" : "--"}
          type="number"
          disabled={!isFromTokenSelected}
          onChange={(e) => store.setFromAmount(e.target.value)}
        />
      ) : loadingSwappedAmount ? (
        <SwapAmountSkeleton />
      ) : (
        <input
          className="bg-transparent font-medium w-full text-4xl my-4 outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:brightness-50"
          placeholder={isToTokenSelected ? "0.00" : "--"}
          disabled={!isToTokenSelected}
          readOnly
        />
      )}
    </>
  );
}

function SwapAmountSkeleton() {
  return <Skeleton className="h-10 my-4 w-[250px]" />;
}
