export function parseNumberBr(value: string | number | undefined): number {
  if (typeof value === "number") return value;
  if (!value) return 0;
  return Number(value.replace(/\./g, ",").replace(",", "."));
}