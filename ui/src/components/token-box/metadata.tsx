// Balance, Amount in USD and slippage for the swapped token
import { TokenBoxVariant } from "@/lib/types";
import { useCentralStore } from "@/hooks/central-store";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

export default function Metadata({ type }: TokenBoxVariant) {
  return (
    <>
      <div className="flex flex-row justify-between">
        <AmountInUSD type={type} />
        <Balance type={type} />
      </div>
    </>
  );
}

function AmountInUSD({ type }: TokenBoxVariant) {
  // const { fromChain, fromToken, toChain, toToken } = useCentralStore(); // Get the amount in usd from this

  // This is for the amount conversion
  const [fromAmountInUSD, setFromAmountInUSD] = useState(0);
  const [toAmountInUSD, setToAmountInUSD] = useState(0);
  const [slippage, setSlippage] = useState(0); // in %age

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAmountInUSD() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
    fetchAmountInUSD();
  }, []);

  return (
    <>
      {loading ? (
        <AmountLoadingSkeleton />
      ) : (
        <p className="text-muted-foreground font-medium text-sm">
          ${type === "from" ? fromAmountInUSD : toAmountInUSD}{" "}
          {type === "to" && <span className="text-primary">({slippage}%)</span>}
        </p>
      )}
    </>
  );
}

function Balance({ type }: TokenBoxVariant) {
  // Populate balance in these states
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);

  const { fromToken, toToken } = useCentralStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBalance() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
    fetchBalance();
  }, []);

  return (
    <>
      {loading ? (
        <BalanceLoadingSkeleton />
      ) : (
        <p className="text-sm text-muted-foreground">
          Balance:{" "}
          <span className="text-foreground font-bold">
            {type === "from"
              ? `${fromBalance.toFixed(4)} ${fromToken}`
              : `${toBalance.toFixed(4)} ${toToken}`}{" "}
          </span>
        </p>
      )}
    </>
  );
}

function AmountLoadingSkeleton() {
  return <Skeleton className="h-5 w-32" />;
}

function BalanceLoadingSkeleton() {
  return <Skeleton className="h-5 w-48" />;
}
