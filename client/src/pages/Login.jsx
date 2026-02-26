import { useContext, useState } from "react";
import { api } from "../api";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", ok: true });

  async function submit(e) {
    e.preventDefault();
    setMsg({ text: "", ok: true });

    try {
      const url = mode === "signup" ? "/auth/signup" : "/auth/login";
      const payload =
        mode === "signup"
          ? form
          : { email: form.email, password: form.password };

      const res = await api.post(url, payload);
      login(res.data.token, res.data.user);
    } catch (e) {
      setMsg({ text: e.response?.data?.message || "Something went wrong", ok: false });
    }
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="brand">
          <div className="logo" />
          <div>
            <h1>MediVault</h1>
            <p>Secure healthcare management • MERN</p>
          </div>
        </div>
        <span className="badge">Vite + React</span>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 className="cardTitle">{mode === "login" ? "Welcome back" : "Create patient account"}</h3>
          <p className="sub">
            {mode === "login"
              ? "Login to manage appointments and reports."
              : "Sign up as a patient to book appointments and upload reports."}
          </p>

          <form onSubmit={submit} className="row">
            {mode === "signup" && (
              <div>
                <div className="label">Full name</div>
                <input
                  className="input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            )}

            <div>
              <div className="label">Email</div>
              <input
                className="input"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <div className="label">Password</div>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button className="btn btnPrimary">
              {mode === "login" ? "Login" : "Create account"}
            </button>

            <button
              type="button"
              className="btn btnGhost"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              Switch to {mode === "login" ? "Sign up" : "Login"}
            </button>

            {msg.text && (
              <div className={msg.ok ? "msgGood" : "msgBad"}>{msg.text}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}