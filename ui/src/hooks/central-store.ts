import { create } from "zustand";

interface CentralStoreState {
  fromChain: string;
  fromToken: string;
  fromAmount: string;
  toChain: string;
  toToken: string;
  toAmount: string;

  setFromChain: (fromChain: string) => void;
  setFromToken: (fromToken: string) => void;
  setFromAmount: (fromAmount: string) => void;
  setToChain: (toChain: string) => void;
  setToToken: (toToken: string) => void;
  setToAmount: (toAmount: string) => void;
}

export const useCentralStore = create<CentralStoreState>((set) => ({
  fromChain: "",
  fromToken: "",
  fromAmount: "",
  toChain: "",
  toToken: "",
  toAmount: "",

  setFromChain: (fromChain) => set({ fromChain }),
  setFromToken: (fromToken) => set({ fromToken }),
  setFromAmount: (fromAmount) => set({ fromAmount }),
  setToChain: (toChain) => set({ toChain }),
  setToToken: (toToken) => set({ toToken }),
  setToAmount: (toAmount) => set({ toAmount }),
}));
