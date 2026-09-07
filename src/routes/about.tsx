import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.ticker.lagSmoothing(0);

      // Hero: masked line rises (reuses global tw-mask/tw-word, transform-only)
      gsap.fromTo(
        ".about-line",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power4.out", delay: 0.05, overwrite: "auto" }
      );
      gsap.fromTo(
        ".about-hero",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.15, overwrite: "auto" }
      );

      // Marquee — scrub-free loop, paused while off-screen
      const marquee = document.querySelector<HTMLElement>(".about-marquee-inner");
      if (marquee) {
        const loop = gsap.to(marquee, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
        ScrollTrigger.create({
          trigger: marquee,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => loop.play(),
          onLeave: () => loop.pause(),
          onEnterBack: () => loop.play(),
          onLeaveBack: () => loop.pause(),
        });
      }

      // Shared once-reveals (transform/opacity only)
      gsap.utils.toArray<HTMLElement>(".reveal:not(.arsenal-row)").forEach((el) => {
        el.style.willChange = "transform, opacity";
        gsap.fromTo(
          el,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
            onComplete: () => {
              el.style.willChange = "auto";
            },
          }
        );
      });

      // Arsenal rows — alternate slide direction per row (y on mobile), once
      const isMobile = window.innerWidth < 768;
      gsap.utils.toArray<HTMLElement>(".arsenal-row").forEach((el, i) => {
        el.style.willChange = "transform, opacity";
        const fromX = isMobile ? 0 : i % 2 === 0 ? -48 : 48;
        gsap.fromTo(
          el,
          { x: fromX, y: isMobile ? 26 : 0, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onComplete: () => {
              el.style.willChange = "auto";
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-container relative min-h-[100dvh] bg-background text-foreground">

      {/* 01 — AGENCY HERO */}
      <div className="relative pt-32 md:pt-40 pb-4 px-4 md:px-12 max-w-[1400px] mx-auto z-10">
        <p className="about-hero font-mono text-[11px] tracking-[0.18em] uppercase opacity-50">About — 01 / Profile</p>
        <h1 className="text-[17vw] md:text-[10rem] font-bold leading-[0.85] tracking-tighter uppercase mt-4">
          <span className="tw-mask"><span className="tw-word about-line">Jamiel</span></span>{" "}
          <span className="tw-mask"><span className="tw-word about-line">J</span></span>
        </h1>
        <p className="about-hero text-4xl md:text-6xl font-semibold tracking-tighter leading-none mt-2">
          Data Analyst <span className="opacity-30">out of Pudukkottai.</span>
        </p>
        <div className="about-hero grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-foreground/10 mt-10 pt-5 font-mono text-[11px] tracking-[0.12em] uppercase opacity-70">
          <div><p className="opacity-50 mb-1">Based</p><p className="font-semibold opacity-100">Pudukkottai, Tamil Nadu</p></div>
          <div><p className="opacity-50 mb-1">Degree</p><p className="font-semibold opacity-100">B.Tech · IT, M.I.E.T</p></div>
          <div><p className="opacity-50 mb-1">Role</p><p className="font-semibold opacity-100">Data Analyst</p></div>
          <div><p className="opacity-50 mb-1">Status</p><p className="font-semibold opacity-100 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse"></span>Applying now</p></div>
        </div>
      </div>

      {/* 02 — MANIFESTO (same copy) */}
      <div className="relative px-4 md:px-12 max-w-[1400px] mx-auto z-10 pt-16 md:pt-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-40 md:col-span-3">02 / In short</p>
            <h2 className="reveal md:col-span-9 text-2xl md:text-[2.9rem] font-semibold uppercase tracking-tighter leading-[1.02]">
            I&apos;m Jamiel — most people know me as Jam. I graduated with a B.Tech in Information Technology from M.I.E.T, and I work as a Data Analyst out of Pudukkottai, Tamil Nadu.
          </h2>
        </div>
      </div>

      {/* Kinetic strip — reuses the philosophy line */}
      <div className="border-y border-foreground/10 mt-14 md:mt-20 py-4 overflow-hidden whitespace-nowrap flex items-center">
        <div className="about-marquee-inner flex font-mono text-xs tracking-[0.2em] uppercase opacity-50">
          <span className="pr-8">What decision does this change? · What decision does this change? · What decision does this change? ·&nbsp;</span>
          <span className="pr-8">What decision does this change? · What decision does this change? · What decision does this change? ·&nbsp;</span>
        </div>
      </div>

      {/* 03 — ORIGIN (same copy) */}
      <div className="relative px-4 md:px-12 max-w-[1400px] mx-auto z-10 pt-16 md:pt-28 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-40">03 / Origin story</p>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase opacity-40 mt-2">BY8LABS AI · Trainee</p>
          </div>
        </div>
        <div className="md:col-span-9 md:pl-[2vw] md:border-l md:border-foreground/10">
          <p className="reveal text-lg md:text-2xl font-light leading-[1.6] tracking-tight max-w-3xl">
            My first real exposure to the job was as a <span className="font-bold border-b border-foreground/30 pb-0.5">Data Analyst Trainee at BY8LABS AI</span>, where I gained working proficiency in Python, Pandas, and NumPy through structured data science training focused on exploratory data analysis workflows and data validation techniques.
          </p>
          <p className="reveal text-lg md:text-2xl font-light leading-[1.6] tracking-tight mt-6 max-w-3xl opacity-70">
            Built foundational Streamlit dashboards to visualise KPI metrics, developing practical understanding of end-to-end data-to-dashboard delivery pipelines.
          </p>
          <blockquote className="reveal border-l-2 border-foreground/40 pl-5 mt-8 max-w-3xl">
            <p className="text-base md:text-lg font-light italic opacity-80 leading-relaxed">
              &quot;That&apos;s a fresher-level internship, and I&apos;m not going to dress it up as more than it was — but it&apos;s where I confirmed that I actually like this work, not just the idea of it.&quot;
            </p>
          </blockquote>
        </div>
      </div>

      {/* 04 — PHILOSOPHY CHAPTER (same copy, hairline, no card) */}
      <section className="border-t border-foreground/10 mt-16 md:mt-28 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute -top-6 right-2 md:right-12 text-[30vw] md:text-[11rem] leading-none font-black text-transparent opacity-10" style={{ WebkitTextStroke: "1px currentColor" }}>01</div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-16 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-8">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-40 md:col-span-3">04 / How I think<br />about the job</p>
          <div className="md:col-span-9">
            <p className="reveal text-3xl md:text-5xl font-semibold tracking-tighter leading-[1.02] max-w-[22ch]">
              A dashboard that looks good and tells you nothing is worse than no dashboard.
            </p>
            <p className="reveal text-base md:text-xl opacity-80 leading-relaxed font-light mt-6 max-w-[65ch]">
              My default question on any analysis is <span className="font-semibold italic border-b border-foreground/30 pb-0.5">&quot;what decision does this change?&quot;</span> If I can&apos;t answer that, I don&apos;t ship the chart. Whether tuning a fraud model for recall over false alarms or tracing exact revenue leaks, the goal is actionable clarity.
            </p>
          </div>
        </div>
      </section>

      {/* 05 — DIRECTION CHAPTER, dark inverse (same copy, no card) */}
      <section className="bg-zinc-950 text-white relative overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute -top-6 left-2 md:left-12 text-[30vw] md:text-[11rem] leading-none font-black text-transparent opacity-15" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>02</div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-16 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-9 order-2 md:order-1">
            <p className="reveal text-3xl md:text-5xl font-semibold tracking-tighter leading-[1.02] max-w-[24ch]">
              Data Analyst is where I&apos;m strongest <span className="text-white/40">right now.</span>
            </p>
            <p className="reveal text-base md:text-xl text-white/60 leading-relaxed font-light mt-6 max-w-[65ch]">
              ML Analyst work is a close second, though my model evaluations have been on practice datasets, not production systems at scale. Longer term, I&apos;m building towards AI engineering—which is exactly why I&apos;ve built full applications instead of stopping at Jupyter notebooks.
            </p>
          </div>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/40 md:col-span-3 order-1 md:order-2 md:text-right">05 / Where<br />I&apos;m headed</p>
        </div>
      </section>

      {/* 06 — ARSENAL INDEX (same tools, same icons) */}
      <section className="py-16 md:py-28 w-full max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-2 h-2 rounded-full bg-foreground animate-pulse"></span>
            <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-50">
              06 / Technical Arsenal
            </h2>
          </div>

          <div className="flex flex-col border-t-2 border-foreground/70">
            
            {/* Row 1: Languages & Analysis */}
            <div className="reveal arsenal-row py-8 md:py-10 border-b border-foreground/10 grid md:grid-cols-[280px_1fr] gap-4 items-center hover:pl-4 md:hover:pl-7 transition-all duration-500 group cursor-default">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                Languages &<br className="hidden md:block" /> Analysis
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 w-full">
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/python" alt="Python" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">Python</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/pandas" alt="Pandas" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">Pandas</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/numpy" alt="NumPy" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">NumPy</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/scikitlearn" alt="Scikit-learn" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">Scikit-learn</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/mysql" alt="MySQL" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">SQL</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/r" alt="R" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">R</span>
                </div>
              </div>
            </div>

            {/* Row 2: BI & Visualization */}
            <div className="reveal arsenal-row py-8 md:py-10 border-b border-foreground/10 grid md:grid-cols-[280px_1fr] gap-4 items-center hover:pl-4 md:hover:pl-7 transition-all duration-500 group cursor-default">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                BI &<br className="hidden md:block" /> Visualization
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 w-full">
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://www.svgrepo.com/show/354428/tableau-icon.svg" alt="Tableau" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">Tableau</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500"><mask id="prefix__a" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="200" y="0" width="1200" height="1600"><path d="M1333.25 0c36.86 0 66.75 29.885 66.75 66.75v1466.5c0 36.86-29.89 66.75-66.75 66.75H266.667c-36.819 0-66.667-29.85-66.667-66.67V866.667C200 829.848 229.848 800 266.667 800H525V466.667C525 429.848 554.848 400 591.667 400H850V66.75C850 29.885 879.885 0 916.75 0h416.5z" fill="#fff" /></mask><g mask="url(#prefix__a)"><path d="M1400 66.75v1466.5c0 36.86-29.89 66.75-66.75 66.75h-416.5c-36.865 0-66.75-29.89-66.75-66.75V66.75C850 29.885 879.885 0 916.75 0h416.5c36.87 0 66.75 29.885 66.75 66.75z" fill="url(#prefix__paint0_linear_8592:56198)" /><g filter="url(#prefix__filter0_dd_8592:56198)"><path d="M1075 466.667V1600H525V466.667C525 429.848 554.848 400 591.667 400h416.663c36.82 0 66.67 29.848 66.67 66.667z" fill="url(#prefix__paint1_linear_8592:56198)" /></g><path d="M200 866.667v666.663c0 36.82 29.848 66.67 66.667 66.67H750V866.667C750 829.848 720.152 800 683.333 800H266.667C229.848 800 200 829.848 200 866.667z" fill="url(#prefix__paint2_linear_8592:56198)" /></g><defs><linearGradient id="prefix__paint0_linear_8592:56198" x1="758.333" y1="0" x2="1447.82" y2="1507.15" gradientUnits="userSpaceOnUse"><stop stopColor="#E6AD10" /><stop offset="1" stopColor="#C87E0E" /></linearGradient><linearGradient id="prefix__paint1_linear_8592:56198" x1="524.955" y1="400" x2="1105.79" y2="1561.67" gradientUnits="userSpaceOnUse"><stop stopColor="#F6D751" /><stop offset="1" stopColor="#E6AD10" /></linearGradient><linearGradient id="prefix__paint2_linear_8592:56198" x1="199.955" y1="800" x2="519.784" y2="1581.68" gradientUnits="userSpaceOnUse"><stop stopColor="#F9E589" /><stop offset="1" stopColor="#F6D751" /></linearGradient><filter id="prefix__filter0_dd_8592:56198" x="391.667" y="300" width="816.667" height="1466.67" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /><feOffset dy="6.333" /><feGaussianBlur stdDeviation="6.333" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_8592:56198" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /><feOffset dy="33.333" /><feGaussianBlur stdDeviation="66.667" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" /><feBlend in2="effect1_dropShadow_8592:56198" result="effect2_dropShadow_8592:56198" /><feBlend in="SourceGraphic" in2="effect2_dropShadow_8592:56198" result="shape" /></filter></defs></svg>
                  <span className="text-xl md:text-2xl font-bold tracking-tight">Power BI</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/streamlit" alt="Streamlit" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">Streamlit</span>
                </div>
              </div>
            </div>

            {/* Row 3: Machine Learning */}
            <div className="reveal arsenal-row py-8 md:py-10 border-b border-foreground/10 grid md:grid-cols-[280px_1fr] gap-4 items-center hover:pl-4 md:hover:pl-7 transition-all duration-500 group cursor-default">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                Machine<br className="hidden md:block" /> Learning
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 w-full">
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl font-bold tracking-tight opacity-60 group-hover:opacity-100 transition-all duration-500">LightGBM</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl font-bold tracking-tight opacity-60 group-hover:opacity-100 transition-all duration-500">XGBoost</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl font-bold tracking-tight opacity-60 group-hover:opacity-100 transition-all duration-500">Random Forest</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl font-bold tracking-tight opacity-60 group-hover:opacity-100 transition-all duration-500">Logistical Regression</span>
                </div>
              </div>
            </div>

            {/* Row 4: Data & Cloud */}
            <div className="reveal arsenal-row py-8 md:py-10 border-b border-foreground/10 grid md:grid-cols-[280px_1fr] gap-4 items-center hover:pl-4 md:hover:pl-7 transition-all duration-500 group cursor-default">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                Data &<br className="hidden md:block" /> Cloud
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 w-full">
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/snowflake" alt="Snowflake" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">Snowflake</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/googlebigquery" alt="BigQuery" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">BigQuery</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333334 199332" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" className="w-9 h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500"><defs><style>{".fil1{fill:#f90}"}</style></defs><g id="Layer_x0020_1"><g id="amazon-web-services-2.svg"><path d="M93937 72393c0 4102 443 7428 1219 9867 887 2439 1996 5100 3548 7982 554 887 776 1774 776 2550 0 1109-665 2217-2106 3326l-6985 4656c-998 665-1995 998-2882 998-1109 0-2217-554-3326-1552-1552-1663-2882-3437-3991-5211-1109-1885-2217-3991-3437-6541-8648 10200-19512 15299-32594 15299-9312 0-16740-2661-22172-7982-5432-5322-8204-12417-8204-21286 0-9424 3326-17073 10089-22838s15743-8647 27161-8647c3769 0 7650 332 11752 887 4102 554 8315 1441 12749 2439v-8093c0-8426-1774-14301-5211-17738-3548-3437-9534-5100-18071-5100-3880 0-7871 443-11973 1441s-8093 2217-11973 3769c-1774 776-3104 1219-3880 1441s-1330 332-1774 332c-1552 0-2328-1109-2328-3437v-5432c0-1774 222-3104 776-3880s1552-1552 3104-2328c3880-1996 8537-3659 13969-4989C43606 885 49370 220 55468 220c13193 0 22838 2993 29046 8980 6098 5987 9202 15077 9202 27272v35920h222zM48926 89244c3659 0 7428-665 11419-1995s7539-3769 10532-7095c1774-2106 3104-4435 3770-7095 665-2661 1108-5876 1108-9645v-4656c-3215-776-6652-1441-10199-1885-3548-443-6984-665-10421-665-7428 0-12860 1441-16519 4435-3659 2993-5432 7206-5432 12749 0 5211 1330 9091 4102 11751 2661 2772 6541 4102 11641 4102zm89023 11973c-1996 0-3326-332-4213-1109-887-665-1663-2217-2328-4324l-26053-85697c-665-2217-998-3658-998-4434 0-1774 887-2772 2661-2772h10865c2106 0 3548 333 4324 1109 887 665 1552 2217 2217 4324l18625 73391 17295-73391c554-2217 1219-3659 2106-4324s2439-1109 4435-1109h8869c2106 0 3548 333 4435 1109 887 665 1663 2217 2106 4324l17516 74278 19180-74278c665-2217 1441-3659 2217-4324 887-665 2328-1109 4324-1109h10310c1774 0 2772 887 2772 2772 0 554-111 1109-222 1774s-333 1552-776 2772l-26718 85697c-665 2217-1441 3658-2328 4324-887 665-2328 1109-4213 1109h-9534c-2107 0-3548-333-4435-1109s-1663-2217-2106-4435l-17184-71507-17073 71396c-554 2217-1220 3658-2107 4434s-2439 1109-4434 1109h-9534zm142459 2993c-5765 0-11530-665-17073-1995s-9867-2772-12749-4435c-1774-998-2993-2106-3437-3104-443-998-665-2106-665-3104v-5654c0-2328 887-3437 2550-3437 665 0 1330 111 1995 333s1663 665 2772 1109c3769 1663 7871 2993 12195 3880 4435 887 8758 1330 13193 1330 6984 0 12417-1220 16186-3659s5765-5987 5765-10532c0-3104-998-5654-2993-7760-1996-2107-5765-3991-11197-5765l-16075-4989c-8093-2550-14080-6319-17738-11308-3658-4878-5543-10310-5543-16075 0-4656 998-8758 2993-12306s4656-6652 7982-9091c3326-2550 7095-4434 11530-5765S279190-2 284068-2c2439 0 4989 111 7428 443 2550 333 4878 776 7206 1219 2217 554 4324 1109 6319 1774s3548 1330 4656 1996c1552 887 2661 1774 3326 2771 665 887 998 2107 998 3659v5211c0 2328-887 3548-2550 3548-887 0-2328-444-4213-1331-6319-2882-13415-4324-21286-4324-6319 0-11308 998-14745 3104s-5211 5321-5211 9867c0 3104 1109 5765 3326 7871s6319 4213 12195 6097l15743 4989c7982 2550 13747 6098 17184 10643s5100 9756 5100 15521c0 4767-998 9091-2882 12860-1996 3770-4656 7095-8093 9756-3437 2771-7539 4767-12306 6208-4989 1552-10199 2328-15854 2328z" className="fill-[#252f3e] dark:fill-white" /><path className="fil1" d="M301362 158091c-36474 26940-89467 41241-135031 41241-63858 0-121395-23614-164854-62859-3437-3104-332-7317 3770-4878 47006 27272 104988 43791 164964 43791 40465 0 84921-8426 125830-25721 6097-2772 11308 3991 5321 8426z" /><path className="fil1" d="M316550 140796c-4656-5987-30820-2883-42682-1441-3548 443-4102-2661-887-4989 20842-14634 55099-10421 59090-5543 3991 4989-1109 39246-20620 55653-2993 2550-5876 1220-4545-2106 4435-10976 14301-35698 9645-41574z" /></g></g></svg>
                  <span className="text-xl md:text-2xl font-bold tracking-tight">AWS</span>
                </div>
              </div>
            </div>

            {/* Row 5: Web & Workflow */}
            <div className="reveal arsenal-row py-8 md:py-10 border-b border-foreground/10 grid md:grid-cols-[280px_1fr] gap-4 items-center hover:pl-4 md:hover:pl-7 transition-all duration-500 group cursor-default">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                Web &<br className="hidden md:block" /> Workflow
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 w-full">
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/fastapi" alt="FastAPI" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">FastAPI</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/react" alt="React" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">React</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/git" alt="Git" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">Git</span>
                </div>
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/jira" alt="Jira" className="w-7 h-7 md:w-9 md:h-9 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight">Jira / Agile</span>
                </div>
              </div>
            </div>

          </div>
      </section>

      {/* 07 — CTA (reuses the philosophy line) */}
      <section className="border-t border-foreground/10">
        <Link to="/contact" className="max-w-[1400px] mx-auto px-4 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-6 items-end group block">
          <div className="md:col-span-9">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-40">07 / Contact</p>
            <p className="reveal text-4xl md:text-6xl font-semibold tracking-tighter leading-none mt-3 group-hover:translate-x-2 transition-transform duration-500">What decision<br />can I change <span className="opacity-30">for you?</span></p>
          </div>
          <span className="md:col-span-3 font-mono text-xs tracking-[0.16em] uppercase md:text-right">Contact <span aria-hidden>→</span></span>
        </Link>
      </section>

    </div>
  );
}
