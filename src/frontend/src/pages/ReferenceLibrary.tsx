import { useState } from "react";

type MainTab = "pulse" | "fiveElements" | "trigrams" | "iching";
type SubTab = "acupuncture" | "pmaGuide";

export default function ReferenceLibrary() {
  const [mainTab, setMainTab] = useState<MainTab>("pulse");
  const [subTab, setSubTab] = useState<SubTab>("acupuncture");

  const mainTabs: { id: MainTab; label: string }[] = [
    { id: "pulse", label: "Pulse Diagnosis" },
    { id: "fiveElements", label: "Five Elements" },
    { id: "trigrams", label: "Eight Trigrams" },
    { id: "iching", label: "I Ching" },
  ];

  const subTabs: { id: SubTab; label: string }[] = [
    { id: "acupuncture", label: "Acupuncture" },
    { id: "pmaGuide", label: "PMA Guide" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reference Library</h1>
        <p className="text-sm text-gray-400 mt-1">
          Clinical reference charts for consultation — Quantum Bio-Photonic &
          TCM systems
        </p>
      </div>

      {/* Main tabs */}
      <div className="flex flex-wrap gap-2" data-ocid="library.main.tab">
        {mainTabs.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => setMainTab(t.id)}
            data-ocid={`library.${t.id}.tab`}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              mainTab === t.id
                ? { backgroundColor: "#2A1A00", color: "#C8862A" }
                : {
                    backgroundColor: "#1A1A1A",
                    color: "#9CA3AF",
                    border: "1px solid #2A2A2A",
                  }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sub tabs */}
      <div className="flex flex-wrap gap-2" data-ocid="library.sub.tab">
        {subTabs.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => setSubTab(t.id)}
            data-ocid={`library.${t.id}.tab`}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              subTab === t.id
                ? { backgroundColor: "#2A1A00", color: "#C8862A" }
                : {
                    backgroundColor: "#1A1A1A",
                    color: "#9CA3AF",
                    border: "1px solid #2A2A2A",
                  }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className="rounded-xl border border-border p-5 space-y-5"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        {mainTab === "pulse" && <PulseDiagnosis />}
        {mainTab === "fiveElements" && <FiveElements />}
        {mainTab === "trigrams" && <EightTrigrams />}
        {mainTab === "iching" && <IChing />}
      </div>
    </div>
  );
}

function GoldTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold mb-3" style={{ color: "#C8862A" }}>
      {children}
    </h2>
  );
}

function PulseDiagnosis() {
  return (
    <div>
      <GoldTitle>Wrist Pulse Diagnosis (Nadi Pariksha)</GoldTitle>
      <p className="text-sm text-gray-400 leading-relaxed mb-5">
        The three positions (Distal / Middle / Proximal) on each wrist
        correspond to specific organ meridians. Right hand reflects Yang organs;
        Left hand reflects Yin organs. Depth (superficial/deep) and quality of
        the pulse indicates constitutional balance or imbalance.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <WristColumn
          title="Right Wrist"
          items={[
            { pos: "Distal (Cun)", organs: "Lung / Large Intestine" },
            { pos: "Middle (Guan)", organs: "Spleen-Pancreas / Stomach" },
            { pos: "Proximal (Chi)", organs: "Pericardium / Triple Energizer" },
          ]}
        />
        <WristColumn
          title="Left Wrist"
          items={[
            { pos: "Distal (Cun)", organs: "Heart / Small Intestine" },
            { pos: "Middle (Guan)", organs: "Liver / Gallbladder" },
            { pos: "Proximal (Chi)", organs: "Kidney / Bladder" },
          ]}
        />
      </div>
    </div>
  );
}

