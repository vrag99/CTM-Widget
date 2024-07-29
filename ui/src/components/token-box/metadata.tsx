import { Token, TokenBoxVariant } from "@/lib/types";
import { useCentralStore } from "@/hooks/central-store";
import { useContext, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getPrice } from "@/lib/exchangeRate";
import { useDebounce } from "@/hooks/debounce";
import { Nullable } from "@/lib/types/nullable";
import { getWalletBalance } from "thirdweb/wallets";
import {
  useActiveAccount,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { ThirdWebChainsMap } from "@/lib/thirdWebChain";
import { ChainflipContext } from "@/context/chainflip";
import { Chains } from "@chainflip/sdk/swap";
import { error } from "console";
import { mainnet } from "thirdweb/chains";
import { getBitcoinBalance } from "@/lib/bitcoin";

declare global {
  interface Window {
    xfi: any;
  }
}

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

export default function Metadata({ type }: TokenBoxVariant) {
  return (
    <div className="flex flex-row justify-between">
      <AmountInUSD type={type} />
      <Balance type={type} />
    </div>
  );
}

function AmountInUSD({ type }: TokenBoxVariant) {
  const { fromChain, fromToken, toChain, toToken, fromAmount, toAmount } =
    useCentralStore();
  const [amountInUSD, setAmountInUSD] = useState(0);
  const [slippage, setSlippage] = useState(0);
  const debounceAmount = useDebounce(
    type === "from" ? fromAmount : toAmount,
    1000
  );
  const [loading, setLoading] = useState(false);
  const token = type === "from" ? fromToken : toToken;
  const amount = type === "from" ? fromAmount : toAmount;
  const chain = type === "from" ? fromChain : toChain;
  useEffect(() => {
    const fetchAmountInUSD = async () => {
      setLoading(true);

      if (Number(amount) > 0 && token && chain) {
        const perToken = await getPrice(token.id);
        setAmountInUSD(Number(amount) * perToken);
      }
      setLoading(false);
    };

    fetchAmountInUSD();
  }, [debounceAmount, type, token, chain]);

  return (
    <>
      {loading ? (
        <AmountLoadingSkeleton />
      ) : (
        <p className="text-muted-foreground font-medium text-sm">
          ${amountInUSD.toFixed(2)}{" "}
          {type === "to" && <span className="text-primary">({slippage}%)</span>}
        </p>
      )}
    </>
  );
}

function Balance({ type }: TokenBoxVariant) {
  const [balance, setBalance] = useState(0);
  const { fromToken, toToken, toChain, fromChain } = useCentralStore();
  const [Bitaccount, setAccount] = useState();
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const sdk = useContext(ChainflipContext);
  const [loading, setLoading] = useState(false);
  const token = type === "from" ? fromToken : toToken;
  const typeChain = type === "from" ? fromChain : toChain;

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account || !chain) return;

      setLoading(true);
      if (token && typeChain) {
        const twChain = ThirdWebChainsMap.find(
          (chain) => chain.id === typeChain && chain.isTestnet === sdk.testnet
        )?.twChain;

        if (twChain) {
          if (chain !== twChain) switchChain(twChain);

          const balanceData = await getWalletBalance({
            address: account.address,
            chain: twChain,
            client,
            tokenAddress: token.data.contractAddress,
          });
          setBalance(Number(balanceData.displayValue));
        }

        if (typeChain === Chains.Bitcoin) {
          if (window.xfi && window.xfi.bitcoin) {
            console.log(window.xfi.bitcoin);
            window.xfi.bitcoin.changeNetwork(
              sdk.testnet ? "testnet" : "mainnet"
            );
            const bitcoinAccounts = await window.xfi.bitcoin.requestAccounts();
            console.log(bitcoinAccounts);
            const balance = await getBitcoinBalance(
              bitcoinAccounts[0],
              sdk.testnet
            );
            const balanceInBTC = balance / 1e8;
            console.log(balanceInBTC);
            setBalance(balanceInBTC);
          }
        }
      }
      setLoading(false);
    };

    fetchBalance();
  }, [token, typeChain, account, chain]);

  return (
    <>
      {loading ? (
        <BalanceLoadingSkeleton />
      ) : (
        <p className="text-sm text-muted-foreground">
          Balance:{" "}
          <span className="text-foreground font-bold">
            {balance.toFixed(5)}{" "}
            {type === "from" ? fromToken?.id : toToken?.id || "--"}
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
