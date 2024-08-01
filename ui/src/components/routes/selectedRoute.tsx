interface SelectedRouteProps {
    route: Route;
    openRouteCard: boolean;
    setOpenRouteCard: (openRouteCard: boolean) => void;
  }
  
  import Metadata from "@/components/routes/route/metadata";
  import { Skeleton } from "@/components/ui/skeleton";

import { Route } from "@/lib/types";
import { Button } from "../ui/button";
import { ChevronRight, MoveRight } from "lucide-react";
import { UI_TOKEN_ICONS } from "@/lib/ui-icon-mappings";
  
export function SelectedRoute(props: SelectedRouteProps) {
    const initialStep = props.route.path[0];
    const finalStep = props.route.path[props.route.path.length - 1];
    return (
      <div className="w-full transition-all duration-300 rounded-md border bg-accent py-2 px-3 space-y-1">
        <div className="flex flex-row justify-between items-center">
          <Metadata metadata={props.route.metadata} />
          <Button
            size={"sm"}
            variant={"linkHover2"}
            onClick={() => props.setOpenRouteCard(true)}
            className="text-sm font-semibold"
          >
            See Routes
          </Button>
        </div>
        <div className="w-full">
          <p className="text-sm inline-flex font-semibold items-center gap-1.5">
            {initialStep.amount} {initialStep.token.toUpperCase()}{" "}
            <MoveRight className="w-4 text-muted-foreground" /> {finalStep.amount.toFixed(2)}{" "}
            {finalStep.token.toUpperCase()}{" "}
            <span className="text-muted-foreground text-xs">
              (${finalStep.amountInUSD.toFixed(2)})
            </span>
          </p>
        </div>
        <div className="w-full flex flex-row items-center py-2 gap-2 rounded-md">
          {props.route.path.map((step, index) => (
            <>
              <div className="flex flex-row gap-1">
                <div key={index} className="flex flex-col items-center gap-1">
                  <div className="w-6 h-6">
                    <img
                      src={UI_TOKEN_ICONS[step.token.toLowerCase()]}
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs">{step.amount.toFixed(2)}</p>
                  <p className="text-[0.52rem] text-muted-foreground">
                    {step.token.toUpperCase()}
                  </p>
                </div>
              </div>
              {index !== props.route.path.length - 1 && (
                <ChevronRight className="text-muted-foreground" size={20} />
              )}
            </>
          ))}
        </div>
      </div>
    );
  }
  
  export function SelectedRouteLoadingSkeleton() {
    return <Skeleton className="h-28 w-full" />;
  }
  