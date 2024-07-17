import { create } from "zustand";

interface CentralStoreState {
  fromChain: string;
  fromToken: string;
  toChain: string;
  toToken: string;

  setFromChain: (fromChain: string) => void;
  setFromToken: (fromToken: string) => void;
  setToChain: (toChain: string) => void;
  setToToken: (toToken: string) => void;
}

export const useCentralStore = create<CentralStoreState>((set) => ({
  fromChain: "",
  fromToken: "",
  toChain: "",
  toToken: "",

  setFromChain: (fromChain) => set({ fromChain }),
  setFromToken: (fromToken) => set({ fromToken }),
  setToChain: (toChain) => set({ toChain }),
  setToToken: (toToken) => set({ toToken }),
}));
