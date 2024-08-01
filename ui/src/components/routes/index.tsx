import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/types";
import SwapRoute from "./route";
import { ChevronLeft } from "lucide-react";

import styles from "./route/route.module.css";

interface RouteCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  routes: Route[];
  selectedRouteIndex: number;
  setSelectedRouteIndex: (index: number) => void;
}

export default function RouteCard(props: RouteCardProps) {
  return (
    <Card
      className={`h-[36rem] absolute bg-card/90 backdrop-blur z-50 border-t transition-all duration-500 ease-in-out ${
        props.open && "-translate-y-[100%]"
      }`}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <Button
          size={"iconSm"}
          className="mt-2"
          variant={"secondary"}
          onClick={() => {
            props.setOpen(false);
          }}
        >
          <ChevronLeft />
        </Button>
        <CardTitle>Routes</CardTitle>
      </CardHeader>
      <CardContent
        className={`space-y-3 relative h-[80%] overflow-y-scroll transition-all duration-300 ease-in-out ${styles.sleek_scrollbar}`}
      >
        {props.routes.map((route, index) => (
          <SwapRoute
            key={index}
            index={index}
            setSelectedRouteIndex={props.setSelectedRouteIndex}
            selected={index === props.selectedRouteIndex}
            route={route}
          />
        ))}
      </CardContent>
    </Card>
  );
}
