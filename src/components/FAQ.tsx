"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import FAQJsonLd from "@/components/FAQJsonLd";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-title" className="w-full bg-cream">
      <FAQJsonLd />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
            <span className="h-px w-8 bg-oxblood" />
            Preguntas frecuentes
            <span className="h-px w-8 bg-oxblood" />
          </span>
          <h2
            id="faq-title"
            className="font-display text-4xl sm:text-5xl font-extrabold text-ink mt-4 leading-tight"
          >
            Todo lo que <span className="text-oxblood">te preguntás</span>
          </h2>
          <p className="text-ink-soft mt-4 text-base sm:text-lg max-w-xl mx-auto">
            Antes de hacer tu pedido, lo que necesitás saber.
          </p>
        </div>

        <ul className="border-y border-ink/15">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={f.question} className="border-b border-ink/15 last:border-b-0">
                <details
                  open={isOpen}
                  onToggle={(e) => {
                    if ((e.target as HTMLDetailsElement).open) setOpenIdx(i);
                    else if (openIdx === i) setOpenIdx(null);
                  }}
                  className="group"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer py-5 sm:py-6 list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base sm:text-lg font-semibold text-ink flex items-center gap-3">
                      <span
                        className={`font-mono text-xs ${
                          isOpen ? "text-oxblood" : "text-ink-soft/50"
                        } transition-colors`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{f.question}</span>
                    </h3>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 transition-all ${
                        isOpen
                          ? "bg-ink border-ink text-paper rotate-45"
                          : "border-ink/20 text-ink-soft group-hover:border-ink group-hover:text-ink"
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-6 pr-12 pl-9">
                    <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
