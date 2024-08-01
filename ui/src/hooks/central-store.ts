import { ChainId, Route, Token} from "@/lib/types";
import { create } from "zustand";
import { Nullable } from "@/lib/types/nullable";
import {DepositAddressResponse, QuoteResponse} from "@chainflip/sdk/swap"
import { QouteThorChain } from "@/lib/types/qouteThorchain";
interface CentralStoreState {
  fromChain: ChainId;
  fromToken: Nullable<Token>;
  fromAmount: string;
  toChain: ChainId;
  toToken: Nullable<Token>;
  toAmount: string;
  swapEnabled:boolean;
  activeAddress:string;
  toAddress: string;
  toAmountUSD: number;
  fromAmountUSD: number;
  qoute: Nullable<QuoteResponse>;
  walletConnected: boolean;
  loading: boolean;
  routes: Route[];
  thorchainQoute: Nullable<QouteThorChain>;
  depositAddressResponse:Nullable<DepositAddressResponse>;
  destinationAddress: string;

  setFromChain: (fromChain: string) => void;
  setFromToken: (fromToken: Nullable<Token>) => void;
  setFromAmount: (fromAmount: string) => void;
  setToChain: (toChain: string) => void;
  setToToken: (toToken: Nullable<Token>) => void;
  setToAmount: (toAmount: string) => void;
  setSwapEnabled: (swapEnabled: boolean) => void;
  setActiveAddress: (activeAddress: string) => void;
  setToAddress: (toAddress: string) => void;
  setToAmountUSD: (toAmountUSD: number) => void;
  setFromAmountUSD: (fromAmountUSD: number) => void;
  setQoute: (qoute: Nullable<QuoteResponse>) => void;
  setWalletConnected: (walletConnected: boolean) => void;
  setLoading: (loading: boolean) => void;
  setRoutes: (routes: Route[]) => void;
  setThorchainQoute: (thorchainQoute: Nullable<QouteThorChain>) => void;
  setDepositAddressResponse: (depositAddressResponse:Nullable<DepositAddressResponse>) => void;
  setDestinationAddress: (destinationAddress: string) => void;
}

export const useCentralStore = create<CentralStoreState>((set) => ({
  fromChain:"",
  fromToken: null,
  fromAmount: "",
  toChain:"",
  toToken: null,
  toAmount: "",
  swapEnabled:false,
  activeAddress:"",
  toAddress: "",
  toAmountUSD: 0,
  fromAmountUSD: 0,
  qoute:null,
  walletConnected: false,
  loading: false,
  routes: [],
  isThorchain: false,
  thorchainQoute:null,
  depositAddressResponse:null,
  destinationAddress: "",

  setFromChain: (fromChain) => set({ fromChain }),
  setFromToken: (fromToken) => set({ fromToken }),
  setFromAmount: (fromAmount) => set({ fromAmount }),
  setToChain: (toChain) => set({ toChain }),
  setToToken: (toToken) => set({ toToken }),
  setToAmount: (toAmount) => set({ toAmount }),
  setSwapEnabled: (swapEnabled) => set({ swapEnabled }),
  setActiveAddress: (activeAddress) => set({ activeAddress }),
  setToAddress: (toAddress) => set({ toAddress }),
  setToAmountUSD: (toAmountUSD) => set({ toAmountUSD }),
  setFromAmountUSD: (fromAmountUSD) => set({ fromAmountUSD }),
  setQoute: (qoute) => set({ qoute }),
  setWalletConnected: (walletConnected) => set({ walletConnected }),
  setLoading: (loading) => set({ loading }),
  setRoutes: (routes) => set({ routes }),
  setThorchainQoute: (thorchainQoute) => set({ thorchainQoute }),
  setDepositAddressResponse: (depositAddressResponse) => set({ depositAddressResponse }),
  setDestinationAddress: (destinationAddress) => set({ destinationAddress }),

}));
