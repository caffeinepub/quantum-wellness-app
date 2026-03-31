# Quantum Wellness Bio-Photonic Platform

## Current State
NewSession.tsx has: Patient/Date selection, Modalities, Meridian Readings table, Save Session + Diagnosis buttons.
App.tsx wraps everything in a Layout with a PasswordGate.

## Requested Changes (Diff)

### Add
- Ambient music player component (Web Audio API generating calming 432Hz/528Hz binaural tones) — plays on app start, toggle on/off button visible in layout or top-right corner. Named after the spirit of Mystique Süleyman & XiaoYue calming music.
- In NewSession.tsx, just BELOW the Save Session + Diagnosis buttons, add two reference sheets:
  - **Sheet 1**: Title "Ärdhnärishwär Bäläncér Sämhitä Gränth's Prötöcöls" — a wide scrollable reference table with columns: Ärdhnärishwär Bäläncér Sämhitä Gränth's Prötöcöls | Scientific Vedantic... Créàtés 2️⃣ | Quantum Bit Binary Code | Further...Créàtés 8️⃣ | ~There 4 Éléménte... | ~Further, these 4 Bigrams... | Element | 14+ 8 Extraordinary Vessels+8 Chäkräs Relationship | (blank) | Order | Trigram | Moon Phase | Disease Stage | DNA/Ion Logic | Switch | Metabolic State | Extraordinary Vessel | Master Point | Clinical Pathology & Symptoms — 8 data rows (☰ Qián through ☲ Lí) plus separator rows
  - **Sheet 2**: Title "8 Stages Relationship with Lünär/Sölär Spéctrüpm Cölör's Rädiätiön Éffécts Möön_Phases" — table with columns: Stage Name | Diseases Stages | Pathology | Symptoms | Treatment Principle | Bio-Photonic Pts — 6 data rows (TaiYang through JueYin)

### Modify
- App.tsx: integrate ambient music player so it starts on unlock

### Remove
- Nothing removed

## Implementation Plan
1. Create AmbientMusicPlayer component using Web Audio API (oscillators at calming frequencies, soft volume, toggle button)
2. Add AmbientMusicPlayer to App.tsx after PasswordGate unlock
3. Add Sheet1 (Trigram/Protocol table) and Sheet2 (8 Stages table) at bottom of NewSession.tsx, below the action buttons
4. Both tables are horizontally scrollable with golden/amber headers on dark background matching existing style
