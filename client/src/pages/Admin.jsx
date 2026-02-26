import { useEffect, useState } from "react";
import { api } from "../api";

export default function Admin() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", specialization: "" });
  const [msg, setMsg] = useState({ text: "", ok: true });

  async function load() {
    const res = await api.get("/admin/doctors");
    setDoctors(res.data);
  }

  async function createDoctor() {
    setMsg({ text: "", ok: true });
    try {
      await api.post("/admin/create-doctor", form);
      setForm({ name: "", email: "", password: "", specialization: "" });
      setMsg({ text: "Doctor created ✅", ok: true });
      load();
    } catch (e) {
      setMsg({ text: e.response?.data?.message || "Failed", ok: false });
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3 className="cardTitle">Create doctor</h3>
        <p className="sub">Add doctors and manage specializations.</p>

        <div className="row row-2">
          <div>
            <div className="label">Doctor name</div>
            <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. Name" />
          </div>
          <div>
            <div className="label">Specialization</div>
            <input className="input" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} placeholder="Cardiology, Ortho..." />
          </div>
        </div>

        <div className="row row-2">
          <div>
            <div className="label">Email</div>
            <input className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="doctor@medivault.com" />
          </div>
          <div>
            <div className="label">Temp password</div>
            <input className="input" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Set password" />
          </div>
        </div>

        <button className="btn btnPrimary" onClick={createDoctor}>Create doctor</button>

        {msg.text && <div className={msg.ok ? "msgGood" : "msgBad"}>{msg.text}</div>}
      </div>

      <div className="card">
        <div className="itemTop">
          <div>
            <h3 className="cardTitle" style={{ marginBottom: 2 }}>Active doctors</h3>
            <p className="sub" style={{ margin: 0 }}>Auto-refresh after creation.</p>
          </div>
          <button className="btn" style={{ width: "auto", padding: "10px 12px" }} onClick={load}>Refresh</button>
        </div>

        <div style={{ height: 12 }} />
        <ul className="list">
          {doctors.map((d) => (
            <li className="item" key={d._id}>
              <div className="itemTop">
                <div className="itemTitle">{d.name}</div>
                <span className="pill">{d.specialization || "General"}</span>
              </div>
              <div className="itemMeta">{d.email}</div>
            </li>
          ))}
          {doctors.length === 0 && <div className="sub">No doctors yet. Create one to start.</div>}
        </ul>
      </div>
    </div>
  );
}