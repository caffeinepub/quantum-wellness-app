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

const SHEET1_ROWS = [
  {
    id: "s1-1",
    contextLeft:
      "~ ☳ Zhèn Thunder ~ Yöüng Yin/ Chändrä Nädi 🌓\n~ Eldest Son Provides Action\n~⚡through P/ TW",
    dnaIon: "",
    season: "",
    trigram6: "",
    element: "☳ Zhèn Wood",
    vessels:
      "~ P/ TW (Pericardium / Triple Energizer)\n~ Änähät Heart Chäkrä ~ Gate Keeper\n~ Yäng Wei Mai ~ TW/ (SJ 5)",
    order: "1️⃣",
    trigram: "☰ Qián",
    moonPhase: "Full Moon 🌕",
    diseaseStage: "YangMing",
    dnaLogic: "Adenine / Na⁺",
    switchVal: "0 (OFF)",
    metabolic: "Catabolic",
    evVessel: "Chong Mai",
    masterPt: "SP 4",
    clinical:
      "Interior Heat: High fever, thirst, profuse sweat, extreme interior heat.",
    isCatabolic: true,
  },
  {
    id: "s1-2",
    contextLeft:
      "~ ⚌ Greater Yäng ~ TaiYäng\n~ Both Upper & Lower Süryä Nädi 🌗 Örgäns\n~ Relationship with Na+ Catabolic Inside Cellular Bio-Photonic, Bio-Reasonanz Cosmo",
    dnaIon:
      "~ Cytosine\n~ Contains Lowest Natural Bio-Photonic, Bio-Reasonanz Cosmo Energetic Oscillator Waves 🌊 Frequency\n~ Summer",
    season: "",
    trigram6:
      "~ ☲ Li Fire Yöüng Yin\n~ Middle Daughter Provides Brightness 🔆,\n~ Dependent ~ through 🔥 H/ Si",
    element: "☲ Lí Fire 🔥 ♨️",
    vessels:
      "~ H/ SI (Heart / Small Intestine)\n~ 3rd Éyé Ägnä. Chäkrä ~ Mother Within Us\n~ Ren Mai ~ (Lu 7)",
    order: "2️⃣",
    trigram: "☱ Duì",
    moonPhase: "Waning Gibb.",
    diseaseStage: "TaiYang",
    dnaLogic: "Guanine / Na⁺",
    switchVal: "0 (OFF)",
    metabolic: "Catabolic",
    evVessel: "Du Mai",
    masterPt: "SI 3",
    clinical:
      "Exterior Cold: Stiff neck, headache, floating pulse, superficial defense.",
    isCatabolic: true,
  },
  {
    id: "s1-3",
    contextLeft: "",
    dnaIon: "",
    season: "",
    trigram6:
      "~ ☱ Dui Lake's Old Yäng\n~ Youngest Daughter Provides Joy & Pleasures\n~ through Metal Lu/ Li",
    element: "☱ Duì Lake Metal",
    vessels:
      "~ Cröwn Chäkrä ~ Viceroy Governor\n~ Provides Direct Scientific Vedantic Yogic Äyürvédic Tibétän Spiritual Connection through Cellular/ Bio-Photonic, Bio-Reasonanz Cosmo Energetic Oscillator waves ~ (Si 3)",
    order: "3️⃣",
    trigram: "☴ Xùn",
    moonPhase: "Last Quarter 🌗",
    diseaseStage: "JueYin",
    dnaLogic: "Adenine / OH⁻",
    switchVal: "0 (OFF)",
    metabolic: "Catabolic",
    evVessel: "Dai Mai",
    masterPt: "GB 41",
    clinical:
      "Terminal Mixed: Mixed Heat/Cold, insomnia, palpitations, reversal cold limbs.",
    isCatabolic: true,
  },
  {
    id: "s1-4",
    contextLeft:
      "~ Yäng ⚊/ Süryä Nädi 🌗 Creates Relationship with ⚋ Yin/ Chändrä Nädi 🌓\n~ H+ Ions Anabolic Inside Cellular Bio-Photonic, Bio-Reasonanz Cosmo Energetic oscillator waves",
    dnaIon:
      "~ Adenine\n~ Contains Junior High Upper Level Natural Bio-Photonic, Bio-Reasonanz Cosmo Energetic Oscillator Waves 🌊 Frequency\n~ Spring ⛲",
    season: "1/ Switch Ön",
    trigram6:
      "~ ☰ Qian Qián Heaven's - Old Yäng\nGränd Fäthér Provides Creativity Strength\n~ through (Du ~ Brain Governor)",
    element: "☰ Qián Heaven Metal",
    vessels:
      "~ Lung / Head (Du / Brain Governor) ~ Architektur\n~ Chong Mai ~ (Sp 4)",
    order: "4️⃣",
    trigram: "☵ Kǎn",
    moonPhase: "Waning Cres.",
    diseaseStage: "ShaoYin",
    dnaLogic: "Guanine / Ca²⁺",
    switchVal: "0 (OFF)",
    metabolic: "Catabolic",
    evVessel: "Yang Qiao Mai",
    masterPt: "UB 62",
    clinical:
      "Deep Collapse: Extreme deficiency, Yin/Yang collapse, intense fatigue.",
    isCatabolic: true,
  },
  {
    id: "s1-5",
    contextLeft:
      "~ Yin ⚋/ Chändrä Nädi 🌓 Creates Relationship with ⚊/ Yäng/ Süryä Nädi 🌗\n~ OH+ Ions Catäbölic Inside Cellular Bio-Photonic, Bio-Reasonanz...",
    dnaIon:
      "~ Guanine\n~ Contains Senior Lowest Line Bio-Photonic, Bio-Reasonanz Cosmo Energetic Oscillator Waves 🌊 Frequency\n~ Winter 🌨️",
    season: "0/ Switch Öff",
    trigram6:
      "~ ☴ Sun Xùn Yöüng Yäng\n~ Eldest Daughter Provides Penetration through\n~ Wind 🍃 Wood Gb/ Liv",
    element: "☴ Xùn Wind 🍃 Wood",
    vessels:
      "~ Gb/ Liv ~ (Gallbladder / Liver) ~ Thröät Chäkrä\n~ Court Scientist ~ Dai Mai ~ Gb 41",
    order: "5️⃣",
    trigram: "☷ Kūn",
    moonPhase: "New Moon 🌑",
    diseaseStage: "TaiYin",
    dnaLogic: "Uracil / K⁺",
    switchVal: "1 (ON)",
    metabolic: "Anabolic",
    evVessel: "Yin Qiao Mai",
    masterPt: "KID 6",
    clinical:
      "Interior Damp: Diarrhea, abdominal fullness, poor appetite, coldness.",
    isCatabolic: false,
  },
  {
    id: "s1-6",
    contextLeft: "",
    dnaIon: "",
    season: "",
    trigram6: "",
    element: "☵ Kǎn Water 💧",
    vessels:
      "~ Ub/ Kid ~ (Bladder / Kidney) ~ Sölär Pléxüs Chäkrä\n~ Dancer (Female) ~ Yäng Qiao Mai ~ (Ub 62)",
    order: "6️⃣",
    trigram: "☶ Gèn",
    moonPhase: "Waxing Cres.",
    diseaseStage: "TaiYin",
    dnaLogic: "Cytosine / H⁺",
    switchVal: "1 (ON)",
    metabolic: "Anabolic",
    evVessel: "Yang Wei Mai",
    masterPt: "P 6",
    clinical:
      "Spleen Cold: Yang deficiency, internal dampness, stillness/stagnation.",
    isCatabolic: false,
  },
  {
    id: "s1-7",
    contextLeft:
      "~ ⚏ Greater Yin\n~ Both Upper & Lower Chändrä Nädi 🌓 🌗 Örgäns\n~ Relationship with K+ Ions Anabolic Cellular Bio-Photonic, Bio-Reasonanz...",
    dnaIon:
      "~ Uracil\n~ Contains Highest Levels of Bio-Photonic, Bio-Reasonanz Cosmo Energetic Oscillator Waves 🌊 Frequency\n~ Äütümn",
    season: "",
    trigram6:
      "~ ☶ Gèn Mountains ~ Old Yin\n~ Youngest Son Provides Stillness through\n~ Mountains ⛰️ St/ Sp",
    element: "☶ Gèn Mountains ⛰️",
    vessels:
      "~ St/ Sp ~ (Stomach / Spleen) ~ Swädhisthänä Chäkrä\n~ Gate Keeper ~ Yäng Wei Mai ~ (P 6)",
    order: "7️⃣",
    trigram: "☳ Zhèn",
    moonPhase: "First Quarter 🌓",
    diseaseStage: "ShaoYang",
    dnaLogic: "Uracil / Mg²⁺",
    switchVal: "1 (ON)",
    metabolic: "Anabolic",
    evVessel: "Yang Wei Mai",
    masterPt: "SJ 5",
    clinical:
      "Pivot Stage: Alternating chills/fever, bitter taste, rib-side pain, dizziness.",
    isCatabolic: false,
  },
  {
    id: "s1-8",
    contextLeft: "",
    dnaIon: "",
    season: "",
    trigram6:
      "~ ☷ Kûn Earth ⏚ Old Yin\n~ Gränd Möthér Provides Receptivity through\n~ Ren Mai/ Sex Circülätiön",
    element: "☷ Kūn Earth 🌎 ⏚",
    vessels: "~ Mülädhärä Chäkrä ~ Dancer (Male)\n~ Yin Qiao Mai ~ (Kid 6)",
    order: "8️⃣",
    trigram: "☲ Lí",
    moonPhase: "Waxing Gibb.",
    diseaseStage: "ShaoYang",
    dnaLogic: "Cytosine / H⁺",
    switchVal: "1 (ON)",
    metabolic: "Anabolic",
    evVessel: "Ren Mai",
    masterPt: "LU 7",
    clinical:
      "Half-Int/Ext: Body struggling to resolve pathogen, brightness/dependence.",
    isCatabolic: false,
  },
];

