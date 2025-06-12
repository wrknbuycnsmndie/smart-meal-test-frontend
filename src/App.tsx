import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { HomePage } from "./pages/HomePage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;
