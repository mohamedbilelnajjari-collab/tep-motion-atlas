import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isotopeRows } from "@/data/slides";
import { remainingActivity, scatteredEnergy } from "@/data/physics";

export function useDemoTimeline(duration = 6) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const [progress, setProgress] = useState(reduced ? 0.8 : 0);
  const [speed, setSpeed] = useState(1);
  useEffect(() => { if (reduced) setPlaying(false); }, [reduced]);
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(now - previous, 80) / (duration * 1000);
      previous = now;
      setProgress(p => (p + delta * speed) % 1);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, duration, speed]);
  return { progress, playing, speed, setSpeed, toggle: () => setPlaying(p => !p),
    restart: () => setProgress(0), step: () => { setPlaying(false); setProgress(p => Math.min(0.99, p + 0.2)); } };
}
export function DemoControls({ demo, stages }: { demo: ReturnType<typeof useDemoTimeline>; stages: string[] }) {
  const active = Math.min(stages.length - 1, Math.floor(demo.progress * stages.length));
  return <div className="demo-controls" onTouchStart={e => e.stopPropagation()}>
    <div className="demo-stage-label" aria-live={demo.playing ? "off" : "polite"}><span>{String(active + 1).padStart(2, "0")}</span>{stages[active]}</div>
    <div className="demo-toolbar">
      <Button variant="outline" size="icon" title={demo.playing ? "Pause" : "Lecture"} aria-label={demo.playing ? "Mettre la démonstration en pause" : "Lire la démonstration"} onClick={demo.toggle}>{demo.playing ? <Pause /> : <Play />}</Button>
      <Button variant="ghost" size="icon" title="Recommencer" aria-label="Recommencer la démonstration" onClick={demo.restart}><RotateCcw /></Button>
      <Button variant="ghost" size="icon" title="Étape suivante" aria-label="Étape suivante du phénomène" onClick={demo.step}><SkipForward /></Button>
      <select aria-label="Vitesse de la démonstration" value={demo.speed} onChange={e => demo.setSpeed(Number(e.target.value))}><option value={0.5}>× 0,5</option><option value={1}>× 1</option><option value={2}>× 2</option></select>
    </div>
    <div className="demo-phase-track">{stages.map((stage, i) => <span key={stage} className={i <= active ? "active" : ""} />)}</div>
  </div>;
}
export function DecayDemo() {
  const [isotope, setIsotope] = useState(0);
  const [halves, setHalves] = useState(1);
  const row = isotopeRows[isotope] ?? isotopeRows[0];
  const activity = remainingActivity(halves * row.minutes, row.minutes);
  return <div className="decay-demo" onTouchStart={e => e.stopPropagation()}>
    <div className="experiment-heading"><span>DÉCROISSANCE RADIOACTIVE</span><strong>{activity.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} % d’activité restante</strong></div>
    <div className="decay-settings"><select aria-label="Isotope de la démonstration" value={isotope} onChange={e => setIsotope(Number(e.target.value))}>{isotopeRows.map((r, i) => <option key={r.name} value={i}>{r.name}</option>)}</select><label>Temps : {Math.round(halves * row.minutes)} min<input aria-label="Temps en demi-vies" type="range" min="0" max="4" step="0.1" value={halves} onChange={e => setHalves(Number(e.target.value))} /></label><span>N(t) = N₀ · 2⁻ᵗ/ᵀ½</span></div>
    <div className="decay-atoms" aria-hidden="true">{Array.from({ length: 64 }, (_, i) => <span key={i} className={((i * 29) % 64) < activity * 0.64 ? "active" : ""} />)}</div>
  </div>;
}
export function PhysicsInteractions() {
  const demo = useDemoTimeline(5);
  const [angle, setAngle] = useState(60);
  const energy = scatteredEnergy(angle);
  const p = demo.progress;
  const incoming = Math.min(1, p / 0.4);
  const outgoing = Math.max(0, Math.min(1, (p - 0.4) / 0.45));
  const rad = angle * Math.PI / 180;
  return <div className="interaction-experiment">
    <div className="three-columns">
      <article className="science-card"><h3>Effet photoélectrique</h3><svg viewBox="0 0 400 210" role="img" aria-label="Le photon est absorbé et un électron est éjecté"><path d="M30 110H210M210 110L350 35" className="dashed-path" /><circle cx="210" cy="110" r="35" className="atom-halo" />{p < 0.4 && <circle cx={30 + incoming * 180} cy="110" r="10" className="photon" />}{p >= 0.4 && <circle cx={210 + outgoing * 140} cy={110 - outgoing * 75} r="9" className="nucleon-violet" />}<text x="305" y="80" className="label-small">e⁻</text></svg><p>Le photon disparaît.</p><span>Son énergie est transférée à un électron lié. Absorption utile dans le cristal.</span></article>
      <article className="science-card"><h3>Diffusion Compton</h3><svg viewBox="0 0 400 210" role="img" aria-label={`Diffusion du photon à ${angle} degrés`}><path d={`M30 130H190L${190 + 170 * Math.cos(rad)} ${130 - 110 * Math.sin(rad)}`} className="gamma-beam" /><path d="M190 130L335 185" className="dashed-path" /><circle cx="190" cy="130" r="16" className="atom-halo" /><circle cx={p < 0.4 ? 30 + incoming * 160 : 190 + outgoing * 170 * Math.cos(rad)} cy={p < 0.4 ? 130 : 130 - outgoing * 110 * Math.sin(rad)} r="10" className="photon" />{p >= 0.4 && <circle cx={190 + outgoing * 145} cy={130 + outgoing * 55} r="8" className="nucleon-violet" />}</svg><label className="angle-control">Angle θ : {angle}°<input aria-label="Angle de diffusion Compton" type="range" min="0" max="180" value={angle} onChange={e => setAngle(Number(e.target.value))} /></label><p>γ′ : {Math.round(energy)} keV</p><span>Électron : {Math.round(511 - energy)} keV<br />Une direction modifiée fausse la ligne de réponse.</span></article>
      <article className="science-card"><h3>Atténuation</h3><svg viewBox="0 0 400 210" role="img" aria-label="Une partie des photons est absorbée ou diffusée dans le tissu"><rect x="165" y="20" width="85" height="170" className="cyclotron-dee" />{[45, 85, 125, 165].map((y, i) => <g key={y}><path d={`M20 ${y}H380`} className="gamma-trail" />{(p < 0.4 || i % 2 === 0) && <circle cx={20 + Math.min(p / 0.85, 1) * 360} cy={y} r="8" className="photon" />}</g>)}</svg><p>Moins de photons transmis.</p><span>Absorption et diffusion réduisent le signal direct. Une correction est nécessaire.</span></article>
    </div>
    <DemoControls demo={demo} stages={["Photon incident", "Interaction avec la matière", "Transfert d’énergie", "Photons transmis ou déviés"]} />
    <p className="demo-disclaimer">Modèles schématiques · Compton : électron libre initialement au repos · temps et distances non à l’échelle.</p>
  </div>;
}