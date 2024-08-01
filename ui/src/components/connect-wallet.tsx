import { Button } from "@/components/ui/button";
import { ChainflipContext } from "@/context/chainflip";
import { useCentralStore } from "@/hooks/central-store";
import { Chains } from "@chainflip/sdk/swap";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { ArrowUpDown } from "lucide-react";
import { useContext } from "react";
import { createThirdwebClient } from "thirdweb";
import {
  useActiveAccount,
  useActiveWallet,
  useConnectModal,
  useDisconnect,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

export default function ConnectWallet() {
  const activeWallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const { connect } = useConnectModal();
  const activeAccount = useActiveAccount();
  const { fromChain, setActiveAddress, setSwapEnabled } = useCentralStore();
  const sdk = useContext(ChainflipContext);

  async function connectToWallet() {
    if (fromChain !== "" && activeWallet !== undefined) {
      if (fromChain === Chains.Bitcoin) {
        if (activeWallet.id !== "io.xdefi") {
          disconnect(activeWallet);
          const wallets = [createWallet("io.xdefi")];
          await connect({ client, wallets });
        }
        if (window.xfi && window.xfi.bitcoin) {
          window.xfi.bitcoin.changeNetwork(sdk.testnet ? "testnet" : "mainnet");
          const bitcoinAccounts = await window.xfi.bitcoin.requestAccounts();
          if (bitcoinAccounts[0]) setActiveAddress(bitcoinAccounts[0]);
        }
      } else if (
        fromChain === Chains.Ethereum ||
        fromChain === Chains.Arbitrum
      ) {
        setActiveAddress(activeAccount?.address ? activeAccount.address : "");
      } else if (fromChain === Chains.Polkadot) {
        if (activeWallet.id !== "app.subwallet") {
          disconnect(activeWallet);
          const wallets = [createWallet("app.subwallet")];
          await connect({ client, wallets });
        }
        const extensions = await web3Enable("My dapp");

        if (extensions.length > 0) {
          setSwapEnabled(false);
        }

        const allAccounts = await web3Accounts();
        if (allAccounts.length > 0) {
          setActiveAddress(allAccounts[0].address);
        }
      }
    }
  }
  return (
    <Button
      className="w-full text-base"
      size={"lg"}
      variant={"expandIcon"}
      iconPlacement="right"
      Icon={ArrowUpDown}
      onClick={connectToWallet}
    >
      Connect Wallet
    </Button>
  );
}
