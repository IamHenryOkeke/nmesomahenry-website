"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Intro() {
  const container = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const finish = () => {
        document.body.style.overflow = previousOverflow;
        setDone(true);
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        finish();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { value: 0 };

        gsap.set(".line-inner", { yPercent: 110 });
        gsap.set(".fade-item", { opacity: 0, y: 16 });
        gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: finish,
        });

        tl.to(".fade-item", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
        })
          .to(
            ".line-inner",
            {
              yPercent: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power4.out",
            },
            "-=0.4"
          )
          .to(
            counter,
            {
              value: 100,
              duration: 1.8,
              ease: "power2.inOut",
              onUpdate: () => {
                const rounded = Math.round(counter.value);
                if (countRef.current) {
                  countRef.current.textContent = String(rounded).padStart(3, "0");
                }
                if (barRef.current) {
                  gsap.set(barRef.current, { scaleX: counter.value / 100 });
                }
              },
            },
            "-=0.7"
          )
          .to(
            ".line-inner",
            {
              yPercent: -110,
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.in",
            },
            "+=0.2"
          )
          .to(
            ".fade-item",
            {
              opacity: 0,
              y: -12,
              duration: 0.4,
              stagger: 0.05,
              ease: "power2.in",
            },
            "<"
          )
          .to(".intro-container", {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
          });
      });

      return () => {
        document.body.style.overflow = previousOverflow;
        mm.revert();
      };
    },
    { scope: container }
  );

  if (done) return null;

  return (
    <div ref={container}>
      <div className="intro-container fixed inset-0 z-50 flex h-screen w-full flex-col justify-between bg-[#1E1E1E] px-6 py-8 text-[#F7F5F2] md:px-20 md:py-12">
        <div className="flex items-center justify-between">
          <p className="fade-item font-mono text-sm font-medium text-[#C47A55] md:text-base">
            NmesomaHenry
          </p>
          <p className="fade-item flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#F7F5F2]/60 md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C47A55]" />
            Frontend engineer
          </p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-hidden pb-2">
            <h1 className="line-inner text-5xl font-semibold leading-[1.05] tracking-tight md:text-8xl">
              Hello, I&apos;m Henry.
            </h1>
          </div>
          <div className="overflow-hidden pb-2">
            <h1 className="line-inner text-5xl font-semibold leading-[1.05] tracking-tight text-[#C47A55] md:text-8xl">
              Building for the web.
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="fade-item h-px w-full bg-[#F7F5F2]/15">
            <div ref={barRef} className="h-full w-full bg-[#C47A55]" />
          </div>
          <div className="flex w-full items-end justify-between">
            <p className="fade-item font-mono text-[10px] uppercase tracking-widest text-[#F7F5F2]/60 md:text-xs">
              Okeke Nmesomachukwu Henry
            </p>
            <p className="fade-item font-mono text-5xl leading-none text-[#F7F5F2] md:text-8xl">
              <span ref={countRef}>000</span>
              <span className="text-[#C47A55]">%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}