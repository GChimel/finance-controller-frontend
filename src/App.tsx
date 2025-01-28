import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/authContext";
import { Router } from "./router";

const queryClienty = new QueryClient();
export function App() {
  return (
    <QueryClientProvider client={queryClienty}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
