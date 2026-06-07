"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import FAQJsonLd from "@/components/FAQJsonLd";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-title"
      className="w-full bg-white"
    >
      <FAQJsonLd />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2
            id="faq-title"
            className="text-2xl sm:text-3xl font-bold text-zinc-900"
          >
            Preguntas frecuentes
          </h2>
          <p className="text-zinc-500 mt-2 text-sm sm:text-base">
            Todo lo que necesitás saber antes de hacer tu pedido.
          </p>
        </div>

        <ul className="divide-y divide-zinc-100 border-y border-zinc-100">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={f.question}>
                <details
                  open={isOpen}
                  onToggle={(e) => {
                    if ((e.target as HTMLDetailsElement).open) setOpenIdx(i);
                    else if (openIdx === i) setOpenIdx(null);
                  }}
                  className="group"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer py-4 sm:py-5 list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
                      {f.question}
                    </h3>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-4 sm:pb-5 pr-10">
                    <p className="text-sm text-zinc-600 leading-relaxed">
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
