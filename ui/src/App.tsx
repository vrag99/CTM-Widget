import { ThemeProvider } from "./components/theme-provider";
import SwapCard from "./components/swap-card";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <main className="flex flex-col items-center justify-center h-screen">
        <SwapCard />
      </main>
    </ThemeProvider>
  );
}

export default App;
