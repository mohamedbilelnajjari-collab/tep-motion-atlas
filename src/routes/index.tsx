import { createFileRoute } from '@tanstack/react-router';
import { Deck } from '@/components/presentation/Deck';
import { boundSlide } from '@/data/slides';

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({slide: boundSlide((Number(search['slide']) || 1)-1)+1}),
  head: () => ({meta: [
    {title:'La TEP — De la désintégration radioactive à l’image'},
    {name:'description',content:'Présentation interactive en français : principes physiques, radiotraceurs et appareil de tomographie par émission de positons.'},
    {property:'og:title',content:'La TEP — L’invisible révélé'},
    {property:'og:description',content:'Un parcours scientifique animé, de la désintégration radioactive à l’image médicale.'},
    {property:'og:type',content:'website'},
    {name:'twitter:card',content:'summary_large_image'},
  ]}),
  component: Index,
});
function Index() {const {slide}=Route.useSearch();return <Deck index={slide-1}/>;}
