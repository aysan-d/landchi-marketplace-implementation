const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Converts latin digits inside any string to Persian digits. */
export function toFa(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

/** 1234567 -> "۱,۲۳۴,۵۶۷" */
export function faNumber(value: number): string {
  return toFa(Math.round(value).toLocaleString("en-US"));
}

/** Final price after a percentage discount. */
export function finalPrice(price: number, discountPercent: number): number {
  return Math.round(price * (1 - (discountPercent || 0) / 100));
}

export function faPercent(value: number): string {
  return `${toFa(value)}٪`;
}

const FA_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

/** Formats an ISO date using the Persian (Jalali) calendar. */
export function faDate(iso: string | Date): string {
  const date = typeof iso === "string" ? new Date(iso) : iso;
  const parts = new Intl.DateTimeFormat("en-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const month = FA_MONTHS[Math.max(0, get("month") - 1)] ?? "";
  return `${toFa(get("day"))} ${month} ${toFa(get("year"))}`;
}
