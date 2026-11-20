// Idealized teaching models; distances and playback times are not physical scales.
export function remainingActivity(minutes: number, halfLife: number) {
  return 100 * Math.pow(2, -Math.max(0, minutes) / halfLife);
}
export function scatteredEnergy(angleDegrees: number) {
  return 511 / (2 - Math.cos((angleDegrees * Math.PI) / 180));
}