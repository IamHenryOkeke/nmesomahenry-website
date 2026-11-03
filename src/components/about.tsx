"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const container = useRef<HTMLElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".about-fade, .about-line", { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".about-fade", { autoAlpha: 0, y: 20 });
        gsap.set(".about-line", { yPercent: 110, autoAlpha: 1 });
        gsap.set(".about-frame", {
          clipPath: "inset(100% 0% 0% 0%)",
        });
        gsap.set(".about-img", { scale: 1.3 });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: container.current,
              start: "top 65%",
              once: true,
            },
          })
          .to(".about-frame", {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power4.inOut",
          })
          .to(
            ".about-img",
            { scale: 1, duration: 1.8, ease: "power3.out" },
            "<",
          )
          .to(
            ".about-caption",
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
            "-=0.8",
          )
          .to(".about-label", { autoAlpha: 1, y: 0, duration: 0.7 }, "-=1.2")
          .to(
            ".about-line",
            {
              yPercent: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power4.out",
            },
            "-=0.5",
          )
          .to(
            ".about-body",
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 },
            "-=0.6",
          )
          .to(
            ".about-meta",
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
            "-=0.5",
          );

        gsap.fromTo(
          ".about-parallax",
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-tilt",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = tiltRef.current;
          if (!el) return;

          gsap.set(el, { transformPerspective: 900 });

          const rotateX = gsap.quickTo(el, "rotationX", {
            duration: 0.6,
            ease: "power3.out",
          });

          const rotateY = gsap.quickTo(el, "rotationY", {
            duration: 0.6,
            ease: "power3.out",
          });

          const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            rotateY(x * 8);
            rotateX(-y * 8);
          };

          const onLeave = () => {
            rotateX(0);
            rotateY(0);
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);

          return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="about"
      className="bg-[#F7F5F2] px-6 py-20 text-[#1E1E1E] md:px-20 md:py-32"
    >
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div ref={tiltRef} className="about-tilt will-change-transform">
            <div className="about-frame relative aspect-[4/5] w-full overflow-hidden">
              <div className="about-parallax absolute inset-x-0 -top-[8%] h-[116%]">
                <Image
                  src="/henry.svg"
                  alt="Henry Okeke"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="about-img object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-widest text-[#1E1E1E]/60 md:flex-row md:justify-between md:text-xs">
            <p className="about-fade about-caption invisible">
              Away from the code editor.
            </p>
            <p className="about-fade about-caption invisible">
              A little about me
            </p>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="about-fade about-label invisible font-mono text-[10px] uppercase tracking-widest md:text-xs">
            <span className="text-[#8B4A2F]">04</span>
            <span className="ml-4 text-[#1E1E1E]/70">A bit about me</span>
          </p>

          <h2 className="mt-8 text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl xl:text-7xl">
            <span className="block overflow-hidden pb-2">
              <span className="about-line invisible block">
                A curious person,
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="about-line invisible block">
                not just a developer.
              </span>
            </span>
          </h2>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-[#1E1E1E]/60 md:mt-10 md:space-y-8 md:text-xl">
            <p className="about-fade about-body invisible">
              I&rsquo;m Henry Nmesomachukwu Okeke, a frontend engineer. I enjoy
              the space where design meets engineering, turning a good idea into
              something that feels natural to use and straightforward to
              maintain. I&rsquo;m always poking at some new tech, and I never
              say no to a good conversation about it.
            </p>

            <p className="about-fade about-body invisible">
              Outside of work, you&rsquo;ll find me on a long walk, rewatching
              Brooklyn Nine-Nine or Modern Family, or watching Bar&ccedil;a
              suffer and celebrate. I also play CODM, not so badly, and watch
              other people play it better. I&rsquo;m happiest on teams that
              share what they know and care about the small things.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-[#1E1E1E]/60 md:mt-12 md:flex-row md:gap-10 md:text-xs">
            <p className="about-fade about-meta invisible">
              Currently: Exploring GSAP
            </p>
            <p className="about-fade about-meta invisible">
              Rank: Better than I let on at CODM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
