"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedArrow } from "./animated-arrow";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = {
  title: string;
  category: string;
  year?: string;
  text: string;
  tags: string[];
  tint: string;
  href?: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "BizFlip",
    category: "Product engineering",
    year: "2025",
    text: "A blockchain marketplace for buying businesses. Led the frontend from an inherited codebase to an investor-ready MVP, with wallet, Google and guest auth, on-chain transactions and a deal pipeline.",
    tags: ["Next.js", "wagmi", "viem", "TanStack Query"],
    tint: "#E6E7F4",
  },
  {
    title: "Alphablocks Tech",
    category: "Community platform",
    year: "2023",
    text: "A Web3 community platform for cohorts and events. Built end to end, then split into separate frontend and backend services, with Paystack payments, email queues and NFT minting.",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL"],
    tint: "#EDE3DA",
  },
  {
    title: "Workspora",
    category: "Backend",
    year: "In progress",
    text: "A multi-tenant team workspace backend with role-based access control, token-based invitations and queued emails, in a layered architecture with Zod validation.",
    tags: ["TypeScript", "Express", "Prisma", "PostgreSQL"],
    tint: "#D5DDD3",
    href: "https://github.com/IamHenryOkeke",
  },
  {
    title: "LinkHub",
    category: "Backend API",
    text: "A link in bio API with authentication, profile management and full CRUD for managing bio links.",
    tags: ["Node.js", "Express", "Prisma", "PostgreSQL"],
    tint: "#EADFD6",
    href: "https://github.com/IamHenryOkeke",
  },
];

export default function Work() {
  const container = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const playIntro = (withCards: boolean) => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            once: true,
          },
        });

        tl.to(".wk-label", { autoAlpha: 1, y: 0, duration: 0.7 })
          .to(
            ".wk-line",
            { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out" },
            "-=0.4",
          )
          .to(".wk-intro", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6");

        if (withCards) {
          tl.to(
            ".wk-card",
            { autoAlpha: 1, x: 0, duration: 1, stagger: 0.12 },
            "-=0.5",
          );
        }

        tl.to(
          ".wk-foot",
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.6",
        );
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".wk-fade, .wk-line, .wk-card", { autoAlpha: 1 });
      });

      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(".wk-fade", { autoAlpha: 0, y: 20 });
          gsap.set(".wk-line", { yPercent: 110, autoAlpha: 1 });
          gsap.set(".wk-card", { autoAlpha: 0, y: 40 });

          playIntro(false);

          ScrollTrigger.batch(".wk-card", {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
              }),
          });
        },
      );

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const pin = pinRef.current;
          const wrapper = wrapperRef.current;
          if (!track || !pin || !wrapper) return;

          gsap.set(wrapper, { overflow: "hidden" });
          gsap.set(".wk-fade", { autoAlpha: 0, y: 20 });
          gsap.set(".wk-line", { yPercent: 110, autoAlpha: 1 });
          gsap.set(".wk-card", { autoAlpha: 0, x: 60 });
          gsap.set(".wk-progress-wrap", { autoAlpha: 1 });
          gsap.set(".wk-progress", {
            scaleX: 0,
            transformOrigin: "left center",
          });

          playIntro(true);

          const getDistance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const scrollTween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => "+=" + getDistance(),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                gsap.set(".wk-progress", { scaleX: self.progress });
              },
            },
          });

          gsap.utils.toArray<HTMLElement>(".wk-card").forEach((card) => {
            const inner = card.querySelector(".wk-visual-inner");
            if (!inner) return;

            gsap.fromTo(
              inner,
              { xPercent: -6 },
              {
                xPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });
        },
      );

      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <section ref={container} id="work" className="bg-[#F7F5F2] text-[#1E1E1E]">
      <div
        ref={pinRef}
        className="flex flex-col justify-center py-20 md:min-h-screen md:py-10"
      >
        <div className="px-6 md:px-20">
          <p className="wk-fade wk-label invisible font-mono text-[10px] uppercase tracking-widest md:text-xs">
            <span className="text-[#8B4A2F]">01</span>
            <span className="ml-4 text-[#1E1E1E]/70">Selected work</span>
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
            <h2 className="text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:col-span-7 lg:text-6xl">
              <span className="block overflow-hidden pb-2">
                <span className="wk-line invisible block">
                  Built to be used.
                </span>
              </span>
            </h2>
            <p className="wk-fade wk-intro invisible text-base leading-relaxed text-[#1E1E1E]/60 md:col-span-5 md:pb-2 md:text-lg lg:col-span-4 lg:col-start-9">
              A few projects, from a Web3 marketplace to backend systems, built
              with care across the whole stack.
            </p>
          </div>
        </div>

        <div ref={wrapperRef} className="mt-10 md:mt-8 md:overflow-x-auto">
          <div
            ref={trackRef}
            className="flex flex-col gap-14 px-6 md:w-max md:flex-row md:gap-12 md:px-20"
          >
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="wk-card invisible w-full md:w-[46vw] md:shrink-0 lg:w-[38vw]"
              >
                <div
                  className="group relative h-60 overflow-hidden md:h-[28vh] md:min-h-50"
                  style={{ backgroundColor: project.tint }}
                >
                  <div className="wk-visual-inner absolute inset-y-0 left-[-10%] w-[120%]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 46vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-end justify-between px-[12%] pb-6">
                        <span className="text-[7rem] font-semibold leading-none tracking-tighter text-[#1E1E1E]/10 md:text-[9rem]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="pb-3 font-mono text-[10px] uppercase tracking-widest text-[#1E1E1E]/40 md:text-xs">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#1E1E1E]/60 md:text-xs">
                  <span>
                    {String(index + 1).padStart(2, "0")} / {project.category}
                  </span>
                  {project.year && <span>{project.year}</span>}
                </div>

                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                    {project.title}
                  </h3>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1E1E1E]/15 transition-colors duration-300 hover:border-[#8B4A2F] hover:text-[#8B4A2F]"
                    >
                      <AnimatedArrow size={16} />
                    </a>
                  )}
                </div>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#1E1E1E]/60 md:text-base">
                  {project.text}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#1E1E1E]/15 px-2.5 py-1 font-mono text-[10px] text-[#1E1E1E]/70 md:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="wk-progress-wrap invisible mt-8 hidden px-20 md:block">
          <div className="h-px w-full bg-[#1E1E1E]/10">
            <div className="wk-progress h-full w-full bg-[#8B4A2F]" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 px-6 font-mono text-[10px] uppercase tracking-widest text-[#1E1E1E]/60 md:mt-6 md:flex-row md:items-center md:justify-between md:px-20 md:text-xs">
          <p className="wk-fade wk-foot invisible">
            Small teams. Real problems. Careful execution.
          </p>
          <a
            href="https://github.com/IamHenryOkeke"
            target="_blank"
            rel="noopener noreferrer"
            className="wk-fade wk-foot group invisible inline-flex items-center gap-2 transition-colors hover:text-[#8B4A2F]"
          >
            More experiments on GitHub
            <AnimatedArrow size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
