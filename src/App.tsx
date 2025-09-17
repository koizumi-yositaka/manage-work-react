import "./App.css";
import { AuthProvider, useAuth } from "./auth";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/queryClient";
import { LoadingProvider } from "./contexts/LoadingContext";
import ConfirmDialog from "./components/common/ConfirmModal";

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoadingProvider>
          {/* {import.meta.env.DEV && "これは開発環境です"} */}
          <InnerApp />
        </LoadingProvider>
        <ConfirmDialog />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
