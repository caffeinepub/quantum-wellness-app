import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Mail,
  MessageCircle,
  Phone,
  QrCode,
} from "lucide-react";
import { useState } from "react";

const DIAGNOSIS_OPTIONS = [
  {
    num: "1️⃣",
    title: "Laser Pulse Scanning",
    desc: `Laser Pulse Scanning to find the actual root causes of Any Diseases for Successful Diagnosis, Prognosis, Preventive, Curative, Medikamente Testen to know in advance before to intake any Medizine's effects & side effects, therapeutic protocols for incurable Diseases where ever any other therapies had have been failed or Collapsed, Integrative Globally Synchronized Medical Correlation..... to find actual ROOT CAUSE OF SYNDROMES, SYMPTOMS & DISEASES.....\n\nThrough Space Medicine's Quantum Bio-Photonic Optical Physics extremely high BioResonanz Medical RUSSIAN LASER PULSE ACUPUNCTURE FULLY AUTOMATED GSM licensed SCANNING, having more than 250 parameters of complete whole body, mind, 5 Cellular Organelles like Mitochondrial's DNA mRNA decoding & much more details to find out the Actual Root cause of Syndromes, Symptoms of Diseases state like Acute, Sub Acute, Chronic`,
    charge: "₹ 30,000/-",
    color: "#FFD700",
  },
  {
    num: "2️⃣",
    title: "Medizine Laser Acupuncture Thermal ♨️🔥 Camera Scanning",
    desc: `Space Medizine's extremely High Resolutions Medizine Laser Acupuncture Thermal ♨️ 🔥 Camera Scanning to accurately Locate either\n\n1️⃣ Hiddén Live Viruses/Bacterial Inflämmätöry Chängés Patterns in Cellular Bio-Photonic, Bio-Reasonanz Cosmo Energetic oscillator waves\n\n2️⃣ or Hiddén Dégénérätivé Chängés in Cellular Bio-Photonic, Bio-Reasonanz Cosmo Energetic oscillator waves Patterns\n\nIntegrative Medical Correlation through Space Medicine's Quantum Physics extremely high Resonanz medical Pulsed laser Acupuncture Russian, German 🇩🇪, Israel 🇮🇱, Korean, Taiwan 🇹🇼, Brazil 🇧🇷, China 🇨🇳, France 🇫🇷, Japanese, Czech Republic, Belgium 🇧🇪, Sweden 🇸🇪, etc Bioreasonanz Cosmo Energetic licensed THERMAL ♨️ CAMERA SCANNING based on Solar Spectrum's Nobel Prize Winners late German Dr voll's eav+ more than 20 Allopathic Medizine's Various Departments experts successfull research model projects Concept for Successful diagnosis, prognosis, preventive, Curative, therapeutic Prötöcöls,\n\nActual Ultimate Best Successful Powerful Tools to Know Cellular Death of Bio-Photonic, Bio-Reasonanz Cosmo Energetic oscillator waves based on Scientific Optikal Physics Death Declaration for incurable Diseases where ever any other therapies had have been Failed or Collapsed...\n\nInstead of Shallow Allopathic "No pulse", Death Declaration Fraudualant Prötöcöls`,
    charge: "₹ 7,000/- per image (5 images = ₹ 35,000/-)",
    color: "#FF6B6B",
  },
  {
    num: "3️⃣",
    title: "Cellular Bio-Photonic, Bio-Reasonanz Vitamins + Minerals Scanning",
    desc: `Why Body is Unable to Develop Multi-Vitamins + Multi-Minerals due to Unknown Hiddén Chängés Patterns in Cellular Bio-Photonic, Bio-Reasonanz Cosmo Energetic Oscillator Waves 🌊\n\nIntegrative Medical Correlation through Space Medicine's Quantum Physics extremely high Resonanz medical Pulsed laser Äcüpünctüré Bioreasonanz more than 40 vitamins Minerals by Photonic Waves Cellular Mitochondrial's Diagnosis Scanning`,
    charge: "₹ 15,000/-",
    color: "#4ADE80",
  },
  {
    num: "4️⃣",
    title: "Cellular Bio-Photonic, Bio-Reasonanz Laser Acupuncture Therapy",
    desc: `Various Europeans Models Hot ♨️ / Cold ❄️ Extremely High Power, WITHOUT ANY SIDE EFFECTS, High Performance Laser Acupuncture therapies either Continuous or Pulsating Centrifugal, Centripetal, elliptical Natural Forces AutoImmune Photonic Waves 🌊 Frequency, Intensity to Reset/ Recharge/ Repair Bio-Photonic, Bio-Reasonanz Cosmo Energetic oscillator waves Self Generated Power house of Natural Forces AutoImmune Cellular Mitochondrial's DNA mRNA decoding Waves 🌊, almost Instantly, Ultimate Best Successful Powerful Bléssings of Gölden Göd Lörd Shivä's & Göddéss Pärväthi's Hiddén. Ömkärèshwér Ärdhnärishwär Càvé's Bäläncér Lifestyle's Gränth's Prötöcöls Providers`,
    charge: "₹ 15,000/- per day (approx. 1½ hours or more treatment)",
    color: "#60A5FA",
  },
  {
    num: "5️⃣",
    title:
      "100% Pure Äyürvédic Tibétän Original Traditional Concept Nätüräl Hérbäl Powder",
    desc: `Bioreasonanz Cosmo Energetic Scientific Vedantic Space Medicine's 100% tested by European Union's Bioreasonanz Cosmo Energetic Oscillator non-invasive Tibétän Äyürvédic Bhasma, Homeopathic, Hérbäl etc Medicament testing device, made by Nobel Prize Winners late German Dr voll's Eav's Actual Brain State, Galvanic Temperature, Cellular Oxygen, Dryness, Hotness ♨️🔥, Wind 🍃, Coldness ❄️ etc Parameters, Skin conductivity scanning, without any side effects, 100% Gold drops Natural Abstract, boiled at Tibétän Trivendrum factory, at more than 300 degree temperature, steam & then to powder, with strictly under special guidelines, from Plant based powder, more than 300 Integrative well balanced combinations.\n\nSpecific individual's Symptoms 100% Göld, Silver, etc Bioreasonanz Powder with 300 other Integrative medicines Formula's Combinations, Quantity 100gms\n\nYou can use strictly with Honey, Butter Cow medicated ghee only upto or more than 1 Month`,
    charge: "₹ 10,000/-",
    color: "#F59E0B",
  },
  {
    num: "6️⃣",
    title: "Russian GDV Camera Scanning",
    desc: `Russian Federation Space Medicine's Scientific Vedantic Yogic Äyürvédic Tibétän Successful Health for Successful Diagnosis, Prognosis, Preventive, Curative, therapeutic Prötöcöls for incurable Diseases where ever any other therapies had have been failed or Collapsed by using HeNe GaAlAr Laser Acupuncture Gas Discharge Visualization for whole body, Mind, Soul, ENT, Efferent Afferent CNS, brain, bone & much more details having more than 3500 parameters Optical Physics Quantum technology Finger Print Scanning...`,
    charge: "₹ 5,50,000/-",
    color: "#C084FC",
  },
];