const SHEET2_ROWS = [
  {
    id: "s2-1",
    stage:
      "1️⃣ TaiYang — Greater Yäng\nSi/ Ub — Temp ~ Coldness ❄️, Cold Water 💧\n100% OverActive Süryä Nädi 🌓 Creates Inflämmätöry Chängés Distürbäncés",
    diseaseStage:
      "1st Line Most Superficial Levels of Defense ~ due to Ext. Excess",
    pathology:
      'The exterior is invaded, resulting in an "Exterior Cold" pattern. (Aversion to Coldness ❄️)',
    symptoms:
      "Chills, fever, headache, stiff neck, aversion to cold, floating pulse.",
    treatment: "Release the exterior (e.g., diaphoresis).",
    bioPts: "Release the exterior (LI4, LU7, BL12)",
    isYang: true,
  },
  {
    id: "s2-2",
    stage:
      "2️⃣ YangMing — Bright Yäng\nLi/ St — Humidity ~ Dryness Metal\n80% OverActive Süryä Nädi 🌓 Creates Inflämmätöry Chängés Distürbäncés",
    diseaseStage: "2nd Level Exterior to Interior Heat ~ due to Int. Excess",
    pathology:
      "The pathogen has penetrated deeper, turning from Cold into internal Heat (Interior Excess/Heat 🔥) (Fever, Thirst)",
    symptoms:
      "High fever, profuse sweating, extreme thirst, dry stools/constipation, yellow tongue coating",
    treatment: "Clear Heat, purge down (clear the stomach and intestines).",
    bioPts: "Clear Heat (LI11, ST44, DU14).",
    isYang: true,
  },
  {
    id: "s2-3",
    stage:
      "3️⃣ ShaoYang — Lesser Yäng\nTw/ Gb — Air Movements - Outward - Fire Minister ♨️ 🔥\n70% OverActive Süryä Nädi 🌗 Creates Inflämmätöry Chängés Distürbäncés",
    diseaseStage:
      '3rd Level due to "Pivot प्रधान आधार" or Half-Exterior/Half-Interior/ Half-Int/Ext (Alt. Fever/Chills)',
    pathology:
      "The pathogen is caught between the exterior and interior; the body is struggling to resolve it.",
    symptoms:
      "Alternating chills and fever, bitter taste, dry throat, dizziness, rib-side pain.",
    treatment:
      "Harmonize the Shao Yang (neither fully Sweating Purging nor fully Purging/ शुद्धिकरणम्).",
    bioPts: "Harmonize Shao Yang (SJ5, GB41).",
    isYang: true,
  },
  {
    id: "s2-4",
    stage:
      "4️⃣ TaiYin — Greater Yin\nLu/ Sp — Humidity ~ Moisture/ Damp Earth 🌎\n70% Darkest Level of Inactive Süryä Nädi 🌗 Creates Dégénérätivé Chängés Distürbäncés",
    diseaseStage:
      "1st Interior Coldness ❄️ Stage ~ due to Int. Def. ~ Interior Cold/Damp (Diarrhea)",
    pathology:
      "The pathogen has entered the interior, affecting the Spleen, leading to Yang deficiency, internal Cold, and Dampness.",
    symptoms:
      "Abdominal Fullness, Diarrhea/ Loose Stools, Poor Appetite, Vomiting, inability to Eat, no Thirst, Fatigue",
    treatment: "Warm & Tonify the Spleen (Yäng/Süryä Nädi 🌗).",
    bioPts: "Warm and tonify (ST36, SP6, Ren12)",
    isYang: false,
  },
  {
    id: "s2-5",
    stage:
      "5️⃣ ShaoYin — Lesser Yin\nH/ Kid — Temp ~ Hot, Hotness 🔥 in Emporior Fire\n80% Darkest Level of Inactive Süryä 🌗 Nädi Creates Dégénérätivé Chängés Distürbäncés",
    diseaseStage:
      "Deep Deficiency ~ due to Yin/ Chändrä Nädi 🌓 or Yang/ Süryä Nädi 🌗 Collapse गिर जाना",
    pathology:
      "Extreme deficiency of Yin or Yang. This is a very deep, serious stage.",
    symptoms:
      "Shao Yin Cold: Cold limbs, diarrhea, fatigue, Coldness ❄️ Intolerance (Yang/ Süryä Nädi 🌗 deficiency).",
    treatment: "Warm Kidney Yang or nourish Yin.",
    bioPts:
      "Warm Kidney Yang/ Süryä Nädi 🌗 (e.g., Ren4, KD3) or Nourish Yin/ Chändrä Nädi 🌓 (KD6, HT7).",
    isYang: false,
  },
  {
    id: "s2-6",
    stage:
      "6️⃣ JueYin — Absolute Yin\nP/ Liv — Air Movements ~ Inward - Wind 🍃 Wood\n100% Darkest Level Inactive Süryä 🌗 Nädi Creates Dégénérätivé Chängés Distürbäncés",
    diseaseStage:
      "Final/Most Complex Stage ~ Deepest Level due to Mixed Heat Hotness ♨️ 🔥 /Coldness ❄️ (Reversal Coldness ❄️)",
    pathology:
      "The ultimate stage of disease. It represents a Collapse of Yin/ Chändrä Nädi 🌓 ~ Yang/ Süryä Nädi 🌗 Connection, leading to a Complex Mix of Heat above & Coldness ❄️ below. Insomnia, Dry Mouth, Palpitations.",
    symptoms:
      "Thirst, alternating periods of fever and coldness, extreme cold limbs (reversal cold), energy rising (agitation/nausea), Wasting.",
    treatment: "Balance and harmonize (carefully managing both cold and heat).",
    bioPts: "Balance and harmonize (LV3, PC6).",
    isYang: false,
  },
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

      {/* Patient & Date */}
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

      {/* Modalities */}
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

      {/* Meridian Readings */}
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
                      <td key={field} className="py-1.5 px-2">
                        <input
                          type="number"
                          value={r[field]}
                          onChange={(e) =>
                            updateReading(m.code, field, e.target.value)
                          }
                          className="w-16 rounded border border-border bg-input px-2 py-1 text-center text-sm font-semibold"
                          style={{ color }}
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

      {/* Action buttons */}
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

      {/* ============================================================ */}
      {/* REFERENCE SHEET 1: Ärdhnärishwär Bäläncér Sämhitä Gränth's Prötöcöls */}
      {/* ============================================================ */}
      <div
        className="rounded-xl border border-border p-5 space-y-4"
        style={{ backgroundColor: "#1A1A1A" }}
        data-ocid="session.sheet1.panel"
      >
        <h2
          className="text-sm font-bold uppercase tracking-wider"
          style={{ color: "#FFD700" }}
        >
          Ärdhnärishwär Bäläncér Sämhitä Gränth’s Prötöcöls — Reference Sheet 1️⃣
        </h2>
        <p className="text-xs" style={{ color: "#aaa" }}>
          Quantum Bit Binary Code · Trigram Correspondences · Extraordinary
          Vessels · Clinical Pathology
        </p>
        <div className="overflow-x-auto">
          <table
            className="text-xs border-collapse"
            style={{ minWidth: "1400px", width: "100%" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#2a1a00" }}>
                {[
                  "Ärdhnärishwär Bäläncér Sämhitä Gränth’s Prötöcöls",
                  "DNA / Ion Logic · Season Context",
                  "Switch",
                  "⚍/⚎ Nädi Context",
                  "Element",
                  "14+ 8 Extraordinary Vessels + 8 Chäkräs Relationship",
                  "Order",
                  "Trigram",
                  "Moon Phase",
                  "Disease Stage",
                  "DNA / Ion Logic",
                  "Switch",
                  "Metabolic State",
                  "Extraordinary Vessel",
                  "Master Point",
                  "Clinical Pathology & Symptoms",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-2 py-2 text-left border border-gray-700 whitespace-nowrap"
                    style={{ color: "#FFD700", fontWeight: 700 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHEET1_ROWS.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#1e1e1e" : "#242424",
                  }}
                  data-ocid={`session.sheet1.item.${i + 1}`}
                >
                  <td
                    className="px-2 py-2 border border-gray-700 align-top"
                    style={{
                      color: "#c8c8c8",
                      maxWidth: "180px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {row.contextLeft}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 align-top"
                    style={{
                      color: "#c8c8c8",
                      maxWidth: "180px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {row.dnaIon}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 align-top"
                    style={{
                      color:
                        row.season === "1/ Switch Ön"
                          ? "#22d3ee"
                          : row.season === "0/ Switch Öff"
                            ? "#f87171"
                            : "#c8c8c8",
                      fontWeight: row.season ? 700 : 400,
                    }}
                  >
                    {row.season}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 align-top"
                    style={{
                      color: "#c8c8c8",
                      maxWidth: "180px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {row.trigram6}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 align-top font-bold"
                    style={{ color: "#FFD700", whiteSpace: "nowrap" }}
                  >
                    {row.element}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 align-top"
                    style={{
                      color: "#d0d0d0",
                      maxWidth: "200px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {row.vessels}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 text-center font-bold text-base"
                    style={{ color: row.isCatabolic ? "#67e8f9" : "#fbbf24" }}
                  >
                    {row.order}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 text-center font-bold"
                    style={{ color: "#FFD700", fontSize: "1rem" }}
                  >
                    {row.trigram}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 text-center whitespace-nowrap"
                    style={{ color: "#c0c0c0" }}
                  >
                    {row.moonPhase}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 text-center font-semibold whitespace-nowrap"
                    style={{ color: row.isCatabolic ? "#f87171" : "#4ade80" }}
                  >
                    {row.diseaseStage}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 whitespace-nowrap"
                    style={{ color: "#93c5fd" }}
                  >
                    {row.dnaLogic}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 text-center font-bold whitespace-nowrap"
                    style={{
                      color: row.switchVal === "1 (ON)" ? "#4ade80" : "#f87171",
                    }}
                  >
                    {row.switchVal}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 text-center font-semibold whitespace-nowrap"
                    style={{
                      color:
                        row.metabolic === "Anabolic" ? "#4ade80" : "#f87171",
                    }}
                  >
                    {row.metabolic}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 whitespace-nowrap"
                    style={{ color: "#c084fc" }}
                  >
                    {row.evVessel}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700 text-center font-bold whitespace-nowrap"
                    style={{ color: "#fcd34d" }}
                  >
                    {row.masterPt}
                  </td>
                  <td
                    className="px-2 py-2 border border-gray-700"
                    style={{
                      color: "#e2e8f0",
                      maxWidth: "220px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {row.clinical}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/* REFERENCE SHEET 2: 8 Stages Relationship                     */}
      {/* ============================================================ */}
      <div
        className="rounded-xl border border-border p-5 space-y-4"
        style={{ backgroundColor: "#1A1A1A" }}
        data-ocid="session.sheet2.panel"
      >
        <h2
          className="text-sm font-bold uppercase tracking-wider"
          style={{ color: "#67e8f9" }}
        >
          8 Stages Relationship with Lünär/ Sölär Spéctrüpm Cölör’s Rädiätiön
          Éffécts Möön_Phases — Reference Sheet 2️⃣
        </h2>
        <p className="text-xs" style={{ color: "#aaa" }}>
          Disease Stages · Pathology · Symptoms · Treatment Principles ·
          Bio-Photonic, Bio-Reasonanz Points
        </p>
        <div className="overflow-x-auto">
          <table
            className="text-xs border-collapse"
            style={{ minWidth: "1100px", width: "100%" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#001a2a" }}>
                {[
                  "Stage",
                  "Diseases Stages",
                  "Pathology",
                  "Symptoms",
                  "Treatment Principle",
                  "Bio-Photonic, Bio-Reasonanz Pts",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left border border-gray-700"
                    style={{ color: "#FFD700", fontWeight: 700 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHEET2_ROWS.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#1e1e1e" : "#242424",
                  }}
                  data-ocid={`session.sheet2.item.${i + 1}`}
                >
                  <td
                    className="px-3 py-2 border border-gray-700 align-top font-semibold"
                    style={{
                      color: row.isYang ? "#f87171" : "#4ade80",
                      maxWidth: "200px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {row.stage}
                  </td>
                  <td
                    className="px-3 py-2 border border-gray-700 align-top"
                    style={{ color: "#cbd5e1", maxWidth: "180px" }}
                  >
                    {row.diseaseStage}
                  </td>
                  <td
                    className="px-3 py-2 border border-gray-700 align-top"
                    style={{ color: "#e2e8f0", maxWidth: "220px" }}
                  >
                    {row.pathology}
                  </td>
                  <td
                    className="px-3 py-2 border border-gray-700 align-top"
                    style={{ color: "#d1d5db", maxWidth: "200px" }}
                  >
                    {row.symptoms}
                  </td>
                  <td
                    className="px-3 py-2 border border-gray-700 align-top"
                    style={{ color: "#86efac", maxWidth: "180px" }}
                  >
                    {row.treatment}
                  </td>
                  <td
                    className="px-3 py-2 border border-gray-700 align-top font-semibold"
                    style={{ color: "#fcd34d" }}
                  >
                    {row.bioPts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
