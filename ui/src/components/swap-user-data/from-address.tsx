import { Button } from "@/components/ui/button";
import { createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import {
  useConnectModal,
  useActiveAccount,
  useWalletDetailsModal,
} from "thirdweb/react";
import { useCentralStore } from "@/hooks/central-store";
import { useContext, useEffect, useState } from "react";


export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});
export const wallets = [
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
  const {  activeAddress, setActiveAddress, setWalletConnected } = useCentralStore();
  const [truncate, setTruncate] = useState<string>("");

  async function handleConnect() {
    try {
      const wallet = await connect({ client, wallets, });
      console.log(wallet)
      if (wallet) {
        setWalletConnected(true);
        const addr =wallet.getAccount();
        if(addr){
          setActiveAddress(addr.address)
        }
      }
    } catch (error) {
      console.log("here")
      console.log(error)
      setWalletConnected(false);
    }
  }


  useEffect(() => {
    if (activeAddress) {
      const truncatedAddress = `${activeAddress.slice(
        0,
        6
      )}...${activeAddress?.slice(-4)}`;

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
          <>{activeAddress !== "" ?
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
