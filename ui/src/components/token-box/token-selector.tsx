import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChainflipContext } from "@/context/chainflip";
import { useCentralStore } from "@/hooks/central-store";
import { TOKEN_ICONS } from "@/lib/token-icon";
import { type Token } from "@/lib/types";
import { type TokenBoxVariant } from "@/lib/types";
import { Chain } from "@chainflip/sdk/swap";
import { useContext, useEffect, useState } from "react";

export default function TokenSelector({ type }: TokenBoxVariant) {
  const { fromChain, toChain, setFromToken, setToToken } = useCentralStore();
  const [tokens, setTokens] = useState<Token[]>([]);
  const {sdk} = useContext(ChainflipContext);

  async function fetchTokens() {
    if (type === "from" && fromChain) {
      const tokens = await sdk.getAwailableAssets(fromChain as Chain);
      const tokenInfo: Token[] = tokens.map((token) => ({
        id: token.asset,
        icon: TOKEN_ICONS.find((tokenIcon) => tokenIcon.name === token.asset)?.icon,
        data: token
      }));
      setTokens(tokenInfo);

    } else if (type === "to" && toChain) {
      const tokens = await sdk.getAwailableAssets(toChain as Chain);
      const tokenInfo: Token[] = tokens.map((token) => ({
        id: token.asset,
        icon: TOKEN_ICONS.find((tokenIcon) => tokenIcon.name === token.asset)?.icon,
        data: token
      }));
      setTokens(tokenInfo);
    }
  }

  useEffect(() => {
    fetchTokens()
  }, [fromChain,toChain]);

  return (
    <Select
      onValueChange={(token) => {
        if (type === "from") {
          const foundToken: Token | undefined = tokens.find((t) => t.id === token);
          setFromToken(foundToken ? foundToken : null);
        } else if (type === "to") {
          const foundToken: Token | undefined = tokens.find((t) => t.id === token);
          setToToken(foundToken ? foundToken : null);
        }
      }}
    >
      <SelectTrigger className="w-[50%]">
        <SelectValue placeholder="Select Token" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tokens</SelectLabel>
          {tokens.map((token) => (
            <SelectItem
              key={token.id}
              value={token.data.asset}
              onClick={() => setFromToken(token)}
            >
              <div className="flex flex-row gap-2 items-center">
                {token.icon === undefined ? "" : (
                  <img src={token.icon} className="w-5 h-5 rounded-full" />
                )}
                {token.data.asset}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
