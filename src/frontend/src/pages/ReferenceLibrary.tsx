import { useState } from "react";

type TabId =
  | "pulse"
  | "fiveElements"
  | "trigrams"
  | "iching"
  | "acupuncture"
  | "pmaGuide"
  | "triorigin"
  | "extVessels"
  | "hexMatrix"
  | "drTung"
  | "hitTheory"
  | "astroVastu"
  | "drVoll"
  | "drYamamoto"
  | "drManaka"
  | "drNogier"
  | "drSam"
  | "drElias"
  | "drReinangar"
  | "microNano"
  | "skulAcu"
  | "koreanHand"
  | "headZones"
  | "organZones"
  | "triggerZones"
  | "quantumNpso"
  | "russianTriorigin"
  | "quantumBodies"
  | "quantumMuscular"
  | "drBahr"
  | "chakraFreq"
  | "meridianFreq"
  | "allMeridians"
  | "listDiseases"
  | "voiceSpectrum"
  | "gdvScanning";

const ALL_TABS: { id: TabId; label: string; color: string }[] = [
  { id: "pulse", label: "Pulse Dx", color: "#FF1493" },
  { id: "fiveElements", label: "5 Elements", color: "#FF9F43" },
  { id: "trigrams", label: "Trigrams", color: "#F7CA18" },
  { id: "iching", label: "I Ching", color: "#A8E063" },
  { id: "acupuncture", label: "Acupuncture", color: "#26de81" },
  { id: "pmaGuide", label: "PMA Guide", color: "#2BCBBA" },
  { id: "triorigin", label: "Triorigin", color: "#45AAF2" },
  { id: "extVessels", label: "Ext. Vessels", color: "#4B7BEC" },
  { id: "hexMatrix", label: "Hex Matrix", color: "#A55EEA" },
  { id: "drTung", label: "Dr. Tung", color: "#FC5C65" },
  { id: "hitTheory", label: "Hit Theory", color: "#FD9644" },
  { id: "astroVastu", label: "Astro Vastu", color: "#FECA57" },
  {
    id: "drVoll",
    label: "Dr Voll's EAV Bio-Photonic, Bio-Reasonanz",
    color: "#C8E6C9",
  },
  { id: "drYamamoto", label: "Dr Yamamoto", color: "#80CBC4" },
  { id: "drManaka", label: "Dr Manaka", color: "#81D4FA" },
  {
    id: "drNogier",
    label: "Dr Nogier RAC VAS Bio-Photonic, Bio-Reasonanz Pulse",
    color: "#CE93D8",
  },
  { id: "drSam", label: "Dr SAM", color: "#F48FB1" },
  { id: "drElias", label: "Dr Elias", color: "#FFCC80" },
  { id: "drReinangar", label: "Dr Reinangar", color: "#E6EE9C" },
  {
    id: "microNano",
    label: "Micro/ Neno/ Femto Bio-Photonic Acupuncture",
    color: "#80DEEA",
  },
  { id: "skulAcu", label: "Skul Acupuncture", color: "#EF9A9A" },
  { id: "koreanHand", label: "Korean Hand Acupuncture", color: "#FFAB40" },
  { id: "headZones", label: "Head Zones", color: "#69F0AE" },
  { id: "organZones", label: "Örgän's Zones", color: "#40C4FF" },
  { id: "triggerZones", label: "Triggers Zones", color: "#EA80FC" },
  { id: "quantumNpso", label: "Quantum NPSO Zones", color: "#FF6E40" },
  {
    id: "russianTriorigin",
    label: "Russian Quantum Triorigin",
    color: "#B9F6CA",
  },
  {
    id: "quantumBodies",
    label: "Quantum Bodies Oscillation Frequency",
    color: "#FFD740",
  },
  {
    id: "quantumMuscular",
    label: "Quantum Muscular Micro Photonic Waves 🌊",
    color: "#64FFDA",
  },
  {
    id: "drBahr",
    label: "Dr Bahr Bio-Photonic, Bio-Reasonanz Pulse",
    color: "#FF80AB",
  },
  {
    id: "chakraFreq",
    label: "Bio-Photonic, Bio-Reasonanz Chakras Frequencies",
    color: "#CF6679",
  },
  {
    id: "meridianFreq",
    label: "Bio-Photonic, Bio-Reasonanz Meridians Frequencies",
    color: "#82B1FF",
  },
  {
    id: "allMeridians",
    label:
      "All Meridians Images & Live Bio-Photonic Cosmo Energetic oscillator Flows",
    color: "#CCFF90",
  },
  { id: "listDiseases", label: "List Diseases", color: "#FF4757" },
  {
    id: "voiceSpectrum",
    label: "Bio-Photonic, Bio-Reasonanz Voice Spectrum Scanning",
    color: "#7BED9F",
  },
  { id: "gdvScanning", label: "GDV Scanning", color: "#70A1FF" },
];

