import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <main className="flex flex-col items-center justify-center h-screen">
        <h1>Hello</h1>
      </main>
    </ThemeProvider>
  );
}

export default App;
