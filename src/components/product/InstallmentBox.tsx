import { useState } from "react";
import { faNumber, toFa } from "@/lib/format";

const MONTHS = [3, 6, 9, 12, 18, 24];
const ANNUAL_RATE = 0.23;

export function monthlyInstallment(principal: number, months: number) {
  const total = principal * (1 + (ANNUAL_RATE * months) / 12);
  return { total: Math.round(total), monthly: Math.round(total / months) };
}

export function InstallmentBox({ price }: { price: number }) {
  const [months, setMonths] = useState(12);
  const prepay = Math.round(price * 0.3);
  const { monthly, total } = monthlyInstallment(price - prepay, months);

  return (
    <div className="rounded-lg border border-installment/40 bg-installment-soft p-3">
      <p className="text-[11px] font-bold text-primary">خرید اقساطی</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {MONTHS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMonths(m)}
            className={`num rounded-md px-2 py-1 text-[10px] transition-colors ${
              m === months
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background"
            }`}
          >
            {toFa(m)} ماهه
          </button>
        ))}
      </div>
      <dl className="mt-3 space-y-1 text-[10px]">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">پیش‌پرداخت</dt>
          <dd className="num">{faNumber(prepay)} تومان</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">قسط ماهانه</dt>
          <dd className="num font-bold text-primary">{faNumber(monthly)} تومان</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">مبلغ کل</dt>
          <dd className="num">{faNumber(total + prepay)} تومان</dd>
        </div>
      </dl>
    </div>
  );
}
