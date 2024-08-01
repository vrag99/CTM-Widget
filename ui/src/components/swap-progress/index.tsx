import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Check, AlertTriangle } from "lucide-react";

interface ProgressState {
  name: string;
  state: string;
  status: "pending" | "loading" | "completed" | "failed";
}

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
    status: "failed",
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

export default function SwapProgress(props: SwapProgressProps) {
  const totalStates = PROGRESS_STATES.length;
  const [currentStep, setCurrentStep] = useState(0);
  const currentProgress = Math.floor((currentStep / totalStates) * 100);

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
  }

  const errorStep = () => {
    if (currentStep < totalStates - 1) {
      PROGRESS_STATES[currentStep].status = "failed";
    }
  }

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
