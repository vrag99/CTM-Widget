import { Button } from "@/components/ui/button";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import {
  useConnectModal,
  useActiveAccount,
  useWalletDetailsModal,
} from "thirdweb/react";

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
  createWallet("io.xdefi"),
];

export default function FromAddress() {
  const { connect, isConnecting } = useConnectModal();
  const activeAccount = useActiveAccount();
  console.log(activeAccount);

  async function handleConnect() {
    const wallet = await connect({ client, wallets });
    console.log(wallet);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg">From</p>
        {activeAccount ? (
          <ActiveAccountModal />
        ) : (
          <Button
            className="w-32 rounded-full"
            size={"sm"}
            onClick={handleConnect}
            disabled={isConnecting}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </>
  );
}

function ActiveAccountModal() {
  const activeAccount = useActiveAccount();
  const truncatedAddress = `${activeAccount?.address.slice(
    0,
    6
  )}...${activeAccount?.address.slice(-4)}`;

  const detailsModal = useWalletDetailsModal();
  function handleOpenModal() {
    detailsModal.open({ client });
  }
  return (
    <Button
      className="w-32 rounded-full border border-accent bg-gradient-to-tr from-secondary via-muted to-accent shadow-lg text-foreground"
      variant={"linkHover2"}
      size={"sm"}
      onClick={handleOpenModal}
    >
      {truncatedAddress}
    </Button>
  );
}
