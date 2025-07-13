import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Overview from "./Pages/Overview";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Overview />
    </QueryClientProvider>
  );
}

export default App;
