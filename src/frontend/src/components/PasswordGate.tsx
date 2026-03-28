import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface PasswordGateProps {
  onUnlock: () => void;
}

const BRILLIANT_PINK = "#FF3EAC";

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "omkar1234") {
      setAccepted(true);
      setTimeout(() => onUnlock(), 1800);
    } else {
      setError("Incorrect password, please try again");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0c14] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-violet-900/15 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl px-6 py-10"
      >
        {/* Logos */}
        <div className="flex flex-col items-center gap-5 mb-8">
          <div className="flex gap-1 items-center justify-center flex-wrap">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm p-1">
              <img
                src="/assets/uploads/screenshot_20260327_104232-019d2efb-db1f-72a1-bf3d-17fb01c9a149-1.jpg"
                alt="Omkareshwar Laser & Acupuncture"
                className="w-36 h-36 object-contain rounded-xl"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm p-1">
              <img
                src="/assets/uploads/screenshot_20260327_022632-019d2efb-e249-7358-81ff-b414dd0cd27e-2.jpg"
                alt="Hidén Ärdhnärishwär"
                className="w-36 h-36 object-contain rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Description block */}
        <div className="bg-black border border-white/10 rounded-2xl px-6 py-6 mb-8 text-center space-y-3 shadow-xl">
          <h1 className="text-xl font-bold text-white tracking-wide leading-snug">
            Globally Synchronized Quantum Wellness
          </h1>
          <p className="text-indigo-300 font-semibold text-base">
            Quantum Bio-Photonic Workstation
          </p>

          <p className="text-yellow-300 font-semibold text-sm">
            🌐 WHO Sponsored Scientist
          </p>

          <div className="text-xs leading-relaxed space-y-1">
            <p className="font-semibold" style={{ color: BRILLIANT_PINK }}>
              MEDICINA ALTERNATIVA INTERNATIONAL — ALMA ATA, USSR
            </p>
            <p style={{ color: BRILLIANT_PINK }}>
              S.I.A. Paris &nbsp;·&nbsp; EMLA &nbsp;·&nbsp; LLLT &nbsp;·&nbsp;
              HLLT
            </p>
            <p style={{ color: BRILLIANT_PINK }}>
              European Union's Bioreasonanz Cosmo Energetic Oscillator Waves
            </p>
            <p style={{ color: BRILLIANT_PINK }}>
              Relationship Bäläncér Prötöcöls Developer
            </p>
          </div>

          <div className="border-t border-white/10 pt-3 text-xs leading-relaxed space-y-1">
            <p style={{ color: BRILLIANT_PINK }}>
              Hidden Okareshwar ArdhNarishwar Bio-Photonic, Bio-Reasonanz Cosmo
              Energetic Oscillator Waves
            </p>
            <p style={{ color: BRILLIANT_PINK }}>
              Space Medicine's Scientific Vedantic Yogic Ayurvedic Tibetan
              Herbal Homeopathic Reformatted
            </p>
            <p style={{ color: BRILLIANT_PINK }}>
              Hardly 10% usage of Allopathic Medicine's for Successful
              Diagnosis, Prognosis, Preventive, Curative, Medikamente Testen —
              to know in advance before intake any Medicine's effects &amp; side
              effects, therapeutic protocols for incurable Diseases where ever
              any other therapies had been failed or Collapsed....
            </p>
          </div>

          <p className="text-green-400 font-bold text-sm tracking-wide uppercase">
            SEA &amp; OBSERVE THE RESULTS WITHIN 4 DAYS
          </p>

          <div className="border-t border-white/10 pt-3 text-white/60 text-xs space-y-1">
            <p className="text-white/80 font-semibold">
              Contact Dr. Ravindra Jayant
            </p>
            <p>
              <a
                href="mailto:dr_ravindra99@rediffmail.com"
                style={{ color: BRILLIANT_PINK }}
                className="hover:opacity-80 underline"
              >
                dr_ravindra99@rediffmail.com
              </a>
            </p>
            <p>
              WhatsApp:{" "}
              <a
                href="https://wa.me/919825135559"
                className="text-green-400 hover:text-green-300"
                target="_blank"
                rel="noreferrer"
              >
                00 91 98251 35559
              </a>{" "}
              &amp;{" "}
              <a
                href="https://wa.me/918735943559"
                className="text-green-400 hover:text-green-300"
                target="_blank"
                rel="noreferrer"
              >
                00 91 87359 43559
              </a>
            </p>
          </div>
        </div>

        {/* Lock card */}
        <motion.form
          onSubmit={handleSubmit}
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
          data-ocid="password_gate.panel"
        >
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <svg
                role="img"
                aria-label="Lock"
                className="w-7 h-7 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Lock</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-center text-white font-semibold text-lg mb-1">
            Enter Access Password
          </h2>
          <p className="text-center text-white/40 text-sm mb-6">
            Enter your password to continue
          </p>

          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:border-indigo-500 focus:ring-indigo-500/20 h-11"
              autoFocus
              data-ocid="password_gate.input"
            />

            <AnimatePresence mode="wait">
              {accepted ? (
                <motion.p
                  key="accepted"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center font-semibold"
                  data-ocid="password_gate.accepted_state"
                >
                  ✅ Password Accepted — Welcome, Dr. Ravindra!
                </motion.p>
              ) : error ? (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                  data-ocid="password_gate.error_state"
                >
                  {error}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={accepted}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold tracking-wide transition-all duration-200"
              data-ocid="password_gate.submit_button"
            >
              {accepted ? "Opening..." : "Enter"}
            </Button>
          </div>
        </motion.form>

        <p className="text-center text-white/20 text-xs mt-8">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="underline hover:text-white/40 transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
