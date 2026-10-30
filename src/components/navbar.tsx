"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const links = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "About", href: "#about" },
];

function AnimatedArrow() {
  return (
    <span className="relative inline-block h-3.75 w-3.75 overflow-hidden">
      <ArrowTopRightIcon className="transition-transform duration-300 ease-out group-hover:-translate-y-full group-hover:translate-x-full" />
      <ArrowTopRightIcon className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
    </span>
  );
}

export default function Navbar() {
  const container = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const button = buttonRef.current;
      if (!panel || !button) return;

      if (open) {
        const rect = button.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const radius = Math.hypot(
          Math.max(cx, window.innerWidth - cx),
          Math.max(cy, window.innerHeight - cy)
        );

        tl.current?.kill();
        tl.current = gsap
          .timeline()
          .set(panel, { autoAlpha: 1 })
          .fromTo(
            panel,
            { clipPath: `circle(0px at ${cx}px ${cy}px)` },
            {
              clipPath: `circle(${radius}px at ${cx}px ${cy}px)`,
              duration: 0.9,
              ease: "power3.inOut",
            }
          )
          .fromTo(
            ".menu-link",
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power4.out",
            },
            "-=0.45"
          );
      } else {
        tl.current?.reverse();
      }
    },
    { scope: container, dependencies: [open], revertOnUpdate: false }
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      ref={container}
      className="sticky top-0 z-40 w-full bg-[#F7F5F2] text-[#1E1E1E]"
    >
      <div
        ref={panelRef}
        id="mobile-menu"
        className="menu-panel invisible fixed inset-0 z-40 flex flex-col justify-between bg-[#1E1E1E] px-6 pb-10 pt-28 text-[#F7F5F2]"
      >
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <div key={link.label} className="overflow-hidden">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="menu-link block text-5xl font-semibold tracking-tight transition-colors hover:text-[#C47A55]"
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="overflow-hidden">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="menu-link group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-[#C47A55]"
          >
            Let&apos;s talk
            <AnimatedArrow />
          </a>
        </div>
      </div>

      <div className="relative z-50 mx-auto px-6 md:px-20">
        <div
          className={`flex items-center justify-between border-b py-5 transition-colors duration-500 md:py-6 ${open ? "border-transparent" : "border-[#1E1E1E]/10"
            }`}
        >
          <a href="#top" className="flex items-baseline gap-4">
            <span
              className={`font-mono text-lg font-medium transition-colors duration-500 ${open ? "text-[#C47A55]" : "text-[#8B4A2F]"
                }`}
            >
              NmesomaHenry
            </span>
            <span className="hidden text-sm font-medium lg:inline">
              Henry Nmesomachukwu Okeke
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#1E1E1E]/60 transition-colors hover:text-[#1E1E1E]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#8B4A2F]"
            >
              Let&apos;s talk
              <AnimatedArrow />
            </a>
          </nav>

          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className={`relative -mr-2 h-10 w-10 transition-colors duration-500 md:hidden ${open ? "text-[#F7F5F2]" : "text-[#1E1E1E]"
              }`}
          >
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"
                }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"
                }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}