const EXISTING_IDS = new Set([
  "pulse",
  "fiveElements",
  "trigrams",
  "iching",
  "acupuncture",
  "pmaGuide",
]);

export default function ReferenceLibrary() {
  const [activeTab, setActiveTab] = useState<TabId>("pulse");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reference Library</h1>
        <p className="text-sm text-gray-400 mt-1">
          Clinical reference charts for consultation — Quantum Bio-Photonic &
          TCM systems
        </p>
      </div>

      {/* Tab buttons — scrollable grid */}
      <div className="flex flex-wrap gap-2">
        {ALL_TABS.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={
              activeTab === t.id
                ? {
                    backgroundColor: "#1A1A1A",
                    color: t.color,
                    border: `1px solid ${t.color}`,
                    boxShadow: `0 0 6px ${t.color}55`,
                  }
                : {
                    backgroundColor: "#111111",
                    color: t.color,
                    border: `1px solid ${t.color}55`,
                    opacity: 0.85,
                  }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div
        className="rounded-xl border border-border p-5 space-y-5"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        {activeTab === "pulse" && <PulseDiagnosis />}
        {activeTab === "fiveElements" && <FiveElements />}
        {activeTab === "trigrams" && <EightTrigrams />}
        {activeTab === "iching" && <IChing />}
        {activeTab === "acupuncture" && <Acupuncture />}
        {activeTab === "pmaGuide" && <PmaGuide />}
        {!EXISTING_IDS.has(activeTab) && (
          <ComingSoon
            label={ALL_TABS.find((t) => t.id === activeTab)?.label ?? ""}
          />
        )}
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

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">📖</div>
      <h2 className="text-lg font-bold mb-2" style={{ color: "#C8862A" }}>
        {label}
      </h2>
      <p className="text-gray-400 text-sm">
        Content will be added shortly.
        <br />
        Please provide the data and it will be updated here.
      </p>
    </div>
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

const SCANNING_PARAMS_COLS = [
  "Organ",
  "Emotion",
  "Season",
  "Time",
  "Touch",
  "Tongue",
  "Cardinal Pts",
  "Taste",
  "Sounds",
  "Smells of Body",
  "Senses",
  "Personality",
  "Sense Organs",
  "Musical",
  "Motions",
  "Meat",
  "Fluids",
  "Face",
  "Emotions",
  "Colours",
  "Climate",
  "Characteristics",
  "Characters",
  "Cereals",
  "Body Structure",
  "Aroma",
  "Animals",
  "Actions",
  "6 Syndromes",
];

const SCANNING_PARAMS_ROWS: {
  element: string;
  color: string;
  data: string[];
}[] = [
  {
    element: "Fire Minister",
    color: "#FF1493",
    data: [
      "P/TW",
      "Emotional Up/Down",
      "Summer",
      "19h-21",
      "Slap",
      "Speech",
      "Zenith",
      "Burning",
      "Speech",
      "Fresh",
      "Thought",
      "Consciousness",
      "Brain",
      "Singing",
      "Jump",
      "Life",
      "Semen",
      "Look",
      "Thought",
      "Purple",
      "Lightning",
      "Void",
      "Spirituality",
      "Information",
      "Nerves",
      "Ozone",
      "Human",
      "Control",
      "Dryness",
    ],
  },
  {
    element: "Water",
    color: "#3b82f6",
    data: [
      "Kidney/BL",
      "Fear",
      "Winter",
      "15–19h",
      "Wave",
      "Root",
      "North",
      "Salty",
      "Groan",
      "Written",
      "Hearing",
      "Will",
      "Ear",
      "Crystal",
      "Down",
      "Pork",
      "Urine",
      "Chin",
      "Fear",
      "Black",
      "Cold",
      "Flexibility",
      "Softness",
      "Legumes/Beans",
      "Bone",
      "Ammonia",
      "Snake",
      "Sleep",
      "Heat",
    ],
  },
  {
    element: "Metal",
    color: "#d1d5db",
    data: [
      "Lung/LI",
      "Grief",
      "Autumn",
      "03–07h",
      "Stroke",
      "Tip",
      "West",
      "Bitter",
      "Cry",
      "Carnel",
      "Smell",
      "Thought",
      "Nose",
      "Bell",
      "Inside",
      "Horse Flesh",
      "Slime",
      "Left/Right Cheek",
      "Excitement",
      "White",
      "Dryness",
      "Dexterity",
      "Tenderness",
      "Rice",
      "Skin",
      "Coniferous",
      "Leopard",
      "Barefoot",
      "Wind",
    ],
  },
  {
    element: "Soil",
    color: "#FFD700",
    data: [
      "Spleen/ST",
      "Worry",
      "Late Summer",
      "07–11h",
      "Malaxing",
      "Centre",
      "Centre",
      "Sweet",
      "Singing",
      "Aromatic",
      "Touch",
      "Intelligence",
      "Mouth",
      "Percussive",
      "Outside",
      "Beef",
      "Slobber",
      "Nose",
      "Meditation",
      "Yellow",
      "Moisture",
      "Universality",
      "Firmness",
      "Rye",
      "Muscle",
      "Rose",
      "Dragon",
      "Maturing",
      "Cold",
    ],
  },
  {
    element: "Fire",
    color: "#FF0000",
    data: [
      "Heart/SI",
      "Joy",
      "Summer",
      "11–15h",
      "Massage",
      "Whole",
      "South",
      "Hot",
      "Laugh",
      "Salty",
      "Taste",
      "Tenderness",
      "Tongue",
      "Stringed/Guitar",
      "Up",
      "Lamb",
      "Sweat",
      "Forehead",
      "Laugh",
      "Red",
      "Heat",
      "Strength",
      "Courageous",
      "Millet",
      "Vessels",
      "Ginger",
      "Tiger",
      "Blossom",
      "Dampness",
    ],
  },
  {
    element: "Tree",
    color: "#22c55e",
    data: [
      "Liver/GB",
      "Anger",
      "Spring",
      "23–03h",
      "Pressure",
      "Sides",
      "East",
      "Sour",
      "Scream",
      "Bitter",
      "Sight",
      "Resoluteness",
      "Eyes",
      "Flute",
      "Straight",
      "Bird",
      "Tears",
      "Left/Right Cheek",
      "Anger",
      "Green",
      "Wind",
      "Lightness",
      "Combinatorics",
      "Wheat",
      "Sinew",
      "Musk",
      "Crane",
      "Growth",
      "Fire",
    ],
  },
];

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
      color: "#FF0000",
      organ: "Heart/SI",
      emotion: "Joy",
      season: "Summer",
      time: "11–15h",
    },
    {
      name: "Earth",
      color: "#FFD700",
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
    {
      name: "Fire Minister",
      color: "#FF1493",
      organ: "P/TW",
      emotion: "Emotional Up/Down",
      season: "Summer",
      time: "19h-21",
    },
  ];
  const rows: { label: string; key: keyof (typeof columns)[0] }[] = [
    { label: "Organ", key: "organ" },
    { label: "Emotion", key: "emotion" },
    { label: "Season", key: "season" },
    { label: "Time", key: "time" },
  ];
  return (
    <div className="space-y-8">
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

      {/* Scanning Parameters Table */}
      <div>
        <h3 className="text-base font-bold mb-3" style={{ color: "#C8862A" }}>
          Scanning Parameters
        </h3>
        <div className="overflow-x-auto">
          <table
            className="text-xs border-collapse"
            style={{ minWidth: "1800px" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#111" }}>
                <th
                  className="py-2 px-3 text-left font-bold border border-gray-700 sticky left-0 z-10"
                  style={{
                    backgroundColor: "#111",
                    color: "#C8862A",
                    minWidth: "100px",
                  }}
                >
                  Element
                </th>
                {SCANNING_PARAMS_COLS.map((col) => (
                  <th
                    key={col}
                    className="py-2 px-3 text-center font-semibold border border-gray-700 whitespace-nowrap"
                    style={{ color: "#C8862A", backgroundColor: "#111" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCANNING_PARAMS_ROWS.map((row, ri) => (
                <tr
                  key={row.element}
                  style={{
                    backgroundColor: ri % 2 === 0 ? "#0D0D0D" : "#141414",
                  }}
                >
                  <td
                    className="py-2 px-3 font-bold border border-gray-700 sticky left-0 z-10"
                    style={{
                      color: row.color,
                      backgroundColor: ri % 2 === 0 ? "#0D0D0D" : "#141414",
                      minWidth: "100px",
                    }}
                  >
                    {row.element}
                  </td>
                  {row.data.map((cell, ci) => {
                    const colName = SCANNING_PARAMS_COLS[ci];
                    return (
                      <td
                        key={colName}
                        className="py-2 px-3 text-center border border-gray-700 whitespace-nowrap"
                        style={{ color: row.color }}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-base font-bold mb-1" style={{ color: "#00BFFF" }}>
          Balencer Resetting of DNA, mRNA decoding AutoImmune by GaAlAr Spark ❇️
          Laser+ Ozon Waves 🌊 Generator for Photonic Waves Frequency Health
          Quantum Bio-Photonic
        </h3>
        <p className="text-xs mb-3 italic" style={{ color: "#aaa" }}>
          DNA Hexagram Bio-Photonic, Bio-Reasonanz Cosmo Energetic oscillator
          waves Space Medicine's Scientific Vedantic Yogic Äyürvédic Tibétän
          Homeopathic Herbal Reformatted hardly 10 % usages of Acute Emergency
          Allopathic Medizine's Prötöcöls....
        </p>
        <div className="overflow-x-auto">
          <table
            className="text-xs border-collapse"
            style={{ minWidth: "1100px" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#111" }}>
                {[
                  "Product Name",
                  "Aim of Cure",
                  "Amino Acid Composition",
                  "DNA Triplets",
                  "Associated Meridians",
                  "Detailed Description",
                ].map((col) => (
                  <th
                    key={col}
                    className="py-2 px-3 text-left font-bold border border-gray-700 whitespace-nowrap"
                    style={{ color: "#00BFFF", backgroundColor: "#111" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Vezugen",
                  aim: "Blood Vessel Function",
                  amino: "Lysine, Glutamic Acid, Aspartic Acid",
                  dna: "AAA, AAA, AA, AAU",
                  meridians:
                    "Large Intestine, Heart, Urinary Bladder, Pancreas, Lungs, Triple Energizer",
                  desc: "Lysine (AAA, AAU) - Large Intestine and Heart meridians (Fire element). Junior base activates Urinary Bladder, Pancreas, Lungs, and Triple Energizer. Resonates with Gall Bladder (23:00-01:00), supporting anabolic phase and relieving Heart strain.",
                  color: "#FF6B6B",
                },
                {
                  name: "Ovagen",
                  aim: "Liver Function",
                  amino: "Leucine, Glutamic Acid, Aspartic Acid",
                  dna: "CUC, CUA, CUNG, CUU",
                  meridians:
                    "Pericardium, Stomach, Urinary Bladder, Pancreas, Lungs, Triple Energizer",
                  desc: "Leucine (CUC, CUA, CUNG, CUU) - Pericardium and Stomach meridians. Junior base activates Urinary Bladder, Pancreas, Lungs, and Triple Energizer. Active during Triple Energizer period (21:00-23:00), supporting Liver regeneration.",
                  color: "#22c55e",
                },
                {
                  name: "Kartalaks",
                  aim: "Cartilage Function",
                  amino: "Alanine, Glutamic Acid, Aspartic Acid",
                  dna: "GCC, GCA, GCG, GCA",
                  meridians:
                    "Gall Bladder, Liver, Urinary Bladder, Pancreas, Lungs, Triple Energizer",
                  desc: "Alanine (GCC, GCA, GCG, GCA) - Gall Bladder and Liver meridians. Junior base activates Urinary Bladder, Pancreas, Lungs, and Triple Energizer. Aligns with Stomach/Pancreas cycle, promoting Metal element vibrations and fluid balance.",
                  color: "#a78bfa",
                },
                {
                  name: "Pinealon",
                  aim: "Brain Function",
                  amino: "Arginine, Glutamic Acid, Aspartic Acid",
                  dna: "CCG, CGA, CGG, CGG",
                  meridians:
                    "Pericardium, Small Intestine, Urinary Bladder, Pancreas, Lungs, Triple Energizer",
                  desc: "Arginine (CCG, CGA, CGG, CGG) - Pericardium and Small Intestine meridians (Fire). Junior base activates Urinary Bladder, Pancreas, Lungs, and Triple Energizer. Supports Heart circulation, increasing blood nitric oxide and improving metabolism.",
                  color: "#FF9F43",
                },
                {
                  name: "Kristagen",
                  aim: "Immune System",
                  amino: "Proline, Glutamic Acid, Aspartic Acid",
                  dna: "CCC, CCA, CCU, CCU",
                  meridians:
                    "Pericardium, Liver, Urinary Bladder, Pancreas, Lungs, Triple Energizer",
                  desc: "Proline (CCC, CCA, CCU, CCU) – Pericardium and Liver meridians. Junior base activates Urinary Bladder, Pancreas, Lungs, and Triple Energizer. Active 18:00-19:00 in Kidney meridian, supporting immune system and bone marrow.",
                  color: "#00BFFF",
                },
                {
                  name: "Honluten",
                  aim: "Bronchial Mucosa",
                  amino: "Glycine, Glutamic Acid, Aspartic Acid",
                  dna: "GGC, GGA, GGG, GGA",
                  meridians:
                    "Gall Bladder, Small Intestine, Urinary Bladder, Pancreas, Lungs, Triple Energizer",
                  desc: "Glycine (GGC, GGA, GGG, GGA) - Gall Bladder and Small Intestine meridians. Junior base activates Urinary Bladder, Pancreas, Lungs, and Triple Energizer. Resonates with Lung activity (04:00-05:00), stimulating mucus metabolism.",
                  color: "#FFD700",
                },
              ].map((row, ri) => (
                <tr
                  key={row.name}
                  style={{
                    backgroundColor: ri % 2 === 0 ? "#0D0D0D" : "#141414",
                  }}
                >
                  <td
                    className="py-2 px-3 font-bold border border-gray-700 whitespace-nowrap"
                    style={{ color: row.color }}
                  >
                    {row.name}
                  </td>
                  <td
                    className="py-2 px-3 border border-gray-700 whitespace-nowrap"
                    style={{ color: row.color }}
                  >
                    {row.aim}
                  </td>
                  <td
                    className="py-2 px-3 border border-gray-700"
                    style={{ color: row.color }}
                  >
                    {row.amino}
                  </td>
                  <td
                    className="py-2 px-3 border border-gray-700 whitespace-nowrap"
                    style={{ color: row.color }}
                  >
                    {row.dna}
                  </td>
                  <td
                    className="py-2 px-3 border border-gray-700"
                    style={{ color: row.color }}
                  >
                    {row.meridians}
                  </td>
                  <td
                    className="py-2 px-3 border border-gray-700"
                    style={{
                      color: row.color,
                      maxWidth: "400px",
                      whiteSpace: "normal",
                    }}
                  >
                    {row.desc}
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
        The Ba Gua correspond to eight directional energies and body zones. In
        the Vedic integration system, these map to the Navagraha and Chakra
        system, creating a unified bio-energetic diagnostic framework.
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

function Acupuncture() {
  return (
    <div>
      <GoldTitle>Acupuncture</GoldTitle>
      <p className="text-sm text-gray-400 leading-relaxed">
        Classical acupuncture reference — meridian pathways, point locations,
        and bio-photonic activation protocols.
      </p>
    </div>
  );
}

function PmaGuide() {
  return (
    <div>
      <GoldTitle>PMA Guide</GoldTitle>
      <p className="text-sm text-gray-400 leading-relaxed">
        Photonic Meridian Activation (PMA) guide — treatment protocols and
        clinical application guidelines.
      </p>
    </div>
  );
}
