"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { AnimatedArrow } from "./animated-arrow";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

export default function Footer() {
  const container = useRef<HTMLElement | null>(null);
  const [year, setYear] = useState<number>();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".reveal, .line-inner, .arrow-wrap", { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".reveal", { autoAlpha: 0, y: 20 });
        gsap.set(".line-inner", { yPercent: 110, autoAlpha: 1 });
        gsap.set(".arrow-wrap", { autoAlpha: 0, scale: 0.6 });
        gsap.set(".rule", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".arrow-draw path", { drawSVG: "0%" });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: container.current,
            start: "top 65%",
            once: true,
          },
        });

        tl.to(".meta-item", {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
        })
          .to(
            ".line-inner",
            {
              yPercent: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power4.out",
            },
            "-=0.4",
          )
          .to(
            ".arrow-wrap",
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.9,
              ease: "back.out(1.6)",
            },
            "-=0.8",
          )
          .to(
            ".arrow-draw path",
            {
              drawSVG: "100%",
              duration: 0.8,
              ease: "power2.inOut",
            },
            "-=0.5",
          )
          .to(
            ".body-item",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
            },
            "-=0.6",
          )
          .to(
            ".rule",
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.inOut",
            },
            "-=0.5",
          )
          .to(
            ".bottom-item",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
            },
            "-=0.7",
          );
      });

      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <footer
      ref={container}
      id="contact"
      className="flex flex-col bg-[#18191B] px-6 pb-10 pt-16 text-[#F7F5F2] md:px-20 md:pb-10 md:pt-24"
    >
      <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest text-[#F7F5F2]/70 md:flex-row md:items-start md:justify-between md:gap-4 md:text-xs">
        <p className="reveal meta-item invisible">05 / What&rsquo;s next?</p>
        <p className="reveal meta-item invisible flex items-center gap-2 md:text-right">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F7F5F2]" />
          Open to frontend engineering roles
        </p>
      </div>

      <div className="mt-12 flex flex-col items-start gap-8 md:mt-28 md:flex-row md:items-end md:justify-between md:gap-6">
        <h2 className="min-w-0 text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-8xl lg:leading-[1.05]">
          <span className="block overflow-hidden pb-2">
            <span className="line-inner invisible block">
              Let&rsquo;s build
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="line-inner invisible block">
              something that matters.
            </span>
          </span>
        </h2>
        <div className="arrow-wrap invisible shrink-0">
          <a
            href="mailto:iamhenryokeke@gmail.com"
            aria-label="Send me an email"
            className="group flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F5F2] text-[#C47A55] transition-transform duration-300 hover:scale-105 active:scale-95 md:h-32 md:w-32 lg:h-44 lg:w-44"
          >
            <AnimatedArrow size={60} className="scale-[0.6] md:scale-100" />
          </a>
        </div>
      </div>

      <p className="reveal body-item invisible mt-12 text-lg text-[#F7F5F2]/80 md:mt-16 md:text-xl">
        Have a role, a project, or a good question? My inbox is open.
      </p>

      <div className="mt-8 flex flex-col gap-10 md:mt-6 md:flex-row md:items-end md:justify-between md:gap-8">
        <a
          href="mailto:iamhenryokeke@gmail.com"
          className="reveal body-item invisible w-fit text-3xl font-medium underline underline-offset-4 md:text-5xl"
        >
          @NmesomaHenry
        </a>
        <div className="flex flex-col gap-6 text-base md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-3 md:text-lg">
          <a
            href="https://github.com/IamHenryOkeke"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal body-item invisible flex items-center justify-between transition-colors hover:text-[#C47A55] md:justify-start md:gap-2"
          >
            <span>GitHub / NmesomaHenry</span>
            <span>&#8599;</span>
          </a>
          <a
            href="https://linkedin.com/in/henry-okeke-nmesomachukwu"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal body-item invisible flex items-center justify-between transition-colors hover:text-[#C47A55] md:justify-start md:gap-2"
          >
            <span>LinkedIn / NmesomaHenry</span>
            <span>&#8599;</span>
          </a>
          <a
            href="https://docs.google.com/document/d/1GUM19PzVDyRsvzGQn23YzJRLpXGYub9_tihTAhYC-Vg/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal body-item invisible flex items-center justify-between transition-colors hover:text-[#C47A55] md:justify-start md:gap-2"
          >
            <span>R&eacute;sum&eacute;</span>
            <span>&#8599;</span>
          </a>
        </div>
      </div>

      <div className="rule mt-12 h-px w-full bg-[#C47A55]/70 md:mt-16" />

      <div className="mt-6 flex flex-col items-start gap-8 font-mono text-[10px] uppercase tracking-widest text-[#F7F5F2]/70 md:flex-row md:items-center md:justify-between md:gap-4 md:text-xs">
        <div className="flex flex-col gap-5">
          <p className="reveal bottom-item invisible">
            &copy; {year} Henry Nmesomachukwu Okeke
          </p>
          <p className="reveal bottom-item invisible md:hidden">
            Designed with intention. Built with React.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="reveal bottom-item invisible whitespace-nowrap uppercase transition-colors hover:text-[#C47A55]"
        >
          Back to top &#8593;
        </button>
      </div>
    </footer>
  );
}