export default function Contact() {
  const [expanded, setExpanded] = useState<number | null>(null);

  function toggle(i: number) {
    setExpanded((prev) => (prev === i ? null : i));
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Contact & Consultation
        </h1>
        <p className="text-sm mt-1" style={{ color: "#C8862A" }}>
          Dr. Ravindra Jayant — Bio-Photonic Space Medicine Specialist
        </p>
      </div>

      {/* Contact Section */}
      <div
        className="rounded-xl border border-border p-6 space-y-5"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <h2 className="text-base font-semibold text-white uppercase tracking-wider">
          Contact Dr. Ravindra Jayant for Consultation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <a
            href="mailto:dr_ravindra99@rediffmail.com"
            className="flex items-center gap-3 px-5 py-4 rounded-lg border border-border hover:border-yellow-500 transition-colors group"
            style={{ backgroundColor: "#111", textDecoration: "none" }}
          >
            <Mail size={22} style={{ color: "#FF69B4", flexShrink: 0 }} />
            <div>
              <div className="text-xs text-gray-400 mb-0.5">Email</div>
              <div
                className="text-sm font-semibold group-hover:underline"
                style={{ color: "#FF69B4" }}
              >
                dr_ravindra99@rediffmail.com
              </div>
            </div>
          </a>

          {/* WhatsApp 1 */}
          <a
            href="https://wa.me/919825135559"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-4 rounded-lg border border-border hover:border-green-500 transition-colors group"
            style={{ backgroundColor: "#111", textDecoration: "none" }}
          >
            <MessageCircle
              size={22}
              style={{ color: "#25D366", flexShrink: 0 }}
            />
            <div>
              <div className="text-xs text-gray-400 mb-0.5">WhatsApp</div>
              <div className="text-sm font-semibold text-white group-hover:text-green-400">
                00 91 98251 35559
              </div>
            </div>
          </a>

          {/* WhatsApp 2 */}
          <a
            href="https://wa.me/918735943559"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-4 rounded-lg border border-border hover:border-green-500 transition-colors group"
            style={{ backgroundColor: "#111", textDecoration: "none" }}
          >
            <Phone size={22} style={{ color: "#25D366", flexShrink: 0 }} />
            <div>
              <div className="text-xs text-gray-400 mb-0.5">WhatsApp (Alt)</div>
              <div className="text-sm font-semibold text-white group-hover:text-green-400">
                00 91 87359 43559
              </div>
            </div>
          </a>

          {/* OTP message note */}
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-lg border border-border"
            style={{ backgroundColor: "#111" }}
          >
            <MessageCircle
              size={22}
              style={{ color: "#C8862A", flexShrink: 0 }}
            />
            <div>
              <div className="text-xs text-gray-400 mb-0.5">
                Verified OTP Message
              </div>
              <div className="text-sm text-gray-300">
                Send message via WhatsApp with OTP verification for secure
                communication
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div
        className="rounded-xl border border-border p-6 space-y-5"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <h2 className="text-base font-semibold text-white uppercase tracking-wider">
          Pay 100% Advance Consultation Charge
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Google Pay */}
          <a
            href="upi://pay?pa=9825135559.etb@icici&pn=DrRavindraJayant&cu=INR"
            className="flex items-center gap-3 px-5 py-4 rounded-lg border border-border hover:border-yellow-400 transition-colors group"
            style={{ backgroundColor: "#111", textDecoration: "none" }}
          >
            <span style={{ fontSize: 22, flexShrink: 0 }}>G</span>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">
                Google Pay / UPI
              </div>
              <div className="text-sm font-semibold text-yellow-400">
                Open Google Pay
              </div>
            </div>
          </a>

          {/* PayPal placeholder */}
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-lg border border-border"
            style={{ backgroundColor: "#111" }}
          >
            <CreditCard size={22} style={{ color: "#009CDE", flexShrink: 0 }} />
            <div>
              <div className="text-xs text-gray-400 mb-0.5">PayPal</div>
              <div className="text-sm text-gray-300">
                Contact Dr. Ravindra for PayPal details
              </div>
            </div>
          </div>

          {/* UPI ID */}
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-lg border sm:col-span-2"
            style={{ backgroundColor: "#111", borderColor: "#C8862A" }}
          >
            <QrCode size={22} style={{ color: "#C8862A", flexShrink: 0 }} />
            <div>
              <div className="text-xs text-gray-400 mb-1">
                UPI ID / Scan QR Code
              </div>
              <div className="text-base font-bold" style={{ color: "#FFD700" }}>
                9825135559.etb@icici
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Use any UPI app: Google Pay, PhonePe, Paytm, BHIM, etc. — Scan
                QR code in your UPI app
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis Section */}
      <div className="space-y-4">
        <div
          className="rounded-xl border border-border p-5"
          style={{ backgroundColor: "#1A1A1A" }}
        >
          <h2 className="text-base font-semibold text-white uppercase tracking-wider mb-1">
            🔬 Diagnosis Services
          </h2>
          <p className="text-sm text-gray-400">
            Select from the following Diagnosis options. Each requires 100%
            advance payment.
          </p>
        </div>

        {DIAGNOSIS_OPTIONS.map((opt, i) => (
          <div
            key={opt.num}
            className="rounded-xl border border-border overflow-hidden"
            style={{ backgroundColor: "#1A1A1A" }}
          >
            {/* Header row */}
            <button
              type="button"
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
              onClick={() => toggle(i)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-lg flex-shrink-0">{opt.num}</span>
                <span
                  className="text-sm font-semibold leading-snug"
                  style={{ color: opt.color }}
                >
                  {opt.title}
                </span>
              </div>
              <div className="flex items-center gap-4 ml-3 flex-shrink-0">
                <span
                  className="text-sm font-bold hidden sm:block"
                  style={{ color: "#FFD700" }}
                >
                  {opt.charge}
                </span>
                {expanded === i ? (
                  <ChevronUp size={18} className="text-gray-400" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400" />
                )}
              </div>
            </button>

            {/* Expanded content */}
            {expanded === i && (
              <div className="px-5 pb-5 space-y-4 border-t border-border">
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line mt-4">
                  {opt.desc}
                </p>

                {/* Charge + payment */}
                <div
                  className="rounded-lg p-4 border"
                  style={{ backgroundColor: "#0D0D0D", borderColor: opt.color }}
                >
                  <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                    Charges
                  </div>
                  <div
                    className="text-xl font-bold mb-3"
                    style={{ color: "#FFD700" }}
                  >
                    {opt.charge}
                  </div>
                  <div className="text-xs text-gray-300 mb-3 font-semibold uppercase">
                    Pay 100% Advance via:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="upi://pay?pa=9825135559.etb@icici&pn=DrRavindraJayant&cu=INR"
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-black hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#4ADE80" }}
                    >
                      Google Pay / UPI
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText("9825135559.etb@icici");
                        alert("UPI ID copied: 9825135559.etb@icici");
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#C8862A", color: "#fff" }}
                    >
                      📋 Copy UPI ID
                    </button>
                    <a
                      href="https://wa.me/919825135559"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      WhatsApp to Confirm
                    </a>
                  </div>
                  <div className="mt-3 text-xs" style={{ color: "#FFD700" }}>
                    UPI ID: 9825135559.etb@icici
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
