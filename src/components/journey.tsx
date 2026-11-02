"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type JourneyItem = {
  title: string;
  role?: string;
  period: string;
  details: string[];
  compact?: boolean;
};

const items: JourneyItem[] = [
  {
    title: "BizFlip",
    role: "Lead Frontend Engineer (Contract)",
    period: "Jun 2025 – Present",
    details: [
      "Took the product from an inherited codebase to an investor-ready MVP. Built the wallet, Google and guest authentication, the on-chain transaction layer, and a multi-stage deal pipeline.",
    ],
  },
  {
    title: "Alphablocks Tech",
    role: "Full-Stack Engineer",
    period: "Sep 2023 – Present",
    details: [
      "Built the platform end to end, then split it into separate frontend and backend services. Shipped a Node.js backend, CI/CD deployments, Paystack payments and an NFT-minting feature.",
    ],
  },
  {
    title: "MyEcurrency NG",
    role: "Frontend Engineer",
    period: "Jan 2025 – Dec 2025",
    details: [
      "Maintained core Next.js frontend systems, improved the internal admin dashboard, led the new company website, and built core screens for the mobile app.",
    ],
  },
  {
    title: "BSc Pure and Industrial Chemistry",
    period: "2017 – 2021",
    details: ["University of Nigeria, Nsukka", "Second Class Upper (Honours)"],
    compact: true,
  },
];

export default function Journey() {
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".j-fade, .j-line, .j-row", { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".j-fade", { autoAlpha: 0, y: 20 });
        gsap.set(".j-line", { yPercent: 110, autoAlpha: 1 });
        gsap.set(".j-row", { autoAlpha: 0, y: 24 });
        gsap.set(".j-rule", { scaleX: 0, transformOrigin: "left center" });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: container.current,
              start: "top 70%",
              once: true,
            },
          })
          .to(".j-label", { autoAlpha: 1, y: 0, duration: 0.7 })
          .to(
            ".j-line",
            { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out" },
            "-=0.4",
          )
          .to(".j-link", { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.6");

        gsap.utils.toArray<HTMLElement>(".j-item").forEach((item) => {
          const rule = item.querySelector(".j-rule");
          const row = item.querySelector(".j-row");

          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            })
            .to(rule, { scaleX: 1, duration: 1, ease: "power3.inOut" })
            .to(row, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.7");
        });
      });

      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="journey"
      className="bg-[#F7F5F2] px-6 py-20 text-[#1E1E1E] md:px-20 md:py-32"
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="j-fade j-label invisible font-mono text-[10px] uppercase tracking-widest md:text-xs">
            <span className="text-[#8B4A2F]">03</span>
            <span className="ml-4 text-[#1E1E1E]/70">The journey so far</span>
          </p>

          <h2 className="mt-8 text-4xl font-medium leading-[1.05] tracking-tight md:mt-12 md:text-5xl lg:text-7xl">
            <span className="block overflow-hidden pb-2">
              <span className="j-line invisible block">Learning.</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="j-line invisible block">Building.</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="j-line invisible block">Getting better.</span>
            </span>
          </h2>

          <a
            href="https://docs.google.com/document/d/1GUM19PzVDyRsvzGQn23YzJRLpXGYub9_tihTAhYC-Vg/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="j-fade j-link group invisible mt-8 inline-flex items-center gap-3 text-base text-[#8B4A2F] md:mt-12 md:text-lg"
          >
            View full r&eacute;sum&eacute;
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="md:col-span-8">
          {items.map((item) => (
            <div key={item.title} className="j-item">
              <div className="j-rule h-px w-full bg-[#1E1E1E]/10" />
              <div className="j-row invisible grid gap-5 py-8 md:grid-cols-5 md:gap-10 md:py-10">
                <div className="md:col-span-2">
                  <h3
                    className={
                      item.compact
                        ? "text-xl font-medium tracking-tight md:text-2xl"
                        : "text-2xl font-medium tracking-tight md:text-4xl"
                    }
                  >
                    {item.title}
                  </h3>
                  {item.role && (
                    <p className="mt-2 text-base text-[#1E1E1E]/60 md:text-lg">
                      {item.role}
                    </p>
                  )}
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#1E1E1E]/60 md:text-xs">
                    {item.period}
                  </p>
                </div>
                <div className="space-y-1 text-base leading-relaxed text-[#1E1E1E]/60 md:col-span-3 md:text-xl">
                  {item.details.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
