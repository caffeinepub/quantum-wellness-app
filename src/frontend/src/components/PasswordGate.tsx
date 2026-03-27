import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useState } from "react";

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "omkar1234") {
      onUnlock();
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
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logos */}
        <div className="flex flex-col items-center gap-5 mb-10">
          <div className="flex gap-6 items-center justify-center flex-wrap">
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
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Quantum Wellness
            </h1>
            <p className="text-indigo-300/70 text-sm mt-1">
              Bio-Photonic Healing Platform
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
            Protected Access
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

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
                data-ocid="password_gate.error_state"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold tracking-wide transition-all duration-200"
              data-ocid="password_gate.submit_button"
            >
              Unlock
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
