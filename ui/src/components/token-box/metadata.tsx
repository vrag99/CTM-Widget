// Balance, Amount in USD and slippage for the swapped token
import { Token, TokenBoxVariant } from "@/lib/types";
import { useCentralStore } from "@/hooks/central-store";
import { useContext, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { getPrice } from "@/lib/exchangeRate";
import { useDebounce } from "@/hooks/debounce";
import { Nullable } from "@/lib/types/nullable";
import { getWalletBalance } from "thirdweb/wallets";
import { useActiveAccount, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { createThirdwebClient, defineChain } from "thirdweb";
import { Chains } from "@chainflip/sdk/swap";
import { ThirdWebChainsMap } from "@/lib/thirdWebChain";
import { ChainflipContext } from "@/context/chainflip";


const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});
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
  const { fromChain, fromToken, toChain, toToken, fromAmount, toAmount } = useCentralStore(); // Get the amount in usd from this

  // This is for the amount conversion
  const [fromAmountInUSD, setFromAmountInUSD] = useState(0);
  const [toAmountInUSD, setToAmountInUSD] = useState(0);
  const [slippage, setSlippage] = useState(0); // in %age
  const debounceFromAmount = useDebounce(fromAmount, 1000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAmountInUSD() {

      setLoading(true);
      if (type === "from") {
        if (
          (Number(fromAmount) > 0) &&
          (fromToken !== null) &&
          (fromChain !== "")
        ) {
          const perToken = await getPrice(fromToken.id)
          setFromAmountInUSD(Number(fromAmount) * perToken);
        }
      } else {
        if (
          (Number(toAmount) > 0) &&
          (toToken !== null) &&
          (toChain !== "")
        ) {
          const perToken = await getPrice(toToken.id)
          setToAmountInUSD(Number(toAmount) * perToken);
        }
      }
      setLoading(false);
    }

    fetchAmountInUSD();
  }, [debounceFromAmount, type === "from" ? fromToken : toToken, type === "from" ? fromAmount : toAmount]);

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

  const { fromToken, toToken, toChain, fromChain } = useCentralStore();
  const account = useActiveAccount()
  const chain = useActiveWalletChain()
  const [loading, setLoading] = useState(false);
  const switchChain = useSwitchActiveWalletChain()
  const sdk = useContext(ChainflipContext)

  useEffect(() => {
    async function fetchBalance() {
      if (account !== undefined && chain !== undefined) {
        setLoading(true);
        if (type === "from") {
          if (fromToken !== null) {
            const twChain = ThirdWebChainsMap.find((chain) => chain.id === fromChain && chain.isTestnet === sdk.testnet)?.twChain
            if (twChain !== undefined) {

              if (chain !== twChain) {
                switchChain(twChain)
              }
              const balance = await getWalletBalance({
                address: account.address,
                chain: twChain,
                client,
                tokenAddress: fromToken.data.contractAddress
              })
              setFromBalance(Number(balance.displayValue));
            }
          }
        } else {
          if (toToken !== null && toChain !== "") {
            const twChain = ThirdWebChainsMap.find((chain) => chain.id === toChain && chain.isTestnet === sdk.testnet)?.twChain
            if (twChain !== undefined) {
              const balance = await getWalletBalance({
                address: account.address,
                chain: twChain,
                client,
                tokenAddress: toToken.data.contractAddress
              })
              setToBalance(Number(balance.displayValue));
            }
          }
        }
        setLoading(false);
      }
    }
    fetchBalance();
  }, [type === "from" ? fromToken : toToken, account, type === "from" ? fromChain : toChain]);

  return (
    <>
      {loading ? (
        <BalanceLoadingSkeleton />
      ) : (
        <p className="text-sm text-muted-foreground">
          Balance:{" "}
          <span className="text-foreground font-bold">
            {type === "from" ? (fromToken !== null ?
              `${fromBalance.toFixed(4)} ${fromToken.id}` : "--")
              : (toToken !== null) ? `${toBalance.toFixed(4)} ${toToken.id}` : "--"}{" "}
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
