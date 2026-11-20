import { Button } from "@/components/ui/button";
import { slides } from "@/data/slides";
export function Progress({ index, onGo }: { index: number; onGo: (n: number) => void }) {
  return (
    <div className="deck-progress" aria-label="Progression de la présentation">
      {slides.map((s, i) => (
        <Button
          key={s.id}
          variant="ghost"
          aria-label={`Diapositive ${i + 1} : ${s.title}`}
          title={s.title}
          className={`progress-segment ${i === index ? "is-current" : i < index ? "is-complete" : ""}`}
          onClick={() => onGo(i)}
        />
      ))}
    </div>
  );
}
