import { type TokenBoxVariant } from "@/lib/types";
import { useCentralStore } from "@/hooks/central-store";
import { useState, useEffect, useContext } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/debounce";
import { ChainflipContext } from "@/context/chainflip";
import { Chain } from "@chainflip/sdk/swap";
import { ethers } from "ethers";

export default function TokenInput({ type }: TokenBoxVariant) {
  const {
    fromAmount,
    toAmount,
    fromChain,
    toChain,
    setFromAmount,
    fromToken,
    toToken,
    setToAmount,
  } = useCentralStore();
  const debouncedFromAmount = useDebounce(fromAmount, 1000);
  const sdk = useContext(ChainflipContext);
  const [loadingSwappedAmount, setLoadingSwappedAmount] = useState(false);

  useEffect(() => {
    async function fetchSwappedAmount() {
      setLoadingSwappedAmount(true);
      if (
        Number(fromAmount) > 0 &&
        fromToken !== null &&
        toToken !== null &&
        fromChain &&
        toChain
      ) {
        const qoute = await sdk.getQoute({
          srcChain: fromChain as Chain,
          destChain: toChain as Chain,
          srcAsset: fromToken,
          destAsset: toToken,
          amount: fromAmount,
        });
        const outAmount =
          Number(qoute.quote.egressAmount) / 10 ** toToken.data.decimals;
        setToAmount(outAmount.toString());
      }
      setLoadingSwappedAmount(false);
    }

    fetchSwappedAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFromAmount, toChain, toToken, fromChain, fromToken]);

  return (
    <>
      {type === "from" ? (
        <AmountInput
          placeholder={fromChain ? "0.00" : "--"}
          type="number"
          disabled={!fromChain}
          onChange={(e) => setFromAmount(e.target.value)}
          value={fromAmount}
        />
      ) : loadingSwappedAmount ? (
        <SwapAmountSkeleton />
      ) : (
        <AmountInput
          placeholder={toChain ? "0.00" : "--"}
          disabled={!toChain}
          value={toAmount}
          readOnly
        />
      )}
    </>
  );
}

interface AmountInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

function AmountInput({
  error = false,
  errorMessage,
  ...props
}: AmountInputProps) {
  return (
    <div className="my-2">
      <input
        className={`bg-transparent font-medium w-full text-4xl py-2 outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:brightness-50 ${
          error && "border-b-2 border-b-destructive text-destructive"
        }`}
        pattern="^-?[0-9]\d*\.?\d*$"
        {...props}
      />
      {error && errorMessage && (
        <span className="text-destructive text-xs mt-1">{errorMessage}</span>
      )}
    </div>
  );
}

function SwapAmountSkeleton() {
  return <Skeleton className="h-10 my-4 w-[250px]" />;
}
