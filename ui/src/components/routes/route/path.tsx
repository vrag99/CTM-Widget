import { Route } from "@/lib/types";
import { MoveRight, ChevronsRight } from "lucide-react";
import { UI_TOKEN_ICONS, UI_CHAIN_ICONS } from "@/lib/ui-icon-mappings";

export default function Path({ path }: { path: Route["path"] }) {
  const finalStep = path[path.length - 1];
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex gap-1 w-full pb-1 border-b">
        <div className="relative w-14 h-14">
          <img
            src={UI_TOKEN_ICONS[finalStep.token.toLowerCase()]}
            className="w-12 h-12"
          />
          <img
            src={UI_CHAIN_ICONS[finalStep.chain.toLowerCase()]}
            className="w-6 h-6 border absolute right-0 bottom-1 rounded-full"
          />
        </div>
        <div className="text-left">
          <p className=" font-bold">
            {finalStep.amount.toFixed(2)} {finalStep.token.toUpperCase()}
          </p>
          <p className="text-sm text-muted-foreground">
            ~ ${finalStep.amountInUSD.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-start top-1 gap-1">
        {path.map((step, index) => (
          <>
            <div className="flex flex-row gap-1">
              <div key={index} className="flex flex-col items-center gap-1">
                <div className="relative w-8 h-8">
                  <img
                    src={UI_TOKEN_ICONS[step.token.toLowerCase()]}
                    className="w-6 h-6"
                  />
                  <img
                    src={UI_CHAIN_ICONS[step.chain.toLowerCase()]}
                    className="w-4 h-4 border absolute right-0 bottom-1 rounded-full"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs">{step.amount.toFixed(2)}</p>
                <p className="text-[0.52rem] text-muted-foreground">{step.token.toUpperCase()}</p>

              </div>
            </div>
            {index !== path.length - 1 && (
              <ChevronsRight className="text-accent" size={20} />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
