"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Accessibility,
  Component as ComponentsIcon,
  Gauge,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Pillar = {
  icon: LucideIcon;
  title: string;
  text: string;
  tags: string;
};

const pillars: Pillar[] = [
  {
    icon: ComponentsIcon,
    title: "Built for change",
    text: "Reusable components, clear TypeScript contracts, and just enough abstraction. Code that the next person can comfortably work with.",
    tags: "Components / Systems / Type safety",
  },
  {
    icon: Accessibility,
    title: "Made for people",
    text: "Semantic HTML, sensible focus states, and keyboard-first interactions. Accessibility belongs in the first commit, not the last ticket.",
    tags: "WCAG / Responsive UI / Interaction",
  },
  {
    icon: Gauge,
    title: "Fast by intention",
    text: "Measure first, then improve. Thoughtful loading states, lean bundles, and caching around the data that people actually depend on.",
    tags: "Web vitals / Caching / Resilience",
  },
];

const tools = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "TanStack Query",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "Solidity",
  "wagmi",
  "viem",
  "GitHub Actions",
  "nginx",
  "Figma",
];

export default function HowIBuild() {
  const container = useRef<HTMLElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".hb-fade, .hb-line, .hb-pillar, .hb-icon, .hb-tag, .hb-chip",
          { autoAlpha: 1 },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hb-fade", { autoAlpha: 0, y: 20 });
        gsap.set(".hb-line", { yPercent: 110, autoAlpha: 1 });
        gsap.set(".hb-rule", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".hb-pillar", { autoAlpha: 0, y: 28 });
        gsap.set(".hb-icon", { autoAlpha: 0, scale: 0.5, rotate: -30 });
        gsap.set(".hb-tag", { autoAlpha: 0, y: 10 });
        gsap.set(".hb-chip", { autoAlpha: 0, y: 14, scale: 0.94 });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: container.current,
              start: "top 65%",
              once: true,
            },
          })
          .to(".hb-label", { autoAlpha: 1, y: 0, duration: 0.7 })
          .to(
            ".hb-line",
            { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out" },
            "-=0.4",
          )
          .to(
            ".hb-intro",
            { autoAlpha: 1, y: 0, duration: 0.8 },
            "-=0.6",
          )
          .to(
            ".hb-rule-top",
            { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
            "-=0.6",
          );

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 80%",
              once: true,
            },
          })
          .to(".hb-pillar", {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
          })
          .to(
            ".hb-icon",
            {
              autoAlpha: 1,
              scale: 1,
              rotate: 0,
              duration: 0.9,
              stagger: 0.14,
              ease: "back.out(1.8)",
            },
            "<0.1",
          )
          .to(
            ".hb-tag",
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 },
            "-=0.6",
          )
          .to(
            ".hb-rule-bottom",
            { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
            "-=0.6",
          )
          .to(
            ".hb-tools-label",
            { autoAlpha: 1, y: 0, duration: 0.7 },
            "-=0.6",
          )
          .to(
            ".hb-chip",
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: { each: 0.045, from: "start" },
              ease: "back.out(1.6)",
            },
            "-=0.5",
          );
      });

      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="how-i-build"
      className="bg-[#1F2220] px-6 py-20 text-[#F7F5F2] md:px-20 md:py-32"
    >
      <p className="hb-fade hb-label invisible font-mono text-[10px] uppercase tracking-widest md:text-xs">
        <span className="text-[#C47A55]">02</span>
        <span className="ml-4 text-[#F7F5F2]/70">How I build</span>
      </p>

      <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end md:gap-10">
        <h2 className="text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:col-span-8 lg:text-7xl lg:leading-[1.05]">
          <span className="block overflow-hidden pb-2">
            <span className="hb-line invisible block">Good UI goes deeper</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="hb-line invisible block">than the pixels.</span>
          </span>
        </h2>
        <p className="hb-fade hb-intro invisible text-base leading-relaxed text-[#F7F5F2]/60 md:col-span-4 md:pb-3 md:text-lg lg:col-span-3 lg:col-start-10">
          The part you see matters. So does the structure, speed, and care
          underneath it. I like working on both.
        </p>
      </div>

      <div className="hb-rule hb-rule-top mt-12 h-px w-full bg-[#F7F5F2]/10 md:mt-16" />

      <div ref={pillarsRef}>
        <div className="grid md:grid-cols-3 md:gap-10 lg:gap-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="hb-pillar group invisible border-t border-[#F7F5F2]/10 py-8 first:border-t-0 md:border-t-0 md:py-14"
              >
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-8">
                  <span className="hb-icon invisible inline-flex text-[#C47A55]">
                    <Icon
                      strokeWidth={1.25}
                      className="h-5 w-5 transition-transform duration-500 ease-out group-hover:rotate-14d md:h-8 md:w-8"
                    />
                  </span>
                  <h3 className="text-xl font-medium tracking-tight md:text-3xl">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#F7F5F2]/60 md:mt-6 md:text-lg">
                  {pillar.text}
                </p>
                <p className="hb-tag invisible mt-4 font-mono text-[10px] uppercase tracking-widest text-[#F7F5F2]/60 md:mt-6 md:text-xs">
                  {pillar.tags}
                </p>
              </div>
            );
          })}
        </div>

        <div className="hb-rule hb-rule-bottom h-px w-full bg-[#F7F5F2]/10" />

        <div className="flex flex-col gap-5 pt-8 md:flex-row md:items-center md:justify-between md:gap-10 md:pt-12">
          <p className="hb-fade hb-tools-label invisible shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#F7F5F2]/70 md:text-xs">
            Tools I reach for
          </p>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {tools.map((tool) => (
              <span
                key={tool}
                className="hb-chip invisible border border-[#F7F5F2]/15 px-3 py-1.5 font-mono text-[10px] text-[#F7F5F2]/70 transition-colors duration-300 hover:border-[#C47A55] hover:text-[#F7F5F2] md:text-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}