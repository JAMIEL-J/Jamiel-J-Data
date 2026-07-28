import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "@/assets/jamiel-portrait.png";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.fromTo(
        ".animate-up",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );

      // Kinetic Marquee (Scrolling text)
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Glass Section Reveal
      gsap.fromTo(
        ".glass-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".glass-section",
            start: "top 75%",
          }
        }
      );

      gsap.fromTo(
        ".glass-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".glass-cards-container",
            start: "top 80%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[100dvh] bg-background overflow-hidden flex items-center justify-center font-sans transition-colors duration-500">

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
            src={portrait}
            alt="Jamiel"
            className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 mix-blend-multiply dark:mix-blend-lighten"
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

        {/* Centered Liquid Glass Layout */}
        <div className="glass-section relative w-full mt-16 md:mt-32 md:mb-24 text-foreground flex flex-col items-center px-6 md:px-12">
          
          {/* Background shapes to make the glass refraction visible */}
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-foreground/[0.08] blur-[120px] rounded-full pointer-events-none z-0"></div>
          <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] bg-foreground/[0.05] blur-[100px] rounded-full pointer-events-none z-0"></div>

          {/* Main Statement (Centered) */}
          <div className="glass-reveal relative z-10 max-w-5xl mx-auto text-center mb-12 md:mb-16">
            <h3 className="text-3xl md:text-6xl lg:text-[4.25rem] font-medium leading-[1.1] tracking-tight">
              I find where the money's leaking, forecast where it's going,<br className="hidden md:block" /> and tell you which customers actually matter.
            </h3>
          </div>

          {/* Apple-style Liquid Glass Flow Card */}
          <div className="glass-card relative z-10 w-full max-w-4xl p-6 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] bg-white/40 dark:bg-black/40 backdrop-blur-[50px] border border-black/5 dark:border-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.4)] overflow-hidden ring-1 ring-inset ring-white/60 dark:ring-white/10">
             
             {/* Apple-style inner highlight / liquid reflection */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 opacity-50 pointer-events-none mix-blend-overlay"></div>
             <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20 pointer-events-none"></div>
             
             <div className="relative z-10 flex flex-col gap-8 text-center">
               <div className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-widest opacity-50 mb-2">
                 <div className="h-px bg-foreground/20 w-8 md:w-16"></div>
                 <span>Methodology</span>
                 <div className="h-px bg-foreground/20 w-8 md:w-16"></div>
               </div>
               
               <p className="text-xl md:text-2xl lg:text-[1.75rem] font-normal opacity-90 leading-[1.4] tracking-tight max-w-3xl mx-auto">
                 The workflow starts by stripping away the noise with <span className="font-bold">SQL and statistical reasoning</span> to definitively answer why a metric moved.
               </p>
               <p className="text-xl md:text-2xl lg:text-[1.75rem] font-normal opacity-90 leading-[1.4] tracking-tight max-w-3xl mx-auto">
                 That raw insight is translated into clear <span className="font-bold">Power BI and Streamlit</span> dashboards engineered for stakeholders who won't read a dense report. 
               </p>
               <p className="text-xl md:text-2xl lg:text-[1.75rem] font-normal opacity-90 leading-[1.4] tracking-tight max-w-3xl mx-auto">
                 And when the problem requires a tool that doesn't exist yet, <span className="font-bold">I build it from scratch</span>—full-stack, if that's what it takes to stop the leak.
               </p>
             </div>

          </div>
        </div>
      </section>

      {/* IMPACT PILLARS (STACKED CARDS) */}
      <section className="py-24 md:py-48 px-6 md:px-12 max-w-[1200px] mx-auto flex flex-col gap-12 relative pb-[50vh]">

        {/* PILLAR 1: DATA */}
        <div className="sticky top-[5vh] md:top-[12vh] w-full bg-foreground text-background rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 items-center z-10 transition-transform">
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
        <div className="sticky top-[7vh] md:top-[16vh] w-full bg-zinc-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row-reverse gap-8 items-center z-20 transition-transform border border-white/10">
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
        <div className="sticky top-[9vh] md:top-[20vh] w-full bg-background text-foreground rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 items-center z-30 transition-transform border border-foreground/10">
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
