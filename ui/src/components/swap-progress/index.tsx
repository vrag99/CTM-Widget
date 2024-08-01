import { useContext, useEffect, useState } from "react";
import { Check, AlertTriangle } from "lucide-react";
import { useCentralStore } from "@/hooks/central-store";
import { ethers, Signer } from "ethers";
interface ProgressState {
  name: string;
  state: string;
  status: "pending" | "loading" | "completed" | "failed";
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
const PROGRESS_STATES: ProgressState[] = [
  {
    name: "Waiting for deposit",
    state: "AWAITING_DEPOSIT",
    status: "loading",
  },
  {
    name: "Deposit received",
    state: "DEPOSIT_RECEIVED",
    status: "pending",
  },
  {
    name: "Executing your Swap",
    state: "SWAP_EXECUTED",
    status: "pending",
  },
  {
    name: "Scheduling funds for the destination address",
    state: "EGRESS_SCHEDULED",
    status: "pending",
  },
  {
    name: "Requesting a broadcast to send you the funds",
    state: "BROADCAST_REQUESTED",
    status: "pending",
  },
  {
    name: "Broadcasting your transaction",
    state: "BROADCASTED",
    status: "pending",
  },
  {
    name: "Funds sent to your address",
    state: "COMPLETE",
    status: "pending",
  },
];

interface SwapProgressProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
import { client } from "@/components/swap-user-data/from-address";

import { ethers6Adapter } from "thirdweb/adapters/ethers6";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { Assets, Chains } from "@chainflip/sdk/swap";
import { ThorchainContext } from "@/context/thorchain";
import { ChainflipContext } from "@/context/chainflip";
type Status =
  | "DEPOSIT_RECEIVED"
  | "SWAP_EXECUTED"
  | "EGRESS_SCHEDULED"
  | "BROADCAST_REQUESTED"
  | "BROADCASTED"
  | "COMPLETE"
  | "AWAITING_DEPOSIT"
  | "BROADCAST_ABORTED"
  | "FAILED";

declare global {
  interface Window {
    xfi: any;
  }
}

export default function SwapProgress(props: SwapProgressProps) {
  const totalStates = PROGRESS_STATES.length;
  const [currentStep, setCurrentStep] = useState(0);
  const currentProgress = Math.floor((currentStep / totalStates) * 100);
  const { fromToken, fromChain, depositAddressResponse, activeAddress } =
    useCentralStore();
  const [signer, setSinger] = useState<Signer | null>(null);
  const [status, setStatus] = useState<Status>("AWAITING_DEPOSIT");
  const chain = useActiveWalletChain();
  const account = useActiveAccount();

  // Utility functions for navigating stepper
  const nextStep = () => {
    if (currentStep < totalStates - 1) {
      PROGRESS_STATES[currentStep].status = "completed";
      PROGRESS_STATES[currentStep + 1].status = "loading";
    } else if (currentStep === totalStates - 1) {
      PROGRESS_STATES[currentStep].status = "completed";
    }
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalStates));
  };

  const resetProgress = () => {
    setCurrentStep(0);
    PROGRESS_STATES.forEach((state) => {
      state.status = "pending";
    });
    PROGRESS_STATES[0].status = "loading";
  };

  const errorStep = () => {
    if (currentStep < totalStates - 1) {
      PROGRESS_STATES[currentStep].status = "failed";
    }
  };
  const sdk = useContext(ChainflipContext);
  function exponentialBackoff(
    initialInterval: number,
    exponent = 2,
    maxIterations = 1024,
    channelId: string
  ) {
    let interval = initialInterval;
    let iteration = 0;

    const intervalId = setInterval(async () => {
      // Exponentially increase the interval
      interval *= exponent;
      const currentStatus = await sdk.getStatus(channelId);
      console.log(currentStatus);
      setStatus(currentStatus);
      // Stop after reaching maxIterations (optional)
      if (iteration >= maxIterations) {
        clearInterval(intervalId);
        console.log(
          "Exponential backoff stopped after reaching max iterations."
        );
      }
    }, interval);

    // Optionally return intervalId if you need to clear the interval externally
    return intervalId;
  }

  const swap = async () => {
    console.log(swap);
    console.log(depositAddressResponse);
    if (fromToken === null || fromChain === null) return;
    if (depositAddressResponse) {
      resetProgress();
      exponentialBackoff(
        2000,
        2,
        10240,
        depositAddressResponse.depositChannelId
      );
      if (fromChain === Chains.Ethereum || fromChain === Chains.Arbitrum) {
        if (chain && account) {
          const signer: Signer = ethers6Adapter.signer.toEthers({
            client,
            chain,
            account,
          });
          if (fromToken.id === Assets.ETH) {
            try {
              const tx = await signer.sendTransaction({
                to: depositAddressResponse.depositAddress,
                value: depositAddressResponse.amount,
              });
              const reciepent = await tx.wait();
              const confirmations = await reciepent?.confirmations();
              if (reciepent === null) {
                errorStep();
              } else if (confirmations === 0) {
                errorStep();
              }
            } catch (error) {
              errorStep();
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (status === "AWAITING_DEPOSIT") {
      nextStep();
    } else if (status === "DEPOSIT_RECEIVED") {
      nextStep();
    } else if (status === "SWAP_EXECUTED") {
      nextStep();
    } else if (status === "EGRESS_SCHEDULED") {
      nextStep();
    } else if (status === "BROADCAST_REQUESTED") {
      nextStep();
    } else if (status === "BROADCASTED") {
      nextStep();
    } else if (status === "BROADCAST_ABORTED") {
      errorStep();
    } else if (status === "COMPLETE") {
      nextStep();
    } else if (status === "FAILED") {
      errorStep();
    }
  }, [status]);

  useEffect(() => {
    swap();
  }, [depositAddressResponse]);

  return (
    <Card
      className={`h-[22rem] absolute bg-card/90 backdrop-blur z-50 border-t transition-all duration-500 ease-in-out ${
        props.open && "-translate-y-[100%]"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Swap in Progress</CardTitle>
        <Button
          size={"iconSm"}
          variant={"ghost"}
          onClick={() => {
            props.setOpen(false);
          }}
        >
          <X size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Progress value={currentProgress} />
          <p className="text-xs font-medium text-accent-foreground">
            {currentProgress}%
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4 transition-all duration-500">
          {PROGRESS_STATES.map((state, index) => (
            <ProgressState key={index} {...state} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressState({ name, status = "pending" }: ProgressState) {
  const statusStyles = {
    pending: {
      container:
        "flex flex-row items-center brightness-[50%] text-accent-foreground gap-2",
      dot: "w-4 h-4 rounded-full bg-accent brightness-125",
      icon: null,
    },
    loading: {
      container: "flex flex-row items-center gap-2 animate-pulse",
      dot: "w-4 h-4 rounded-full bg-accent-foreground brightness-75",
      icon: null,
    },
    completed: {
      container: "flex flex-row text-primary items-center gap-2",
      dot: null,
      icon: <Check className="w-4 h-4" />,
    },
    failed: {
      container: "flex flex-row items-center text-destructive gap-2",
      dot: null,
      icon: <AlertTriangle className="w-4 h-4" />,
    },
  };

  const { container, dot, icon } = statusStyles[status];

  return (
    <div className={container}>
      {dot && <div className={dot} />}
      {icon}
      <p className="text-sm">{name}</p>
    </div>
  );
}
