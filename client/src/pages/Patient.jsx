import { useEffect, useState } from "react";
import { api } from "../api";

export default function Patient() {
  const [doctors, setDoctors] = useState([]);
  const [appts, setAppts] = useState([]);
  const [reports, setReports] = useState([]);
  const [apptForm, setApptForm] = useState({ doctorId: "", datetime: "", reason: "" });
  const [reportName, setReportName] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState({ text: "", ok: true });

  async function loadAll() {
    setDoctors((await api.get("/admin/doctors")).data);
    setAppts((await api.get("/appointments/my")).data);
    setReports((await api.get("/reports/my")).data);
  }

  async function book() {
    setMsg({ text: "", ok: true });
    try {
      await api.post("/appointments", apptForm);
      setApptForm({ doctorId: "", datetime: "", reason: "" });
      setMsg({ text: "Appointment booked ✅", ok: true });
      setAppts((await api.get("/appointments/my")).data);
    } catch (e) {
      setMsg({ text: e.response?.data?.message || "Booking failed", ok: false });
    }
  }

  async function upload() {
    setMsg({ text: "", ok: true });
    try {
      if (!file || !reportName) throw new Error("Select file + report name");
      const fd = new FormData();
      fd.append("reportName", reportName);
      fd.append("file", file);
      await api.post("/reports", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setReportName("");
      setFile(null);
      setMsg({ text: "Report uploaded ✅", ok: true });
      setReports((await api.get("/reports/my")).data);
    } catch (e) {
      setMsg({ text: e.response?.data?.message || e.message, ok: false });
    }
  }

  useEffect(() => { loadAll(); }, []);

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3 className="cardTitle">Book appointment</h3>
        <p className="sub">Choose a doctor, pick a time, and add a short reason.</p>

        <div className="row">
          <div>
            <div className="label">Doctor</div>
            <select
              className="select"
              value={apptForm.doctorId}
              onChange={(e) => setApptForm({ ...apptForm, doctorId: e.target.value })}
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name} ({d.specialization || "General"})
                </option>
              ))}
            </select>
          </div>

          <div className="row row-2">
            <div>
              <div className="label">Date & time</div>
              <input
                className="input"
                type="datetime-local"
                value={apptForm.datetime}
                onChange={(e) => setApptForm({ ...apptForm, datetime: e.target.value })}
              />
            </div>
            <div>
              <div className="label">Reason</div>
              <input
                className="input"
                placeholder="Fever / follow-up / checkup..."
                value={apptForm.reason}
                onChange={(e) => setApptForm({ ...apptForm, reason: e.target.value })}
              />
            </div>
          </div>

          <button className="btn btnPrimary" onClick={book}>Confirm booking</button>
        </div>

        <div style={{ height: 12 }} />

        <h3 className="cardTitle">Upload report</h3>
        <p className="sub">Upload PDF or image reports securely.</p>

        <div className="row row-2">
          <div>
            <div className="label">Report name</div>
            <input className="input" value={reportName} onChange={(e) => setReportName(e.target.value)} placeholder="Blood test / X-ray..." />
          </div>
          <div>
            <div className="label">File</div>
            <input className="input" type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>
        </div>

        <button className="btn" onClick={upload}>Upload</button>

        {msg.text && <div className={msg.ok ? "msgGood" : "msgBad"}>{msg.text}</div>}
      </div>

      <div className="grid" style={{ gap: 14 }}>
        <div className="card">
          <div className="itemTop">
            <div>
              <h3 className="cardTitle" style={{ marginBottom: 2 }}>My appointments</h3>
              <p className="sub" style={{ margin: 0 }}>Latest bookings appear first.</p>
            </div>
            <button className="btn" style={{ width: "auto", padding: "10px 12px" }} onClick={async ()=>setAppts((await api.get("/appointments/my")).data)}>
              Refresh
            </button>
          </div>

          <div style={{ height: 12 }} />
          <ul className="list">
            {appts.map((a) => (
              <li className="item" key={a._id}>
                <div className="itemTop">
                  <div className="itemTitle">{new Date(a.datetime).toLocaleString()}</div>
                  <span className="pill">{a.status}</span>
                </div>
                <div className="itemMeta">Doctor: {a.doctorId?.name} • {a.doctorId?.specialization || "General"}</div>
                {a.reason && <div className="itemMeta">Reason: {a.reason}</div>}
              </li>
            ))}
            {appts.length === 0 && <div className="sub">No appointments yet.</div>}
          </ul>
        </div>

        <div className="card">
          <div className="itemTop">
            <div>
              <h3 className="cardTitle" style={{ marginBottom: 2 }}>My reports</h3>
              <p className="sub" style={{ margin: 0 }}>Open reports directly from the dashboard.</p>
            </div>
            <button className="btn" style={{ width: "auto", padding: "10px 12px" }} onClick={async ()=>setReports((await api.get("/reports/my")).data)}>
              Refresh
            </button>
          </div>

          <div style={{ height: 12 }} />
          <ul className="list">
            {reports.map((r) => (
              <li className="item" key={r._id}>
                <div className="itemTop">
                  <div className="itemTitle">{r.reportName}</div>
                  <span className="pill">{(r.fileType || "").includes("pdf") ? "PDF" : "FILE"}</span>
                </div>
                <div className="itemMeta">
                  <a href={`http://localhost:5000${r.fileUrl}`} target="_blank" rel="noreferrer">View report</a>
                </div>
              </li>
            ))}
            {reports.length === 0 && <div className="sub">No reports uploaded yet.</div>}
          </ul>
        </div>
      </div>
    </div>
  );
}