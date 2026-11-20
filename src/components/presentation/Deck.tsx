import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Atom, Check, Grid2X2, Maximize, Minimize, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { boundSlide, sections, slides } from "@/data/slides";
import { ScaledSlide, Slide } from "./Slide";
import { Progress } from "./Progress";
export function Deck({ index }: { index: number }) {
  const navigate = useNavigate();
  const [overview, setOverview] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [direction, setDirection] = useState(1);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const current = slides[index] ?? slides[0];
  const go = useCallback(
    (n: number) => {
      const next = boundSlide(n);
      setDirection(next > index ? 1 : -1);
      void navigate({ to: "/", search: { slide: next + 1 }, replace: true });
      setOverview(false);
    },
    [index, navigate],
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input,textarea,select")) return;
      if (e.key === "Escape") {
        setOverview(false);
        return;
      }
      if (overview) return;
      if (["ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, overview]);
  useEffect(() => {
    if (current) document.title = `${index + 1}/${slides.length} — ${current.title} · TEP`;
  }, [index, current]);
  useEffect(() => {
    const update = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);
  const toggleFull = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setFullscreen(false);
    }
  };
  if (!current) return null;
  return (
    <main className={`deck ${fullscreen ? "is-fullscreen" : ""}`}>
      <div className="network-background" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 36 }, (_, i) => {
            const x = (i * 173 + 51) % 1440,
              y = (i * 109 + 61) % 900;
            return (
              <g key={i}>
                <path d={`M${x} ${y}l120 64 70-110`} />
                <circle cx={x} cy={y} r="2" />
              </g>
            );
          })}
        </svg>
      </div>
      <header className="deck-header">
        <Button
          variant="ghost"
          className="deck-brand"
          onClick={() => go(0)}
          aria-label="Retour au début"
        >
          <span className="brand-icon">
            <Atom />
          </span>
          <span>
            TEP
            <span className="brand-divider" />
            L’INVISIBLE RÉVÉLÉ
          </span>
        </Button>
        <nav className="section-nav" aria-label="Parties">
          {sections.map((s) => (
            <Button
              key={s.number}
              variant="ghost"
              className={
                current.section === Number(s.number) ? "section-link active" : "section-link"
              }
              onClick={() => go(s.index)}
            >
              <span>{s.number}</span>
              {s.title}
            </Button>
          ))}
        </nav>
        <div className="header-actions">
          <Button
            variant="ghost"
            size="icon"
            title="Sommaire"
            aria-label="Ouvrir le sommaire"
            onClick={() => setOverview(true)}
          >
            <Grid2X2 />
          </Button>
          <span className="header-action-divider" />
          <Button
            variant="ghost"
            size="icon"
            title={fullscreen ? "Quitter le plein écran" : "Plein écran"}
            aria-label={fullscreen ? "Quitter le plein écran" : "Plein écran"}
            onClick={toggleFull}
          >
            {fullscreen ? <Minimize /> : <Maximize />}
          </Button>
        </div>
      </header>
      <div
        className="deck-stage"
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (t) touch.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={(e) => {
          const t = e.changedTouches[0],
            start = touch.current;
          if (!t || !start) return;
          const dx = t.clientX - start.x,
            dy = t.clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
          touch.current = null;
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            className="stage-transition"
            initial={{ opacity: 0, x: reduced ? 0 : direction * 24, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: reduced ? 0 : -direction * 24 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScaledSlide>
              <Slide slide={current} onGo={go} />
            </ScaledSlide>
          </motion.div>
        </AnimatePresence>
      </div>
      <footer className="deck-controls">
        <div className="controls-left">
          <span className="live-dot" />
          <span>{current.section ? `PARTIE 0${current.section}` : "INTRODUCTION"}</span>
          <span className="controls-divider" />
          <span className="current-slide-title">
            {current.kind === "cover"
              ? "La TEP : de la désintégration radioactive à l’image"
              : current.title}
          </span>
        </div>
        <div className="controls-right">
          <span className="slide-counter">
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <span>/</span>
            {String(slides.length).padStart(2, "0")}
          </span>
          <Button
            variant="outline"
            size="icon"
            aria-label="Diapositive précédente"
            title="Précédent"
            disabled={index === 0}
            onClick={() => go(index - 1)}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="default"
            className="next-button"
            aria-label="Diapositive suivante"
            disabled={index === slides.length - 1}
            onClick={() => go(index + 1)}
          >
            <span>Suivant</span>
            <ArrowRight />
          </Button>
        </div>
      </footer>
      <Progress index={index} onGo={go} />
      {overview && (
        <div
          className="overview-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Sommaire"
          onClick={() => setOverview(false)}
        >
          <div className="overview-panel" onClick={(e) => e.stopPropagation()}>
            <div className="overview-heading">
              <div>
                <span className="overview-eyebrow">LA TEP · 21 DIAPOSITIVES</span>
                <h2>Le parcours</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fermer le sommaire"
                onClick={() => setOverview(false)}
              >
                <X />
              </Button>
            </div>
            <div className="overview-list">
              {slides.map((s, i) => (
                <Button
                  variant="ghost"
                  key={s.id}
                  className={`overview-item ${index === i ? "selected" : ""}`}
                  onClick={() => go(i)}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{s.title}</span>
                  {index === i ? <Check /> : <ArrowRight />}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
