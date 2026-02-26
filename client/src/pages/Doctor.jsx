import { useEffect, useState } from "react";
import { api } from "../api";

export default function Doctor() {
  const [appts, setAppts] = useState([]);

  async function load() {
    const res = await api.get("/appointments/my");
    setAppts(res.data);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <div className="itemTop">
        <div>
          <h3 className="cardTitle" style={{ marginBottom: 2 }}>My appointments</h3>
          <p className="sub" style={{ margin: 0 }}>Patient list with appointment times.</p>
        </div>
        <button className="btn" style={{ width: "auto", padding: "10px 12px" }} onClick={load}>Refresh</button>
      </div>

      <div style={{ height: 12 }} />
      <ul className="list">
        {appts.map((a) => (
          <li className="item" key={a._id}>
            <div className="itemTop">
              <div className="itemTitle">{new Date(a.datetime).toLocaleString()}</div>
              <span className="pill">{a.status}</span>
            </div>
            <div className="itemMeta">Patient: {a.patientId?.name} • {a.patientId?.email}</div>
            {a.reason && <div className="itemMeta">Reason: {a.reason}</div>}
          </li>
        ))}
        {appts.length === 0 && <div className="sub">No appointments assigned yet.</div>}
      </ul>
    </div>
  );
}