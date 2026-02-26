import { useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function Root() {
  const { user } = useContext(AuthContext);
  return user ? <Dashboard /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}