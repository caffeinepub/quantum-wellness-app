import { useEffect, useRef, useState } from "react";

export default function AmbientMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);

  const TONES = [
    { freq: 432, vol: 0.025 },
    { freq: 648, vol: 0.015 },
    { freq: 216, vol: 0.012 },
    { freq: 528, vol: 0.01 },
    { freq: 396, vol: 0.008 },
  ];

  function startAudio() {
    if (audioCtxRef.current) return;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const nodes: { osc: OscillatorNode; gain: GainNode }[] = [];
    for (const tone of TONES) {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(tone.freq, ctx.currentTime);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(tone.vol, ctx.currentTime + 3);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();

      nodes.push({ osc, gain: gainNode });
    }
    nodesRef.current = nodes;
    setIsPlaying(true);
    setStarted(true);
  }

  function resumeAudio() {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    ctx.resume();
    for (const { gain } of nodesRef.current) {
      gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 1.5);
    }
    setIsPlaying(true);
  }

  function pauseAudio() {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    for (const { gain } of nodesRef.current) {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    }
    setTimeout(() => ctx.suspend(), 1600);
    setIsPlaying(false);
  }

  function toggle() {
    if (!started) {
      startAudio();
    } else if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      data-ocid="music.toggle"
      title={isPlaying ? "Pause calm music" : "Play calm music"}
      style={{
        position: "fixed",
        bottom: "1.25rem",
        left: "1.25rem",
        zIndex: 9999,
        backgroundColor: isPlaying ? "#2a1a00" : "#111",
        color: isPlaying ? "#FFD700" : "#aaa",
        border: `1px solid ${isPlaying ? "#C8862A" : "#444"}`,
        borderRadius: "999px",
        padding: "0.4rem 0.85rem",
        fontSize: "0.75rem",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: isPlaying ? "0 0 8px #C8862A55" : "none",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "0.3rem",
        letterSpacing: "0.02em",
      }}
    >
      <span style={{ fontSize: "1rem" }}>🎵</span>
      {isPlaying ? "Calm Music ON" : "Calm Music OFF"}
    </button>
  );
}
