import { Button } from "@/components/ui/button";
import { Calendar, Plus, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { Page } from "../App";
import type { Patient, Session } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface DashboardProps {
  setPage: (page: Page) => void;
}

export default function Dashboard({ setPage }: DashboardProps) {
  const { actor, isFetching } = useActor();
  const [totalPatients, setTotalPatients] = useState<bigint>(0n);
  const [totalSessions, setTotalSessions] = useState<bigint>(0n);
  const [todaySessions, setTodaySessions] = useState<Session[]>([]);
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    const today = new Date().toISOString().split("T")[0];
    setLoading(true);
    Promise.all([
      actor.getTotalPatients(),
      actor.getTotalSessions(),
      actor.getTodaysSessions(today),
      actor.listSessions(),
      actor.listPatients(),
    ])
      .then(([tp, ts, td, sessions, patients]) => {
        setTotalPatients(tp);
        setTotalSessions(ts);
        setTodaySessions(td);
        setRecentSessions(sessions.slice(-3).reverse());
        setRecentPatients(patients.slice(-3).reverse());
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clinical Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Quantum Bio-Photonic Wellness Platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage("patients")}
            data-ocid="dashboard.patients.button"
            className="border-border text-gray-300 hover:text-white hover:bg-white/5"
          >
            <Users size={15} className="mr-1.5" /> Patients
          </Button>
          <Button
            size="sm"
            onClick={() => setPage("newSession")}
            data-ocid="dashboard.new_session.primary_button"
            style={{ backgroundColor: "#C8862A", color: "#fff" }}
            className="hover:opacity-90"
          >
            <Plus size={15} className="mr-1.5" /> New Session
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        data-ocid="dashboard.stats.panel"
      >
        <StatCard
          label="TOTAL PATIENTS"
          value={loading ? "…" : totalPatients.toString()}
          gold
          icon={<Users size={18} style={{ color: "#C8862A" }} />}
        />
        <StatCard
          label="TOTAL SESSIONS"
          value={loading ? "…" : totalSessions.toString()}
          gold
          icon={<Calendar size={18} style={{ color: "#C8862A" }} />}
        />
        <StatCard
          label="ACTIVE TODAY"
          value={loading ? "…" : todaySessions.length.toString()}
          icon={<Zap size={18} className="text-white" />}
        />
      </div>

      {/* Recent rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Sessions */}
        <div
          className="rounded-xl border border-border p-5"
          style={{ backgroundColor: "#1A1A1A" }}
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
            Recent Sessions
          </h2>
          {loading ? (
            <div
              className="text-gray-500 text-sm"
              data-ocid="dashboard.sessions.loading_state"
            >
              Loading…
            </div>
          ) : recentSessions.length === 0 ? (
            <div
              className="text-gray-500 text-sm"
              data-ocid="dashboard.sessions.empty_state"
            >
              No sessions yet. Start by adding a patient.
            </div>
          ) : (
            <ul className="space-y-3">
              {recentSessions.map((s, i) => (
                <li
                  key={s.id.toString()}
                  data-ocid={`dashboard.sessions.item.${i + 1}`}
                  className="flex justify-between items-center py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-white">
                    Session #{s.id.toString()}
                  </span>
                  <span className="text-xs text-gray-400">{s.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Patients */}
        <div
          className="rounded-xl border border-border p-5"
          style={{ backgroundColor: "#1A1A1A" }}
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
            Recent Patients
          </h2>
          {loading ? (
            <div
              className="text-gray-500 text-sm"
              data-ocid="dashboard.patients.loading_state"
            >
              Loading…
            </div>
          ) : recentPatients.length === 0 ? (
            <div
              className="space-y-3"
              data-ocid="dashboard.patients.empty_state"
            >
              <p className="text-gray-500 text-sm">
                No patients registered yet.
              </p>
              <Button
                size="sm"
                onClick={() => setPage("patients")}
                data-ocid="dashboard.add_patient.primary_button"
                style={{ backgroundColor: "#C8862A", color: "#fff" }}
                className="hover:opacity-90"
              >
                Add First Patient
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {recentPatients.map((p, i) => (
                <li
                  key={p.id.toString()}
                  data-ocid={`dashboard.patients.item.${i + 1}`}
                  className="flex justify-between items-center py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-white">{p.name}</span>
                  <span className="text-xs text-gray-400">
                    {p.age.toString()} yrs
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Info card */}
      <div
        className="rounded-xl border border-border p-5 flex gap-4"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <Calendar
          size={32}
          style={{ color: "#C8862A", flexShrink: 0, marginTop: 2 }}
        />
        <div>
          <h3 className="font-semibold text-white mb-1">
            Russian Quantum Bio-Photonic Protocol
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Integrated platform combining PMA pulse analysis, Bio-Reasonanz
            Laser Pulse Scanning, Space Medicine thermal IR imaging, Five
            Elements TCM, and Vedic bio-photonic protocols for comprehensive
            constitutional assessment.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  gold,
  icon,
}: {
  label: string;
  value: string;
  gold?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl border border-border p-5"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </span>
        {icon}
      </div>
      <div
        className="text-3xl font-bold"
        style={gold ? { color: "#C8862A" } : { color: "#fff" }}
      >
        {value}
      </div>
    </div>
  );
}
