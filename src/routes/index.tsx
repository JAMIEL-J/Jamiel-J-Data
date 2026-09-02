import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import portrait from "@/assets/jamiel-portrait.png";
import revealPortrait from "@/assets/jamiel-j-reveal.png";
import { ArrowRight } from "lucide-react";
import HeroFluid from "@/components/HeroFluid";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: Home,
});

function HeroContent({ isMask = false }: { isMask?: boolean }) {
  const imgSrc = isMask ? revealPortrait : portrait;
  const imgClass = isMask 
    ? "w-full h-auto object-contain transition-all duration-700"
    : "w-full h-auto object-contain grayscale transition-all duration-700";

  return (
    <>
      {/* Top Left */}
      <div className="absolute top-24 left-8 md:top-32 md:left-12 text-sm tracking-widest uppercase animate-up z-20 text-foreground">
        Data Analyst
      </div>

      {/* Top Right */}
      <div className="absolute top-24 right-8 md:top-32 md:right-12 animate-up z-20 text-foreground">
        <ArrowRight size={24} strokeWidth={1} className="hidden md:block" />
      </div>

      {/* OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 editorial-grid opacity-10 dark:opacity-20 z-0" />
      <div className="pointer-events-none absolute inset-0 spotlight z-0" />

      {/* The Text behind */}
      <div className="absolute inset-0 flex items-center justify-center z-0 select-none overflow-hidden">
        <h1
          className="text-[16vw] md:text-[17vw] uppercase leading-none animate-up text-foreground whitespace-nowrap transition-colors duration-500 font-bold"
          style={{ letterSpacing: "0em", transform: "scaleY(1.15)" }}
        >
          PORTFOLIO
        </h1>
      </div>

      {/* The Image (Zoomed in) */}
      <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[500px] mx-auto flex justify-center items-end animate-up mt-[15vh] pointer-events-none">
        <img
          src={imgSrc}
          alt="Jamiel"
          className={imgClass}
        />
      </div>

      {/* The Text in front (Stroke only overlay) */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none overflow-hidden mix-blend-overlay">
        <h1
          className="text-[16vw] md:text-[17vw] uppercase leading-none animate-up text-transparent whitespace-nowrap transition-colors duration-500 font-bold"
          style={{ letterSpacing: "0em", transform: "scaleY(1.15)" }}
        >
          <span className="text-white text-transparent" style={{ WebkitTextFillColor: "transparent", WebkitTextStroke: "1.5px #fff" }}>PORTFOLIO</span>
        </h1>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-sm tracking-widest animate-up z-20 text-foreground">
        Jamiel J
      </div>

      {/* Bottom Right */}
      <Link
        to="/projects"
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-sm tracking-widest lowercase animate-up z-20 text-foreground hover:opacity-70 transition-opacity"
      >
        view.projects
      </Link>
    </>
  );
}

function Home() {
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.innerWidth < 768;

    // Lenis: autoRaf OFF — we drive it from GSAP ticker once (fixes double-RAF lag).
    // Faster lerp (0.12) = less perceived lag hero->down. Touch gets native feel.
    const lenis = new Lenis({
      autoRaf: false,
      duration: 0.85,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      lerp: isMobile || isTouch ? 0.14 : 0.11,
      smoothWheel: true,
      syncTouch: false,
      gestureOrientation: "vertical",
      touchMultiplier: 1.15,
    });
    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    const ticker = (time: number) => lenis.raf(time * 1000);
    if (!prefersReduced) {
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    } else {
      const loop = (t: number) => {
        lenis.raf(t);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }

    let ctx: gsap.Context | null = null;
    let refreshTimeout: number | null = null;

    const initGsap = () => {
      ctx = gsap.context(() => {
        // Hero Entrance
        gsap.fromTo(
          ".animate-up",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
        );

        // Kinetic Marquee — scrub-free loop (scrub:1 was fighting Lenis and breaking scroll)
        const marquee = document.querySelector<HTMLElement>(".marquee-inner");
        if (marquee) {
          gsap.to(marquee, {
            xPercent: -50,
            duration: 22,
            ease: "none",
            repeat: -1,
          });
        }

        // Methodology cardless slight zoom reveal — will-change + once:true to avoid repaint thrash
        gsap.utils.toArray<HTMLElement>(".seq-alt").forEach((el) => {
          el.style.willChange = "transform, opacity";
          gsap.fromTo(
            el,
            { y: 14, opacity: 0, scale: 0.988 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
              onComplete: () => {
                el.style.willChange = "auto";
              },
            }
          );
        });

        // Impact pillars — pin only, no scrub scale (scrub+pin = jank hero->down). Use pure CSS sticky.
        gsap.utils.toArray<HTMLElement>(".pillar-card").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                once: true,
              },
            }
          );
        });
      });

      // Critical: refresh after layout settles — fixes initial-not-animating but animates after nav
      requestAnimationFrame(() => ScrollTrigger.refresh());
      // Extra refresh after fonts/images settle (initial load vs TanStack client nav)
      refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 250) as unknown as number;
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    };

    // Defer one frame so DOM is painted before measuring (fixes SSR -> client mismatch)
    const rafStart = requestAnimationFrame(initGsap);

    return () => {
      cancelAnimationFrame(rafStart);
      if (refreshTimeout) clearTimeout(refreshTimeout);
      if (ctx) ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO WITH WEBGL FLUID MASK */}
      <section className="hero-container relative overflow-hidden font-sans cursor-default">
        <HeroFluid 
          childrenBase={
            <div className="absolute inset-0 bg-background text-foreground flex items-center justify-center">
              <HeroContent isMask={false} />
            </div>
          }
          childrenReveal={
            <div className="theme-inverse absolute inset-0 bg-background text-foreground flex items-center justify-center">
              <HeroContent isMask={true} />
            </div>
          }
        />
      </section>

      {/* MARQUEE */}
      <section className="marquee-section py-8 md:py-12 border-y border-foreground/10 bg-background text-foreground overflow-hidden whitespace-nowrap flex items-center">
        <div className="marquee-inner flex text-sm md:text-base font-semibold uppercase tracking-[0.2em] opacity-80">
          <span className="px-8 flex items-center gap-16">
            DATA DRIVEN DECISIONS <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
            REVENUE OPERATIONS <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
            FORECASTING <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
            PREDICTIVE MODELING <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
          </span>
          <span className="px-8 flex items-center gap-16">
            DATA DRIVEN DECISIONS <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
            REVENUE OPERATIONS <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
            FORECASTING <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
            PREDICTIVE MODELING <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
          </span>
          <span className="px-8 flex items-center gap-16">
            DATA DRIVEN DECISIONS <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
            REVENUE OPERATIONS <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
            FORECASTING <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
            PREDICTIVE MODELING <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
          </span>
        </div>
      </section>

      {/* WHAT I DO - Premium Editorial Layout */}
      <section className="pt-24 md:pt-48 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">

        {/* Massive asymmetric heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 md:mb-32">
          <div className="md:col-span-11 md:col-start-2 lg:col-span-10 lg:col-start-2">
            <h2 className="text-4xl md:text-7xl lg:text-[6.5rem] font-black leading-[0.9] tracking-tighter uppercase text-left">
              Data Analyst who builds <span className="text-foreground/30">the dashboards nobody has to explain twice.</span>
            </h2>
          </div>
        </div>

        {/* Statement — same analyst system, centered + reduced */}
        <div className="max-w-[1000px] mx-auto text-center mt-8 md:mt-10">
          <h3 className="text-[1.7rem] md:text-[2.6rem] lg:text-[3.4rem] font-black leading-[0.9] tracking-tighter uppercase text-center">
            I find where the money is leaking, <span className="text-foreground/30">forecast where it is going, and tell you which customers actually matter.</span>
          </h3>
        </div>

        {/* Methodology — cardless, alternating sides, centered hairline, slight zoom on scroll */}
        <div className="relative w-full max-w-[1000px] mx-auto mt-12 md:mt-20">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-10 bg-foreground/10"></div>
            <span className="text-xs font-semibold uppercase tracking-widest opacity-40">Methodology</span>
            <div className="h-px w-10 bg-foreground/10"></div>
          </div>

          <div className="relative px-2 md:px-0">
            <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-foreground/10 -translate-x-1/2"></div>
            <div className="md:hidden absolute left-[15px] top-2 bottom-2 w-px bg-foreground/10"></div>

            <div className="seq-alt grid md:grid-cols-2 gap-0 items-start pb-12">
              <div className="md:pr-10 md:text-right order-2 md:order-1">
                <h4 className="text-[15px] md:text-[16px] font-black tracking-tight uppercase leading-none">Strip the noise</h4>
                <p className="text-[10px] tracking-[0.14em] uppercase opacity-40 mt-1">SQL · Statistical reasoning · BigQuery</p>
                <p className="text-sm leading-[1.6] opacity-60 mt-3">Remove vanity deltas. Use SQL and statistical reasoning to answer why a metric moved, not just that it did.</p>
              </div>
              <div className="relative md:pl-10 order-1 md:order-2 flex md:block gap-4">
                <div className="md:absolute md:left-0 md:top-0 md:-translate-x-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-foreground text-background grid place-items-center text-[11px] font-medium shrink-0">01</div>
              </div>
            </div>

            <div className="seq-alt grid md:grid-cols-2 gap-0 items-start pb-12">
              <div className="relative md:pr-10 order-1 flex md:justify-end">
                <div className="md:absolute md:right-0 md:top-0 md:translate-x-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-card border border-foreground/10 grid place-items-center text-[11px] font-medium shrink-0">02</div>
              </div>
              <div className="md:pl-10 text-left order-2">
                <h4 className="text-[15px] md:text-[16px] font-black tracking-tight uppercase leading-none">Translate to decisions</h4>
                <p className="text-[10px] tracking-[0.14em] uppercase opacity-40 mt-1">Power BI · Streamlit</p>
                <p className="text-sm leading-[1.6] opacity-60 mt-3">Raw insight into a dashboard stakeholders will actually open. One view that decides, not a deck that explains.</p>
              </div>
            </div>

            <div className="seq-alt grid md:grid-cols-2 gap-0 items-start">
              <div className="md:pr-10 md:text-right order-2 md:order-1">
                <h4 className="text-[15px] md:text-[16px] font-black tracking-tight uppercase leading-none">Build what does not exist</h4>
                <p className="text-[10px] tracking-[0.14em] uppercase opacity-40 mt-1">Full stack · Shipped</p>
                <p className="text-sm leading-[1.6] opacity-60 mt-3">When the tool does not exist, build it end to end. Stop the leak at the source.</p>
              </div>
              <div className="relative md:pl-10 order-1 md:order-2">
                <div className="md:absolute md:left-0 md:top-0 md:-translate-x-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-card border border-foreground/10 grid place-items-center text-[11px] font-medium shrink-0">03</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT PILLARS (STACKED CARDS) */}
      <section className="py-24 md:py-48 px-6 md:px-12 max-w-[1200px] mx-auto flex flex-col gap-12 relative pb-[50vh]">

        {/* PILLAR 1: DATA */}
        <div className="pillar-card sticky top-[5vh] md:top-[12vh] w-full bg-foreground text-background rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 items-center z-10">
          <div className="md:w-1/2 flex flex-col gap-4">
            <div className="text-sm font-bold uppercase tracking-widest opacity-70 border-b border-background/20 pb-4">01 // Data Engineering</div>
            <h2 className="text-[10vw] md:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase mt-2">Revenue<br />Leakage</h2>
            <div className="text-4xl md:text-5xl font-bold tracking-tighter opacity-80 mt-1">$1.14M+ Identified</div>
            <p className="text-lg md:text-xl font-normal leading-relaxed opacity-70 mt-2">
              Constructing end-to-end e-commerce conversion funnels using BigQuery to isolate session drop-offs and optimize user journeys.
            </p>
            <Link to="/projects" className="mt-4 flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity w-fit group">
              View Case Study <ArrowRight size={20} />
            </Link>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-8 bg-background/5 rounded-2xl w-full h-full border border-background/10 min-h-[300px]">
            <div className="text-6xl md:text-8xl font-black tracking-tighter mb-2">73,961</div>
            <div className="text-sm md:text-base uppercase tracking-widest opacity-70 mb-6">Critical Drop-offs Captured</div>
            <div className="flex gap-3 flex-wrap justify-center">
              <span className="px-4 py-2 bg-background text-foreground text-xs font-bold uppercase tracking-widest rounded-full">BigQuery</span>
              <span className="px-4 py-2 bg-background text-foreground text-xs font-bold uppercase tracking-widest rounded-full">SQL</span>
            </div>
          </div>
        </div>

        {/* PILLAR 2: AI */}
        <div className="pillar-card sticky top-[7vh] md:top-[16vh] w-full bg-zinc-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row-reverse gap-8 items-center z-20 border border-white/10">
          <div className="md:w-1/2 flex flex-col gap-4">
            <div className="text-sm font-bold uppercase tracking-widest opacity-70 border-b border-white/20 pb-4">02 // Artificial Intelligence</div>
            <h2 className="text-[10vw] md:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase mt-2">Vizzy<br />Pilot</h2>
            <div className="text-4xl md:text-5xl font-bold tracking-tighter opacity-80 mt-1">&lt;65ms p95</div>
            <p className="text-lg md:text-xl font-normal leading-relaxed opacity-70 mt-2">
              Translating natural language into validated database operations, delivering results onto an interactive BI canvas with hybrid routing.
            </p>
            <Link to="/projects" className="mt-4 flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity w-fit group">
              View Specifications <ArrowRight size={20} />
            </Link>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-8 bg-white/5 rounded-2xl w-full h-full border border-white/10 min-h-[300px]">
            <div className="text-6xl md:text-8xl font-black tracking-tighter mb-2">100MB</div>
            <div className="text-sm md:text-base uppercase tracking-widest opacity-70 mb-6">Ingested & Cleaned in 2.3s</div>
            <div className="flex gap-3 flex-wrap justify-center">
              <span className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">FastAPI</span>
              <span className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">DuckDB</span>
            </div>
          </div>
        </div>

        {/* PILLAR 3: ANALYSIS */}
        <div className="pillar-card sticky top-[9vh] md:top-[20vh] w-full bg-background text-foreground rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 items-center z-30 border border-foreground/10">
          <div className="md:w-1/2 flex flex-col gap-4">
            <div className="text-sm font-bold uppercase tracking-widest opacity-70 border-b border-foreground/20 pb-4">03 // Predictive Analytics</div>
            <h2 className="text-[10vw] md:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase mt-2">Churn<br />Prediction</h2>
            <div className="text-4xl md:text-5xl font-bold tracking-tighter opacity-80 mt-1">$106K+ ROI</div>
            <p className="text-lg md:text-xl font-normal leading-relaxed opacity-70 mt-2">
              Business-aware retention optimization using custom cost matrices to tune decision thresholds purely on ROI rather than ML accuracy.
            </p>
            <Link to="/projects" className="mt-4 flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity w-fit group">
              View Case Study <ArrowRight size={20} />
            </Link>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-8 bg-foreground/5 rounded-2xl w-full h-full border border-foreground/10 min-h-[300px]">
            <div className="text-6xl md:text-8xl font-black tracking-tighter mb-2">14+</div>
            <div className="text-sm md:text-base uppercase tracking-widest opacity-70 mb-6">Business Hypotheses Validated</div>
            <div className="flex gap-3 flex-wrap justify-center">
              <span className="px-4 py-2 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-full">Python</span>
              <span className="px-4 py-2 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-full">Scikit-Learn</span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
