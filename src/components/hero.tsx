"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowTopRightIcon,
} from "@radix-ui/react-icons";

type HeroProps = {
  delay?: number;
};

export default function Hero({ delay = 3.9 }: HeroProps) {
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-line, .hero-fade, .hero-brace, .hero-rule", {
          autoAlpha: 1,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-line", { yPercent: 110, autoAlpha: 1 });
        gsap.set(".hero-fade", { autoAlpha: 0, y: 24 });
        gsap.set(".hero-brace", { autoAlpha: 0, y: 40, scale: 0.9 });
        gsap.set(".hero-rule", {
          autoAlpha: 1,
          scaleX: 0,
          transformOrigin: "left center",
        });

        const tl = gsap.timeline({
          delay,
          defaults: { ease: "power3.out" },
        });

        tl.to(".hero-meta", {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
        })
          .to(
            ".hero-line",
            {
              yPercent: 0,
              duration: 1.1,
              stagger: 0.15,
              ease: "power4.out",
            },
            "-=0.5"
          )
          .to(
            ".hero-brace",
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.8"
          )
          .to(
            ".hero-body",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
            },
            "-=0.7"
          )
          .to(
            ".hero-rule",
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power3.inOut",
            },
            "-=0.5"
          )
          .to(
            ".hero-foot",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
            },
            "-=0.8"
          );

        gsap.to(".hero-brace", {
          y: -10,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: delay + 2.5,
        });
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [delay] }
  );

  return (
    <section
      ref={container}
      id="top"
      className="bg-[#F7F5F2] px-6 pb-10 pt-10 text-[#1E1E1E] md:px-20 md:pb-12 md:pt-12"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#1E1E1E]/60 md:text-xs">
        <p className="hero-fade hero-meta invisible">Frontend engineer</p>
        <p className="hero-fade hero-meta invisible flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B4A2F]" />
          Open to the right opportunity
        </p>
      </div>

      <h1 className="mt-14 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl xl:text-[8.5rem] md:mt-20">
        <span className="block overflow-hidden pb-[0.08em]">
          <span className="hero-line invisible block">
            Thoughtful interfaces.
          </span>
        </span>
        <span className="flex items-end justify-between text-[#8B4A2F]">
          <span className="overflow-hidden pb-[0.08em]">
            <span className="hero-line invisible block">Solid foundations.</span>
          </span>
          <span
            aria-hidden="true"
            className="hero-brace invisible hidden gap-6 pb-4 font-mono text-6xl font-light leading-none md:flex lg:text-8xl"
          >
            <span>{"{"}</span>
            <span>{"}"}</span>
          </span>
        </span>
      </h1>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
        <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1E1E1E]/60 md:col-span-4 md:text-xs">
          <p className="hero-fade hero-body invisible">A little design-minded.</p>
          <p className="hero-fade hero-body invisible">A lot detail-oriented.</p>
        </div>

        <div className="md:col-span-6 md:col-start-5">
          <p className="hero-fade hero-body invisible max-w-xl text-xl leading-snug md:text-2xl">
            I turn complex product ideas into clear, accessible web experiences.
            Four years building with React, TypeScript, and a healthy attention
            to the details.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="hero-fade hero-body group invisible inline-flex items-center gap-8 bg-[#8B4A2F] px-5 py-3.5 text-sm font-medium text-[#F7F5F2] transition-colors hover:bg-[#6F3A24]"
            >
              Explore selected work
              <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-fade hero-body group invisible inline-flex items-center gap-8 border border-[#1E1E1E]/15 px-5 py-3.5 text-sm font-medium transition-colors hover:border-[#1E1E1E]/40"
            >
              Résumé
              <ArrowTopRightIcon className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <div className="hero-rule invisible h-px w-full bg-[#1E1E1E]/10" />
        <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#1E1E1E]/60 md:text-xs">
          <p className="hero-fade hero-foot invisible">
            Less friction. More intention.
          </p>
          <a
            href="#work"
            className="hero-fade hero-foot invisible inline-flex items-center gap-2"
          >
            Selected work below
            <ArrowDownIcon />
          </a>
        </div>
      </div>
    </section>
  );
}