import { ChainId, Token} from "@/lib/types";
import { create } from "zustand";
import { Nullable } from "@/lib/types/nullable";

interface CentralStoreState {
  fromChain: ChainId;
  fromToken: Nullable<Token>;
  fromAmount: string;
  toChain: ChainId;
  toToken: Nullable<Token>;
  toAmount: string;

  setFromChain: (fromChain: string) => void;
  setFromToken: (fromToken: Nullable<Token>) => void;
  setFromAmount: (fromAmount: string) => void;
  setToChain: (toChain: string) => void;
  setToToken: (toToken: Nullable<Token>) => void;
  setToAmount: (toAmount: string) => void;
}

export const useCentralStore = create<CentralStoreState>((set) => ({
  fromChain:"",
  fromToken: null,
  fromAmount: "",
  toChain:"",
  toToken: null,
  toAmount: "",

  setFromChain: (fromChain) => set({ fromChain }),
  setFromToken: (fromToken) => set({ fromToken }),
  setFromAmount: (fromAmount) => set({ fromAmount }),
  setToChain: (toChain) => set({ toChain }),
  setToToken: (toToken) => set({ toToken }),
  setToAmount: (toAmount) => set({ toAmount }),
}));
