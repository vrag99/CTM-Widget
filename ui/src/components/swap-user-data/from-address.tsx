import { Button } from "@/components/ui/button";
import {
  createWallet,
  walletConnect,
} from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  createWallet("com.trustwallet.app"),
  createWallet("io.zerion.wallet"),
  createWallet("me.rainbow"),
  createWallet("app.phantom"),
  createWallet("com.okex.wallet"),
  createWallet("com.binance"),
  createWallet("io.xdefi")
];
export default function FromAddress() {
  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <p className="text-lg">From</p>
        <ConnectButton
          wallets={wallets}
          client={client}
        />
      </div>
    </>
  );
}
