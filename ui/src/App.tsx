import { ThemeProvider } from "./components/theme-provider";
import SwapCard from "./components/swap-card";
import DotPattern from "./components/ui/dot-pattern";
import { cn } from "./lib/utils";
import bg from "./assets/bg.svg";
import { ChainflipProvider } from "@/provider/chainflip";

function App() {
  return (
    <ChainflipProvider useTestnet={true}>
    <ThemeProvider defaultTheme="dark">
      <main
        className="w-full h-screen"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col w-full h-full items-center justify-center bg-card/40">
          <SwapCard />
          {/* <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,purple,transparent,transparent)] ",
            "-z-10"
          )}
        /> */}
        </div>
      </main>
    </ThemeProvider>
    </ChainflipProvider>
  );
}

export default App;
