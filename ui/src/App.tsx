import { ThemeProvider } from "./components/theme-provider";
import SwapCard from "./components/swap-card";
import DotPattern from "./components/ui/dot-pattern";
import { cn } from "./lib/utils";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <main className="flex flex-col items-center justify-center h-screen">
        <SwapCard />
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,purple,transparent,transparent)] "
          )}
        />
      </main>
    </ThemeProvider>
  );
}

export default App;
