import { describe, expect, it } from 'vitest';
import { boundSlide, isotopeRows, sections, slides } from './slides';
describe('TEP presentation rules',()=>{
 it('contains every requested slide and three section transitions',()=>{expect(slides).toHaveLength(21);expect(slides.filter(s=>s.kind==='section')).toHaveLength(3);});
 it('preserves the requested half-lives in minutes',()=>{expect(isotopeRows.map(r=>[r.name,r.minutes])).toEqual([['¹⁸F',110],['¹¹C',20],['¹⁵O',2],['⁶⁸Ga',68]]);});
 it('keeps previous and next navigation inside the deck',()=>{expect(boundSlide(-1)).toBe(0);expect(boundSlide(21)).toBe(20);expect(boundSlide(7)).toBe(7);});
 it('links each agenda entry to its matching section',()=>{for(const s of sections){expect(slides[s.index].kind).toBe('section');expect(slides[s.index].section).toBe(Number(s.number));}});
});
