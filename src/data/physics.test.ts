import { expect, it } from "vitest";
import { remainingActivity, scatteredEnergy } from "./physics";

it("halves fluorine-18 activity after the specified 110 minutes", () => {
  expect(remainingActivity(110, 110)).toBe(50);
  expect(remainingActivity(220, 110)).toBe(25);
});
it("conserves 511 keV between the scattered photon and recoil electron", () => {
  expect(scatteredEnergy(0)).toBe(511);
  expect(scatteredEnergy(90)).toBeCloseTo(255.5);
  expect(scatteredEnergy(180)).toBeCloseTo(511 / 3);
});