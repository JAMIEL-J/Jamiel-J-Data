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
            className="text-[19vw] md:text-[17vw] uppercase leading-none animate-up text-foreground whitespace-nowrap transition-colors duration-500 font-bold"
            style={{ letterSpacing: "0em", transform: "scaleY(1.15)" }}
          >
            PORTFOLIO
          </h1>
        </div>

        {/* The Image (Zoomed in) */}
        <div className="relative z-10 w-full max-w-[380px] md:max-w-[500px] mx-auto flex justify-center items-end animate-up mt-[15vh] pointer-events-none">
          <img
            src={portrait}
            alt="Jamiel"
            className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 mix-blend-multiply dark:mix-blend-lighten"
          />
        </div>

        {/* The Text in front (Stroke only overlay) */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none overflow-hidden mix-blend-overlay">
          <h1
            className="text-[19vw] md:text-[17vw] uppercase leading-none animate-up text-transparent whitespace-nowrap transition-colors duration-500 font-bold"
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
            <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black leading-[0.9] tracking-tighter uppercase text-left">
              Data Analyst who builds <span className="text-foreground/30">the dashboards nobody has to explain twice.</span>
            </h2>
          </div>
        </div>

        {/* Editorial Sub-grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-24 border-t border-foreground/10 pt-16">
          <div className="md:col-span-5 md:col-start-2 flex flex-col">
            <p className="text-2xl md:text-4xl font-normal opacity-90 leading-[1.2] tracking-tight mb-8">
              I find where the money's leaking, forecast where it's going, and tell you which customers actually matter.
            </p>
            <p className="text-base md:text-lg font-normal opacity-70 leading-relaxed max-w-md">
              From raw CSVs to a $1.14M revenue leak, identified with SQL and a spreadsheet's worth of stubbornness.
            </p>
          </div>
          
          <div className="md:col-span-5 md:col-start-8 flex flex-col gap-12 mt-12 md:mt-0">
             <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-50 mb-2">
                 <span>01</span> <div className="h-px bg-foreground/20 flex-1"></div>
               </div>
               <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Analyze</h3>
               <p className="text-base md:text-lg font-normal opacity-70 leading-relaxed">
                 SQL, Python, and statistical reasoning to answer "why did this number move."
               </p>
             </div>
             
             <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-50 mb-2">
                 <span>02</span> <div className="h-px bg-foreground/20 flex-1"></div>
               </div>
               <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Visualize</h3>
               <p className="text-base md:text-lg font-normal opacity-70 leading-relaxed">
                 Power BI, Tableau, and Streamlit dashboards built for people who won't read a report.
               </p>
             </div>
             
             <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-50 mb-2">
                 <span>03</span> <div className="h-px bg-foreground/20 flex-1"></div>
               </div>
               <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Build</h3>
               <p className="text-base md:text-lg font-normal opacity-70 leading-relaxed">
                 When the analysis needs a tool that doesn't exist yet, I build it. Full-stack, if that's what it takes.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* IMPACT PILLARS (STACKED CARDS) */}
      <section className="py-24 md:py-48 px-6 md:px-12 max-w-[1200px] mx-auto flex flex-col gap-12 relative pb-[50vh]">
        
        {/* PILLAR 1: DATA */}
        <div className="sticky top-[10vh] md:top-[12vh] w-full bg-foreground text-background rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 items-center z-10 transition-transform">
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
        <div className="sticky top-[14vh] md:top-[16vh] w-full bg-zinc-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row-reverse gap-8 items-center z-20 transition-transform border border-white/10">
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
        <div className="sticky top-[18vh] md:top-[20vh] w-full bg-background text-foreground rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 items-center z-30 transition-transform border border-foreground/10">
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
