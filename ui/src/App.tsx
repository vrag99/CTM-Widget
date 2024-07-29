import { ThemeProvider } from "@/components/theme-provider";
import SwapCard from "@/components/swap-card";
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
        <div className="flex flex-col w-full h-full items-center justify-center bg-card/40">
          <SwapCard />
        </div>
      </main>
    </ThemeProvider>
    </ChainflipProvider>
  );
}

export default App;
