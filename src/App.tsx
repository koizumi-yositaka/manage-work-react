import "./App.css";
import { AuthProvider, useAuth } from "./auth";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

function InnerApp() {
  const auth = useAuth();
  console.log(auth);
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      {import.meta.env.DEV && "これは開発環境です"}
      <InnerApp />
    </AuthProvider>
  );
}

export default App;
