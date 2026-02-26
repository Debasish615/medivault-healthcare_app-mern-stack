import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Admin from "./Admin";
import Patient from "./Patient";
import Doctor from "./Doctor";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="topbar">
        <div className="brand">
          <div className="logo" />
          <div>
            <h1>Dashboard</h1>
            <p>{user.name} • {user.email}</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="badge">{user.role.toUpperCase()}</span>
          <button className="btn" style={{ width: "auto", padding: "10px 12px" }} onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {user.role === "admin" && <Admin />}
      {user.role === "patient" && <Patient />}
      {user.role === "doctor" && <Doctor />}
    </div>
  );
}