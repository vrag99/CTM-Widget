import { Button } from "@/components/ui/button";
import { createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import {
  useConnectModal,
  useActiveAccount,
  useWalletDetailsModal,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { useCentralStore } from "@/hooks/central-store";
import { useContext, useEffect, useState } from "react";
import { Chains } from "@chainflip/sdk/swap";
import { ChainflipContext } from "@/context/chainflip";
const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("io.xdefi"),
  createWallet("app.subwallet")
];

declare global {
  interface Window {
    xdefi: any;
  }
}

export default function FromAddress() {
  const { connect, isConnecting } = useConnectModal();
  const activeAccount = useActiveAccount();
  const activeWallet = useActiveWallet();
  const { fromChain, setSwapEnabled, activeAddress, setWalletConnected } = useCentralStore();
  const [activeAddr, setActiveAddr] = useState<string>(activeAccount?.address ? activeAccount.address : "");
  const [truncate, setTruncate] = useState<string>("");
  const disconnet = useDisconnect()
  const sdk = useContext(ChainflipContext);
  async function handleConnect() {
    try {
      const wallet = await connect({ client, wallets });
      if (wallet) {
        setWalletConnected(true);
      }
    } catch (error) {
      setWalletConnected(false);
    }
  }
  async function call() {
    if (fromChain !== "" && activeWallet !== undefined) {
      if (fromChain === Chains.Bitcoin) {
        if (activeWallet.id !== "io.xdefi") {
          disconnet.disconnect(activeWallet);
          const wallets = [createWallet("io.xdefi")];
          await connect({ client, wallets });
        }
        if (window.xfi && window.xfi.bitcoin) {
          window.xfi.bitcoin.changeNetwork(
            sdk.testnet ? "testnet" : "mainnet"
          );
          const bitcoinAccounts = await window.xfi.bitcoin.requestAccounts();
          if (bitcoinAccounts[0]) setActiveAddr(bitcoinAccounts[0]);
        }
      } else if (fromChain === Chains.Ethereum || fromChain === Chains.Arbitrum) {
        setActiveAddr(activeAccount?.address ? activeAccount.address : "");
      } else if (fromChain === Chains.Polkadot) {

        if (activeWallet.id !== "app.subwallet") {
          disconnet.disconnect(activeWallet);
          const wallets = [createWallet("app.subwallet")];
          await connect({ client, wallets });
        }
        const extensions = await web3Enable("My dapp");

        if (extensions.length > 0) {
          setSwapEnabled(false)
        }

        const allAccounts = await web3Accounts();
        if (allAccounts.length > 0) {
          setActiveAddr(allAccounts[0].address);
        }
      }
    }
  }

  useEffect(() => {
    if (activeAddr) {
      const truncatedAddress = `${activeAddress.slice(
        0,
        6
      )}...${activeAddr?.slice(-4)}`;

      setTruncate(truncatedAddress);
    }

  }, [activeAddress])


  const detailsModal = useWalletDetailsModal();
  function handleOpenModal() {
    detailsModal.open({ client });
  }
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg">From</p>
        {activeAccount ? (
          <>{activeAddr !== "" ?
            <Button
              className="w-32 rounded-full border border-accent bg-gradient-to-tr from-secondary via-muted to-accent shadow-lg text-foreground"
              variant={"linkHover2"}
              size={"sm"}
              onClick={handleOpenModal}
            >
              {truncate}
            </Button> : <></>
          }
          </>
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

// interface propsActiveAccount {
//   address?: string;
// }

// function ActiveAccountModal(props: propsActiveAccount) {
//   const activeAccount = props.address ? props.address : (useActiveAccount()?.address);
//   const [activeAccountAddress, setActiveAccountAddress] = useState<string>(
//     ""
//   );

//   useEffect(() => {
//     if (activeAccount) {
//       const truncatedAddress = `${activeAccount.slice(
//         0,
//         6
//       )}...${activeAccount?.slice(-4)}`;

//       setActiveAccountAddress(truncatedAddress);
//     }
//   }, []);

//   const detailsModal = useWalletDetailsModal();
//   function handleOpenModal() {
//     detailsModal.open({ client });
//   }
//   return (
//     <>{activeAccountAddress !== "" ?
//       <Button
//         className="w-32 rounded-full border border-accent bg-gradient-to-tr from-secondary via-muted to-accent shadow-lg text-foreground"
//         variant={"linkHover2"}
//         size={"sm"}
//         onClick={handleOpenModal}
//       >
//         {activeAccountAddress}
//       </Button> : <></>
//     }
//     </>
//   );
// }
