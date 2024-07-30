import { Token } from "@/lib/types";
import { Nullable } from "@/lib/types/nullable";
interface args {
  fromAmount: string;
  fromChain: string;
  toChain: string;
  fromToken: Nullable<Token>;
  toToken: Nullable<Token>;
}

export const areSwapParametersValid = (args: args) => {
  const { fromAmount, fromChain, toChain, fromToken, toToken } = args;
  return (
    Number(fromAmount) > 0 &&
    fromToken !== null &&
    toToken !== null &&
    fromChain !== "" &&
    toChain !== ""
  );
};