function WristColumn({
  title,
  items,
}: { title: string; items: { pos: string; organs: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.pos}
            className="rounded-lg border border-border px-3 py-2"
            style={{ backgroundColor: "#0D0D0D" }}
          >
            <div className="text-xs font-medium" style={{ color: "#C8862A" }}>
              {item.pos}
            </div>
            <div className="text-sm text-gray-300 mt-0.5">{item.organs}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FiveElements() {
  const columns = [
    {
      name: "Wood",
      color: "#22c55e",
      organ: "Liver/GB",
      emotion: "Anger",
      season: "Spring",
      time: "23–03h",
    },
    {
      name: "Fire",
      color: "#ef4444",
      organ: "Heart/SI",
      emotion: "Joy",
      season: "Summer",
      time: "11–15h",
    },
    {
      name: "Earth",
      color: "#f97316",
      organ: "Spleen/ST",
      emotion: "Worry",
      season: "Late Summer",
      time: "07–11h",
    },
    {
      name: "Metal",
      color: "#d1d5db",
      organ: "Lung/LI",
      emotion: "Grief",
      season: "Autumn",
      time: "03–07h",
    },
    {
      name: "Water",
      color: "#3b82f6",
      organ: "Kidney/BL",
      emotion: "Fear",
      season: "Winter",
      time: "15–19h",
    },
  ];
  const rows: { label: string; key: keyof (typeof columns)[0] }[] = [
    { label: "Organ", key: "organ" },
    { label: "Emotion", key: "emotion" },
    { label: "Season", key: "season" },
    { label: "Time", key: "time" },
  ];
  return (
    <div>
      <GoldTitle>Five Elements — Wu Xing & Diurnal Cycle</GoldTitle>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-3 text-gray-400 font-medium w-24" />
              {columns.map((c) => (
                <th
                  key={c.name}
                  className="py-2 px-3 text-center font-bold"
                  style={{ color: c.color }}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-border last:border-0"
              >
                <td className="py-2 pr-3 text-gray-400 font-medium">
                  {row.label}
                </td>
                {columns.map((c) => (
                  <td
                    key={c.name}
                    className="py-2 px-3 text-center text-gray-300"
                  >
                    {c[row.key] as string}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EightTrigrams() {
  const bagua = [
    { sym: "☰", name: "Qian", desc: "Heaven, Father, Head/Lungs" },
    { sym: "☷", name: "Kun", desc: "Earth, Mother, Abdomen/Spleen" },
    { sym: "☳", name: "Zhen", desc: "Thunder, First Son, Liver/Feet" },
    { sym: "☴", name: "Xun", desc: "Wind, First Daughter, Gallbladder/Thighs" },
    { sym: "☵", name: "Kan", desc: "Water, Second Son, Kidneys/Ears" },
    { sym: "☲", name: "Li", desc: "Fire, Second Daughter, Heart/Eyes" },
    { sym: "☶", name: "Gen", desc: "Mountain, Third Son, Spine/Hands" },
    { sym: "☱", name: "Dui", desc: "Lake, Third Daughter, Lungs/Mouth" },
  ];
  const vedic = [
    { chakra: "Muladhara", mapping: "↔ Earth (Kun)", note: "Root stability" },
    { chakra: "Svadhisthana", mapping: "↔ Water (Kan)", note: "Fluidity" },
    { chakra: "Manipura", mapping: "↔ Fire (Li)", note: "Transformation" },
    { chakra: "Anahata", mapping: "↔ Wind (Xun)", note: "Circulation" },
    { chakra: "Vishuddha", mapping: "↔ Thunder (Zhen)", note: "Expression" },
    { chakra: "Ajna", mapping: "↔ Mountain (Gen)", note: "Perception" },
    { chakra: "Sahasrara", mapping: "↔ Heaven (Qian)", note: "Consciousness" },
  ];
  return (
    <div>
      <GoldTitle>Eight Trigrams (Ba Gua) — Vedic Integration</GoldTitle>
      <p className="text-sm text-gray-400 leading-relaxed mb-5">
        The Ba Gua (Eight Trigrams) of the I Ching correspond to the eight
        directional energies and body zones. In the Vedic integration system,
        these map to the Navagraha (nine planets) and Chakra system, creating a
        unified bio-energetic diagnostic framework.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: "#C8862A" }}
          >
            Ba Gua Correspondences
          </h3>
          <div className="space-y-2">
            {bagua.map((b) => (
              <div key={b.name} className="flex gap-3 items-start">
                <span
                  className="text-xl leading-none"
                  style={{ color: "#C8862A" }}
                >
                  {b.sym}
                </span>
                <div className="text-sm text-gray-300">
                  <span className="font-medium text-white">{b.name}</span> —{" "}
                  {b.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: "#C8862A" }}
          >
            Vedic Chakra Mapping
          </h3>
          <div className="space-y-2">
            {vedic.map((v) => (
              <div key={v.chakra} className="text-sm">
                <span className="font-medium text-white">{v.chakra}</span>{" "}
                <span className="text-gray-400">{v.mapping}</span>
                {" — "}
                <span className="text-gray-500">{v.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IChing() {
  return (
    <div>
      <GoldTitle>I Ching — 64 Hexagrams</GoldTitle>
      <p className="text-sm text-gray-400 leading-relaxed">
        The 64 hexagrams encode all possible states of yin-yang transformation
        across six levels. In bio-photonic diagnosis, hexagram patterns
        correlate with cellular coherence states.
      </p>
    </div>
  );
}
