import { type TokenBoxVariant } from "@/lib/types";
import { useCentralStore } from "@/hooks/central-store";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/debounce";

export default function TokenInput({ type }: TokenBoxVariant) {
  const {fromAmount,toAmount,fromChain,toChain,setFromAmount} = useCentralStore();
  const debouncedFrom = useDebounce(fromAmount,500)
  // isko useEffect mei dependency use krke data nikalo
  //  0 < store.fromAmount < Balance && isFromTokenSelected && isToTokenSelected --> fetch swap data

  // Just for the type = "to"
  const [loadingSwappedAmount, setLoadingSwappedAmount] = useState(false);

  //** This is a dummy useEffect to simulate the loading state of the swapped amount
  useEffect(() => {
    async function fetchSwappedAmount() {
      setLoadingSwappedAmount(true);
      setLoadingSwappedAmount(false);
    }
    fetchSwappedAmount();
  }, []);

  return (
    <>
      {type === "from" ? (
        <input
          className="bg-transparent font-medium w-full text-4xl my-4 outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:brightness-50"
          placeholder={fromChain ? "0.00" : "--"}
          type="number"
          disabled={!fromChain}
          onChange={(e) => setFromAmount(e.target.value)}
        />
      ) : loadingSwappedAmount ? (
        <SwapAmountSkeleton />
      ) : (
        <input
          className="bg-transparent font-medium w-full text-4xl my-4 outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:brightness-50"
          placeholder={toChain ? "0.00" : "--"}
          disabled={!toChain}
          readOnly
        />
      )}
    </>
  );
}

function SwapAmountSkeleton() {
  return <Skeleton className="h-10 my-4 w-[250px]" />;
}
