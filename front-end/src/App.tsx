import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <p>Hello Vite + React</p>
    </QueryClientProvider>
  );
}

export default App;
