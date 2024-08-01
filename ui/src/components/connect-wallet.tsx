import { Button } from "@/components/ui/button";
import { ChainflipContext } from "@/context/chainflip";
import { useCentralStore } from "@/hooks/central-store";
import { Chains } from "@chainflip/sdk/swap";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { useContext, useMemo } from "react";
import { createThirdwebClient } from "thirdweb";
import {
  useActiveAccount,
  useActiveWallet,
  useConnectModal,
  useDisconnect,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { wallets } from "@/components/swap-user-data/from-address";



export default function ConnectWallet() {
  const activeWallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const { connect } = useConnectModal();
  const activeAccount = useActiveAccount();
  const { fromChain, setActiveAddress, setSwapEnabled, setWalletConnected } = useCentralStore();
  const { sdk, thirdwebSecretKey } = useContext(ChainflipContext);
  if (!thirdwebSecretKey) return null;
  const client = useMemo(() => createThirdwebClient({
    clientId: thirdwebSecretKey,
  }), [thirdwebSecretKey]);


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
          setWalletConnected(true)
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
          setWalletConnected(true)
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
    } else {
      const wallet = await connect({ client, wallets });
      const account = wallet.getAccount();
      if (account !== undefined) {
        setActiveAddress(account.address);
      }
      setWalletConnected(true);
      setSwapEnabled(true)
    }
  }
  return (
    <Button
      className="w-full text-base"
      size={"lg"}
      onClick={connectToWallet}
    >
      Connect Wallet
    </Button>
  );
}
