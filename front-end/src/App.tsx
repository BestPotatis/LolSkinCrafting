import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Overview from "./Pages/Overview";
import { ToastContainer } from "react-toastify";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Overview />
      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
