import { ThemeProvider } from "@/components/theme-provider";
import SwapCard from "@/components/swap-card";
import RouteCard from "@/components/route-card";
import bg from "@/assets/bg.png";
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
          <div className="w-full h-full flex flex-row gap-4 justify-center items-center just bg-card/40">
            <SwapCard />

          </div>
        </main>
      </ThemeProvider>
    </ChainflipProvider>
  );
}

export default App;
