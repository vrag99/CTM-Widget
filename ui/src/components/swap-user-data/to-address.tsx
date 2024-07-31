import { Button } from "@/components/ui/button";
import { CheckCircle, Check, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCentralStore } from "@/hooks/central-store";
import { AlertTriangle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { getExplorerLink  } from "@/lib/explorer";
import { ChainflipContext } from "@/context/chainflip";
import { ValidateAddress } from "@/lib/helper/validAddr";
import { Chain } from "@chainflip/sdk/swap";

export default function ToAddress() {
  const { toChain, toToken  } = useCentralStore();
  const isToTokenSelected = toChain && toToken !== null;


  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationError, ] = useState(false);
  const sdk = useContext(ChainflipContext);

  useEffect(() => {

    if (address !== "" && toChain !== "") {
      setIsLoading(true)
      setVerified(ValidateAddress(address, toChain, sdk.testnet));
      setIsLoading(false) 
    }

  }, [address, toChain])

  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <p className="text-lg">To</p>
        <Dialog>
          <DialogTrigger disabled={!isToTokenSelected}>
            {" "}
            <Button
              disabled={!isToTokenSelected}
              className="rounded-full w-32"
              size={"sm"}
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card/20 *:bg-card/20 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>
                Add a wallet address on <span>{toChain}</span> Chain
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-row gap-2">
              <Input
                placeholder="Enter Address"
                className="flex-1"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <Button
                disabled={isLoading}
                size={"icon"}
                onClick={() => setIsLoading(true)}
                className="transition-all duration-150"
              >
                {isLoading ? (
                  <>
                    <Spinner className="w-4 h-4" />
                  </>
                ) : verified ? (
                  <>
                    <Check className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            {verificationError ? (
              <Alert
                className="transition-all duration-150"
                variant={"destructive"}
              >
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  Invalid {toChain as Chain}  Address
                </AlertDescription>
              </Alert>
            ) : verified ? (
              <Alert
                className="transition-all duration-150"
                variant={"success"}
              >
                <CheckCircle className="w-4 h-4" />
                <AlertDescription className="text-sm">
                   The address is a valid {toChain} address <a href={getExplorerLink(toChain as Chain,address,sdk.testnet)}><u>here</u></a>
                </AlertDescription>
              </Alert>
            ): null}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
