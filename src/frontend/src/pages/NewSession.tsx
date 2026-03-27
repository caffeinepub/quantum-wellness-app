import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Page } from "../App";
import type { Patient } from "../backend.d";
import { useActor } from "../hooks/useActor";

const MODALITY_OPTIONS = [
  "Bio-Photonic, Bio-Reasonanz Russian PMA Scanner",
  "PMA Scan",
  "Bio-Reasonanz Laser",
  "Thermal IR Scan",
  "Acupuncture",
  "Massage Therapy",
  "Meditation",
  "Nutritional Counseling",
  "Other",
];

const MERIDIAN_ROWS = [
  { code: "GB", name: "Gallbladder", elementColor: "#22c55e" },
  { code: "LR", name: "Liver", elementColor: "#22c55e" },
  { code: "ST", name: "Stomach", elementColor: "#FFD700" },
  { code: "SP", name: "Spleen", elementColor: "#FFD700" },
  { code: "BL", name: "Bladder", elementColor: "#3b82f6" },
  { code: "KI", name: "Kidney", elementColor: "#3b82f6" },
  { code: "SI", name: "Small Intestine", elementColor: "#FF0000" },
  { code: "HT", name: "Heart", elementColor: "#FF0000" },
  { code: "LI", name: "Large Intestine", elementColor: "#d1d5db" },
  { code: "LU", name: "Lung", elementColor: "#d1d5db" },
  { code: "TE", name: "Triple Energizer", elementColor: "#FF1493" },
  { code: "PC", name: "Pericardium", elementColor: "#FF1493" },
];

type ReadingRow = {
  qi: string;
  pitta: string;
  kapha: string;
  vata: string;
  acidBase: string;
};

function makeDefaultReadings(): Record<string, ReadingRow> {
  const result: Record<string, ReadingRow> = {};
  for (const m of MERIDIAN_ROWS) {
    result[m.code] = {
      qi: "50",
      pitta: "50",
      kapha: "50",
      vata: "50",
      acidBase: "0",
    };
  }
  return result;
}

const READING_FIELDS: {
  field: keyof ReadingRow;
  color: string;
  label: string;
}[] = [
  { field: "qi", color: "#22d3ee", label: "Qi" },
  { field: "pitta", color: "#f97316", label: "Pitta" },
  { field: "kapha", color: "#14b8a6", label: "Kapha" },
  { field: "vata", color: "#a855f7", label: "Vata" },
  { field: "acidBase", color: "#C8862A", label: "Acid-Base" },
];

export default function NewSession({
  setPage,
}: { setPage: (page: Page) => void }) {
  const { actor, isFetching } = useActor();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [sessionDate, setSessionDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const [modalities, setModalities] = useState<string[]>([]);
  const [readings, setReadings] =
    useState<Record<string, ReadingRow>>(makeDefaultReadings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor.listPatients().then(setPatients).catch(console.error);
  }, [actor, isFetching]);

  function toggleModality(mod: string) {
    setModalities((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod],
    );
  }

  function updateReading(code: string, field: keyof ReadingRow, val: string) {
    setReadings((prev) => ({
      ...prev,
      [code]: { ...prev[code], [field]: val },
    }));
  }

  async function handleSubmit() {
    if (!actor) return;
    if (!selectedPatient) {
      toast.error("Please select a patient");
      return;
    }
    setSaving(true);
    try {
      const readingsArray = MERIDIAN_ROWS.map((m) => {
        const r = readings[m.code];
        return {
          meridian: `${m.code} \u2013 ${m.name}`,
          qi: BigInt(r.qi || 0),
          pitta: BigInt(r.pitta || 0),
          kapha: BigInt(r.kapha || 0),
          vata: BigInt(r.vata || 0),
          acidBase: BigInt(r.acidBase || 0),
        };
      });
      await actor.createSession(
        BigInt(selectedPatient),
        sessionDate,
        modalities,
        readingsArray,
      );
      toast.success("Session saved successfully");
      setPage("dashboard");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save session");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Session</h1>
        <p className="text-sm text-gray-400 mt-1">
          Log a clinical session with scan data and meridian readings
        </p>
      </div>

      {/* Section 1: Patient & Date */}
      <div
        className="rounded-xl border border-border p-5 space-y-4"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          Patient & Date
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-300 text-sm">Patient</Label>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger
                className="mt-1 bg-input border-border text-white"
                data-ocid="session.patient.select"
              >
                <SelectValue placeholder="Select patient…" />
              </SelectTrigger>
              <SelectContent
                style={{ backgroundColor: "#1A1A1A" }}
                className="border-border"
              >
                {patients.map((p) => (
                  <SelectItem
                    key={p.id.toString()}
                    value={p.id.toString()}
                    className="text-white"
                  >
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="session-date" className="text-gray-300 text-sm">
              Session Date
            </Label>
            <input
              id="session-date"
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-white"
              data-ocid="session.date.input"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Modalities */}
      <div
        className="rounded-xl border border-border p-5 space-y-4"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          Modalities Used
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MODALITY_OPTIONS.map((mod) => {
            const checkId = `modality-${mod.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <div key={mod} className="flex items-center gap-2">
                <Checkbox
                  id={checkId}
                  checked={modalities.includes(mod)}
                  onCheckedChange={() => toggleModality(mod)}
                  data-ocid="session.modality.checkbox"
                  className="border-border data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                />
                <label
                  htmlFor={checkId}
                  className="text-sm text-gray-300 cursor-pointer"
                >
                  {mod}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Meridian Readings */}
      <div
        className="rounded-xl border border-border p-5 space-y-4"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <div>
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Meridian Readings
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Enter values 0–100. Acid-Base range: –100 to +100
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="session.readings.table">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-3 text-gray-400 font-medium">
                  Meridian
                </th>
                {READING_FIELDS.map((f) => (
                  <th
                    key={f.field}
                    className="py-2 px-2 text-center"
                    style={{
                      color: f.color,
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      textShadow: `0 0 8px ${f.color}88`,
                    }}
                  >
                    {f.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MERIDIAN_ROWS.map((m, i) => {
                const r = readings[m.code];
                return (
                  <tr
                    key={m.code}
                    className="border-b border-border last:border-0"
                    data-ocid={`session.readings.row.${i + 1}`}
                  >
                    <td className="py-2 pr-3 whitespace-nowrap">
                      <span
                        className="font-mono text-xs mr-1 font-bold"
                        style={{ color: m.elementColor }}
                      >
                        {m.code}
                      </span>
                      <span style={{ color: m.elementColor }}>{m.name}</span>
                    </td>
                    {READING_FIELDS.map(({ field, color }) => (
                      <td
                        key={field}
                        className="py-1.5 px-2"
                        style={{ backgroundColor: `${color}14` }}
                      >
                        <input
                          type="number"
                          value={r[field]}
                          onChange={(e) =>
                            updateReading(m.code, field, e.target.value)
                          }
                          className="w-16 rounded border bg-input px-2 py-1 text-center text-sm font-semibold"
                          style={{ color, borderColor: color }}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleSubmit}
          disabled={saving}
          data-ocid="session.save.submit_button"
          className="hover:opacity-90"
          style={{ backgroundColor: "#C8862A", color: "#fff" }}
        >
          {saving ? "Saving…" : "Save Session"}
        </Button>
        <Button
          onClick={() => toast.info("Diagnosis feature coming soon")}
          data-ocid="session.diagnosis.button"
          className="hover:opacity-90"
          style={{ backgroundColor: "#2E86DE", color: "#fff" }}
        >
          Diagnosis
        </Button>
      </div>
    </div>
  );
}
