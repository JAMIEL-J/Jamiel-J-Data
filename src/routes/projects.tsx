import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { X, ArrowRight, Github, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/projects")({
  component: Projects,
});

const CASE_STUDIES = [
  {
    title: "Revenue Leak Detection",
    tag: "Data Case Study",
    excerpt: "End-to-End E-commerce Conversion Funnel Optimization.",
    liveLink: "https://public.tableau.com/views/RevenueLeakAnalysis/E-commerceFunnelRevenueLeakageAnalysis?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    githubLink: "https://github.com/JAMIEL-J/Conversion-Funnel-Analysis",
    fullSpecs: {
      problem: "\"Why are users viewing products but not completing purchases? Where exactly is the funnel breaking?\" This project identifies where revenue is being lost in an e-commerce conversion funnel and provides data-driven recommendations to optimize user journeys and maximize revenue.",
      keyFindings: {
        metrics: [
          { label: "Revenue Leakage Identified", value: "$1.14M+" },
          { label: "Drop-offs (View → Cart)", value: "73,961" },
          { label: "Desktop Revenue Leak", value: "$835K" },
          { label: "Overall Conversion Rate", value: "9.3%" }
        ],
        table: [
          { stage: "Product View → Add to Cart", lost: "73,961", impact: "$1,141,441", priority: "🔴 CRITICAL" },
          { stage: "Add to Cart → Checkout", lost: "27,716", impact: "$427,742", priority: "🟡 Medium" },
          { stage: "Checkout → Purchase", lost: "10,837", impact: "$167,248", priority: "🟢 Low" }
        ],
        insight: "💡 Key Insight: The Product View → Add to Cart stage accounts for ~65-70% of total revenue leakage. Optimizing this stage offers the highest ROI.",
        action: "Executive Priority: Product View → Add to Cart  |  Expected Outcome: Highest ROI stage optimization"
      },
      specs: [
        "Identified $1.14M+ in revenue leakage as measured by isolating 73,961 critical session drop-offs, by constructing an end-to-end e-commerce conversion funnel using BigQuery SQL.",
        "Pinpointed an $835K segment-specific revenue leak as measured by desktop conversion variance, by conducting exploratory data analysis on 132,403 user sessions using Python and Tableau.",
        "Formulated targeted funnel optimization strategies as measured by capturing a 65% high-ROI leakage point, by developing actionable UI/UX recommendations for the Product View to Add to Cart stage."
      ]
    },
    metrics: ["Google BigQuery", "SQL", "Python", "Tableau"]
  },
  {
    title: "Customer Churn Prediction",
    tag: "Analysis & Model",
    excerpt: "Business-aware retention optimization using threshold tuning and ROI analysis.",
    liveLink: "https://customer-churn-predictionss.streamlit.app/",
    githubLink: "https://github.com/JAMIEL-J/Customer-Churn-Prediction",
    fullSpecs: {
      problem: "Customer churn directly impacts revenue. Traditional ML models predict churn but don't specify who to contact or how much to spend. Without proper threshold optimization, businesses either overspend on retention or miss at-risk customers.",
      solution: "Hypothesis-driven feature engineering based on validated business assumptions. Implemented a cost-benefit analysis using business metrics (CLV, retention cost, success rate) to optimize decision thresholds based purely on ROI rather than ML accuracy.",
      howItWorks: "Constructed segment-specific strategies for high-value vs. low-value customers. Deployed an interactive Streamlit dashboard allowing stakeholders to explore decision trade-offs, tweak thresholds dynamically, and visualize the cost matrix.",
      specs: [
        "📊 Exploratory Data Analysis: 14 business hypotheses validated",
        "🔧 Feature Engineering: 24 hypothesis-driven features across 3 buckets",
        "🤖 Baseline Modeling: Logistic Regression + Random Forest (interpretable)",
        "💰 Business Impact Analysis: Cost matrix, threshold sweep, ROI optimization",
        "👥 Customer Segmentation: Value-based targeting with dynamic thresholds",
        "📈 Interactive Dashboard: Built with Streamlit for decision support"
      ]
    },
    metrics: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "Matplotlib"]
  },
  {
    title: "Customer Segmentation & Revenue Analysis",
    tag: "Data Case Study",
    excerpt: "Strategic RFM Segmentation to identify revenue concentration and retention risk.",
    liveLink: "https://public.tableau.com/views/CustomerSegmentdashboard/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    githubLink: "https://github.com/JAMIEL-J/Customer-segmentation-RFM",
    fullSpecs: {
      problem: "Many businesses apply uniform marketing and retention strategies across all customers, resulting in inefficient spend. This project analyzes customer-level revenue concentration and retention risk using RFM (Recency, Frequency, Monetary) segmentation. The goal is to answer: Which customers actually drive revenue, and where should retention efforts be focused to protect future revenue?",
      solution: "The project follows a production-style analytics pipeline (SQL → Python → Power BI). SQL was used as the primary analytics engine to clean data and aggregate transactions to compute RFM metrics. Python was used for validation, ensuring segment sizes and revenue distributions were logically consistent. Finally, an interactive Power BI dashboard was built to communicate insights clearly, using rule-based segmentation to ensure interpretability for stakeholders.",
      keyFindings: {
        metrics: [
          { label: "High-Value Revenue", value: "~80%" },
          { label: "Segmentation", value: "RFM" },
          { label: "Data Source", value: "Transactions" },
          { label: "Approach", value: "Rule-Based" }
        ],
        insightsList: [
          {
            title: "1️⃣ Revenue Is Highly Concentrated Among High-Value Customers",
            finding: "A relatively small group of High-Value customers contributes ~80% of total revenue.",
            impact: "Heavy reliance on a small customer subset.",
            implication: "Revenue stability depends heavily on retaining this small customer subset."
          },
          {
            title: "2️⃣ At-Risk High-Value Customers Represent the Largest Revenue Threat",
            finding: "Customers with strong historical value but declining recency pose a significant retention risk.",
            impact: "High potential revenue loss.",
            implication: "Losing a small number of these customers would have an outsized revenue impact."
          },
          {
            title: "3️⃣ Low-Value and Lost Customers Form a Large Base but Generate Minimal Revenue",
            finding: "A large share of customers contributes little to overall revenue.",
            impact: "Inefficient spend on broad campaigns.",
            implication: "Broad acquisition or blanket retention campaigns are inefficient."
          },
          {
            title: "4️⃣ Revenue Distribution Is Heavily Skewed",
            finding: "Customer revenue follows a long-tail distribution.",
            impact: "One-size-fits-all approaches fail.",
            implication: "Targeted, segment-specific strategies significantly outperform blanket approaches."
          }
        ],
        insight: "💡 Key Learnings: Separating responsibilities across tools improves clarity: SQL for data logic, Python for validation, and Power BI for communication. Customer-level analysis reveals risks hidden in aggregate sales metrics.",
        action: "Deliverable: Executive Power BI Dashboard for targeted retention strategies."
      },
      specs: [
        "SQL (MySQL): Cleaned transactional data, engineered RFM features, and applied rule-based segmentation.",
        "Python (pandas, SQLAlchemy): Validated SQL-derived metrics and verified segment consistency.",
        "Power BI: Built an executive dashboard with KPI cards and interactive slicers for dynamic exploration.",
        "Dataset Constraints: Addressed returns/negative quantities, skewed revenue, and one-time vs repeat buyers."
      ]
    },
    metrics: ["MySQL", "Python", "Power BI", "Pandas"]
  },
  {
    title: "Demand Forecasting & Inventory",
    tag: "Analysis & Model",
    excerpt: "End-to-End Decision-Support System for Retail Supply Chains.",
    liveLink: "https://demand-forecasting-and-inventory-optimization.streamlit.app/",
    githubLink: "https://github.com/JAMIEL-J/Demand-Forecasting-and-Inventory-Optimization",
    fullSpecs: {
      problem: "Retail businesses incur major losses from stockouts and excess inventory due to uncertain demand. Ordering the average expected demand results in a ~50% stockout probability under skewed distributions, as most systems ignore risk.",
      keyFindings: {
        metrics: [
          { label: "Best WAPE Error", value: "4.01%" },
          { label: "Baseline Improv.", value: "+31.7%" },
          { label: "Service Coverage", value: "~90%" },
          { label: "Locations Scaled", value: "45" }
        ],
        tableHeaders: ["Model", "Error (WAPE)", "Error (MAE)", "Rank"],
        table: [
          { stage: "XGBoost", lost: "4.01% WAPE", impact: "64,190 MAE", priority: "🏆 Best" },
          { stage: "Prophet", lost: "5.36% WAPE", impact: "84,610 MAE", priority: "🥈 2nd" },
          { stage: "Seasonal Naive", lost: "5.87% WAPE", impact: "61,384 MAE", priority: "🥉 3rd" },
          { stage: "SARIMAX", lost: "9.52% WAPE", impact: "150,265 MAE", priority: "❌ Worst" }
        ],
        insight: "✅ Why XGBoost Was Selected: 31.7% improvement over baseline. Non-linear modeling of drivers (CPI, fuel, holidays) and native Quantile Regression (Q10/Q50/Q90) for uncertainty estimation.",
        action: "Outcome: Answers 'How much should we stock to achieve a target service level at minimum cost?'"
      },
      solution: "Converts multi-horizon demand forecasts into statistically sound inventory policies by explicitly modeling uncertainty using Quantile Regression (estimating demand at 10th, 50th, and 90th percentiles).",
      specs: [
        "Optimized retail supply chain inventory policies modeling non-linear demand via XGBoost Quantile Regression.",
        "Translated predicted forecast intervals into dynamic inventory formulas for safety stock & reorder points.",
        "Deployed a real-time risk simulation interface using Streamlit and Plotly for dynamic scenario stress-testing."
      ]
    },
    metrics: ["Python", "XGBoost", "Streamlit", "Plotly", "Pandas"]
  },
  {
    title: "Sales Performance & Territory Optimization",
    tag: "Data Case Study",
    excerpt: "E-commerce sales analysis identifying revenue concentration and scalability.",
    liveLink: "https://public.tableau.com/views/SalesanalysisDashboard_17684576286910/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    githubLink: "https://github.com/JAMIEL-J/Sales-performance-Optimization",
    fullSpecs: {
      problem: "This project analyzes e-commerce sales performance to identify revenue concentration risks, territory inefficiencies, and seller dependency patterns. Using cleaned transactional data, the analysis focuses on where revenue comes from, who drives it, and where scalable growth opportunities exist.",
      keyFindings: {
        metrics: [
          { label: "Total Orders", value: "98,666" },
          { label: "Total Sales Rev", value: "R$13.59M" },
          { label: "Gross Revenue", value: "R$15.84M" },
          { label: "Avg Item Price", value: "R$120.65" }
        ],
        insightsList: [
          {
            title: "1️⃣ Revenue Is Highly Concentrated Geographically",
            finding: "Top 3 customer states (SP, RJ, MG) contribute ~63% of total revenue.",
            impact: "Heavy reliance on single state (São Paulo contributes ~38% revenue).",
            implication: "Strong demand but significant geographic concentration risk."
          },
          {
            title: "2️⃣ Seller-Side Concentration Exceeds Customer Demand",
            finding: "Sellers based in São Paulo generate ~64% of total platform revenue.",
            impact: "Revenue risk is driven more by seller concentration than customer demand.",
            implication: "Significant supply-side dependency."
          },
          {
            title: "3️⃣ A Small Group of Sellers Dominates Revenue",
            finding: "Top Performers generate R$200K+ individually, while Low Performers generate <R$1,000 despite multiple orders.",
            impact: "High variance in seller execution and revenue contribution.",
            implication: "High dependency on top sellers and inefficiency among low-value sellers."
          },
          {
            title: "4️⃣ Mid-Tier States Offer the Best Growth Opportunity",
            finding: "Target Regions: RS, PR, SC, BA show meaningful revenue without heavy saturation.",
            impact: "Untapped regional markets with favorable demand-to-seller ratios.",
            implication: "Higher ROI for seller expansion and regional marketing."
          }
        ],
        insight: "💡 Key Takeaway: Sales growth is constrained not by demand, but by execution concentration and seller dependency. Optimizing seller distribution, reducing over-reliance on a few regions, and focusing on mid-tier states can unlock scalable growth without increasing acquisition costs.",
        action: "Deliverable: Tableau dashboard for stakeholders to monitor sales KPIs, compare demand vs. supply, and assess category concentration."
      },
      solution: "Implemented a staging → clean table pattern to handle data integrity: handling missing numeric values, correcting empty timestamps, and resolving precision issues in geographic data. Built a unified sales_fact table at order-item granularity to support all downstream analysis. Each row represents one delivered order item enriched with customer/seller geography and revenue metrics.",
      specs: [
        "Identified geographic revenue concentration risk (~63% of revenue from 3 states).",
        "Quantified severe supply-side seller dependency (~64% of platform revenue reliant on SP sellers).",
        "Formulated scalable expansion strategies targeting mid-tier regional markets for optimized ROI."
      ]
    },
    metrics: ["MySQL", "Python", "Tableau", "Pandas"]
  },
  {
    title: "Customer Support SLA & Satisfaction Analysis",
    tag: "Interactive Dashboard",
    excerpt: "Interactive Excel dashboard identifying SLA breaches and satisfaction drivers.",
    githubLink: "https://github.com/JAMIEL-J/Customer-Support-SLA-Satisfaction-Analysis-Using-Excel",
    details: [
      "Identified critical customer support operational bottlenecks as measured by detecting a 47.29% resolution SLA breach and 55% first response delay, by building an interactive Pivot Chart dashboard and mapping SLA threshold rules in Excel.",
      "Flagged severe high-risk ticket priority failures as measured by uncovering an 88.43% SLA breach rate for urgent issues, by conducting calculated field analysis on response and resolution times using Excel logic functions.",
      "Correlated first-time resolution quality directly to customer satisfaction as measured by determining that 86.02% of reopened tickets resulted in low satisfaction scores, by structuring a multi-dimensional pivot analysis of 2,800 historical ticket records."
    ],
    metrics: ["Microsoft Excel", "Pivot Tables", "Data Validation", "XLOOKUP"]
  },
  {
    title: "Vizzy Pilot",
    tag: "Flagship System",
    excerpt: "Natural language to validated SQL. Features an interactive BI canvas with automated data cleaning and hybrid execution routing.",
    githubLink: "https://github.com/JAMIEL-J/Vizzy-Pilot",
    fullSpecs: {
      problem: "Data teams face a severe workflow bottleneck when non-technical stakeholders require custom aggregations or transformations, forcing analysts to manually write and debug SQL. Ad-hoc transformations without tracking severely degrade data trust.",
      solution: "Vizzy Pilot translates natural language queries into validated database operations, delivering results directly onto an interactive business intelligence canvas. It handles end-to-end data preparation—from automated cleaning to rendering cross-filtering charts, KPIs, and calculated fields derived purely from NL.",
      howItWorks: "Natural language is routed to a FastAPI backend where Groq/Gemini generates SQL. An automated cleaning pipeline executes outlier capping, missing value interpolation, and duplicate removal. The execution router evaluates dataset size—routing to Pandas for <100K rows and DuckDB for >100K rows. Results stream via SSE to a Zustand store, powering dynamic client-side cross-filtering.",
      specs: [
        "Interactive BI canvas: NL-derived charts, KPIs & calculated fields",
        "Automated Cleaning: Interpolation, outlier capping, string trimming",
        "Cross-filtering: Instant client-side recalculation via Zustand",
        "Performance: 2.77ms p95 simple filters, 55ms p95 multi-aggregations",
        "Ingestion: 100MB CSV ingested & cleaned in 2.3s (610K rows/sec)",
        "Stack: React 19, FastAPI, DuckDB, SQLGlot, Groq/Gemini"
      ]
    },
    metrics: ["React 19", "FastAPI", "DuckDB"]
  },
  {
    title: "DNA — Local AI Assistant",
    tag: "Flagship System",
    excerpt: "A fully local voice assistant engineered for low-end hardware (Intel i3, 8GB RAM, no GPU).",
    githubLink: "https://github.com/JAMIEL-J/DNA-Desktop-Assistant-",
    fullSpecs: {
      problem: "Running AI voice assistants locally typically requires expensive high-end GPUs. Furthermore, standard orchestration frameworks like LangChain introduce severe latency bottlenecks on low-end hardware.",
      solution: "DNA is a fully localized voice assistant built specifically to run on an Intel i3 laptop with 8GB RAM and no GPU. It completely bypasses heavy frameworks, utilizing direct API execution and INT8 quantization.",
      howItWorks: "Configured openWakeWord for triggers. Integrated faster-whisper (INT8 quantized) with Voice Activity Detection, and Piper for zero-latency TTS. The core reasoning operates on a custom state-machine with vision models for screen parsing and automated file organization.",
      specs: [
        "Runs locally on Intel i3 / 8GB RAM (Zero GPU)",
        "INT8 Quantized execution for faster-whisper",
        "Direct API reasoning (No LangChain overhead)",
        "Custom wake-word triggers bypass audio buffer lag",
        "Python, Gemma 4, Piper, openWakeWord"
      ]
    },
    metrics: ["Python", "Gemma 4", "openWakeWord"]
  }
];

const CHAPTER_PROOF: Record<string, { value: string; label: string; fact: string }> = {
  "Revenue Leak Detection": { value: "$1.14M+", label: "Revenue leakage identified", fact: "73,961 drop-offs · View → Cart" },
  "Customer Churn Prediction": { value: "$106K+", label: "Net ROI modeled", fact: "Cost matrix · threshold sweep" },
  "Customer Segmentation & Revenue Analysis": { value: "~80%", label: "High-value revenue share", fact: "RFM · rule-based segments" },
  "Demand Forecasting & Inventory": { value: "4.01%", label: "Best WAPE error", fact: "45 locations scaled" },
  "Sales Performance & Territory Optimization": { value: "R$13.59M", label: "Total sales revenue", fact: "98,666 orders · avg R$120.65" },
  "Customer Support SLA & Satisfaction Analysis": { value: "47.29%", label: "Resolution SLA breach", fact: "2,800 tickets · Excel dashboard" },
  "Vizzy Pilot": { value: "<65ms", label: "p95 multi-aggregation", fact: "100MB ingested & cleaned in 2.3s" },
  "DNA — Local AI Assistant": { value: "Zero GPU", label: "Intel i3 · 8GB RAM", fact: "INT8 faster-whisper · openWakeWord" },
};

function Projects() {
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [filterTag, setFilterTag] = useState<string>("All");
  const panelRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  const tags = ["All", ...Array.from(new Set(CASE_STUDIES.map(c => c.tag)))];
  const filteredProjects = filterTag === "All" ? CASE_STUDIES : CASE_STUDIES.filter(c => c.tag === filterTag);
  const activeIdx = activeProject ? filteredProjects.indexOf(activeProject) : -1;

  const stepProject = (dir: number) => {
    if (activeIdx < 0 || filteredProjects.length === 0) return;
    const next = filteredProjects[(activeIdx + dir + filteredProjects.length) % filteredProjects.length];
    setActiveProject(next);
  };

  useEffect(() => {
    // Lock body scroll AND stop Lenis when viewer is open (overflow alone can't stop virtual scroll)
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenisRef.current?.start();
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeProject]);

  useEffect(() => {
    // Lenis smooth scroll, driven once via the GSAP ticker (same pattern as home — no double RAF, no GSAP conflict)
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // No smoothing — filters simply hide once scrolled past the header
      const onScroll = () => {
        const bar = filterBarRef.current;
        if (bar) bar.classList.toggle("pj-filters-hidden", window.scrollY > 160);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const isMobile = window.innerWidth < 768;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      autoRaf: false,
      duration: 0.7,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      lerp: isMobile || isTouch ? 0.18 : 0.16,
      smoothWheel: true,
      syncTouch: false,
      gestureOrientation: "vertical",
      touchMultiplier: 1.0,
    });
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      // Filters live only at the top — hide once scrolled past the header
      const bar = filterBarRef.current;
      if (bar) {
        const y = typeof e?.scroll === "number" ? e.scroll : window.scrollY;
        bar.classList.toggle("pj-filters-hidden", y > 160);
      }
    });
    lenisRef.current = lenis;
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: "power3.out", delay: 0.05, overwrite: "auto" }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Chapters slide in alternating with their layout direction, once each
      gsap.utils.toArray<HTMLElement>(".pj-from-left .pj-slide").forEach((el) => {
        el.style.willChange = "transform, opacity";
        gsap.fromTo(
          el,
          { x: -72, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            onComplete: () => (el.style.willChange = "auto"),
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".pj-from-right .pj-slide").forEach((el) => {
        el.style.willChange = "transform, opacity";
        gsap.fromTo(
          el,
          { x: 72, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            onComplete: () => (el.style.willChange = "auto"),
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".pj-lines").forEach((group) => {
        const kids = Array.from(group.children);
        gsap.fromTo(
          kids,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          }
        );
      });
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [filterTag]);

  useEffect(() => {
    if (!activeProject) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollTo(0, 0);
    if (prefersReduced) return;
    gsap.fromTo(
      ".pj-panel-inner",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" }
    );
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative z-10 pt-32 md:pt-40 pb-10 px-4 md:px-12 max-w-[1400px] mx-auto flex flex-col items-center text-center">
        <p className="hero-text font-mono text-[11px] tracking-[0.18em] uppercase opacity-50">
          Archive — {String(CASE_STUDIES.length).padStart(2, "0")} works · scroll, one case fills the screen
        </p>
        <h1 className="hero-text whitespace-nowrap text-[11vw] md:text-[8rem] font-bold uppercase tracking-tighter leading-[0.85] mt-4">
          Case Studies
        </h1>
      </div>

      {/* Sticky filter bar */}
      <div ref={filterBarRef} className="pj-filters sticky top-24 z-30 bg-background/85 backdrop-blur-md border-y border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-3 flex gap-2 overflow-x-auto">
          {tags.map(tag => {
            const count = tag === "All" ? CASE_STUDIES.length : CASE_STUDIES.filter(c => c.tag === tag).length;
            const on = filterTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`font-mono text-[11px] tracking-[0.14em] uppercase px-5 py-2 rounded-full border whitespace-nowrap transition-colors ${
                  on
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent border-foreground/20 hover:border-foreground"
                }`}
              >
                {tag} · {String(count).padStart(2, "0")}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pj-wrap">
        {filteredProjects.map((c, i) => {
          const proof = (CHAPTER_PROOF as Record<string, { value: string; label: string; fact: string }>)[c.title];
          const dark = c.tag === "Flagship System";
          const flip = i % 2 === 1;
          const num = String(i + 1).padStart(2, "0");
          return (
            <section
              key={c.title}
              className={`pj-ch group ${flip ? "pj-from-right" : "pj-from-left"} relative overflow-hidden border-b border-foreground/10 ${dark ? "bg-zinc-950 text-white" : ""}`}
            >
              <div aria-hidden className={`pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:scale-y-100 ${dark ? "bg-white" : "bg-foreground"}`} />
              <div className={`pj-slide relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 min-h-[100dvh] flex flex-col justify-center py-14 md:py-20 transition-colors duration-500 ${dark ? "group-hover:text-zinc-950" : "group-hover:text-background"}`}>
                <div className="pj-lines flex flex-col items-center text-center">
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-50">{num} // {c.tag}</p>
                  <h2 className="md:whitespace-nowrap text-4xl md:text-[3.2rem] font-bold tracking-tighter leading-none uppercase mt-5">{c.title}</h2>
                </div>
                <div className="grid md:grid-cols-12 gap-0 items-stretch mt-10 md:mt-14">
                <div className={`md:col-span-7 flex flex-col items-center text-center py-2 ${flip ? "order-1 md:order-2 md:pl-[3vw]" : "order-1 md:pr-[3vw]"}`}>
                  <div className="pj-lines flex flex-col items-center">
                    <p className="text-base opacity-70 leading-relaxed max-w-[65ch] mt-0">{c.excerpt}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                      {c.metrics.slice(0, 3).map((metric, mi) => (
                        <span
                          key={metric}
                          className={`font-mono text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border whitespace-nowrap ${
                            mi === 0
                              ? dark
                                ? "bg-white text-zinc-950 border-white group-hover:bg-zinc-950 group-hover:text-white group-hover:border-zinc-950"
                                : "bg-foreground text-background border-foreground group-hover:bg-background group-hover:text-foreground group-hover:border-background"
                              : dark
                                ? "border-white/20 group-hover:border-zinc-950/25"
                                : "border-foreground/20 group-hover:border-background/25"
                          }`}
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => setActiveProject(c)}
                        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full transition-all active:scale-[0.98] ${
                          dark ? "bg-white text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white hover:opacity-85" : "bg-foreground text-background group-hover:bg-background group-hover:text-foreground hover:opacity-85"
                        }`}
                      >
                        Open case <ArrowRight size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`md:col-span-5 flex flex-col items-center text-center py-2 relative ${flip ? "order-2 md:order-1 md:pr-[3vw]" : "md:pl-[3vw]"}`}>
                  {proof && (
                    <div className="pj-lines flex flex-col">
                      <p className="font-mono text-6xl md:text-8xl font-semibold tracking-tighter">{proof.value}</p>
                      <p className="font-mono text-[11px] tracking-[0.16em] uppercase opacity-50 mt-2">{proof.label}</p>
                      <div className={`border-t mt-6 pt-4 font-mono text-xs opacity-60 flex justify-between gap-6 ${dark ? "border-white/15 group-hover:border-zinc-950/15" : "border-foreground/10 group-hover:border-background/15"}`}>
                        <span>{proof.fact}</span>
                        <span>Fig. {num}</span>
                      </div>
                    </div>
                  )}
                  <div
                    aria-hidden
                    className={`pointer-events-none select-none absolute top-8 text-[26vw] md:text-[10rem] leading-none font-extrabold text-transparent opacity-10 ${flip ? "left-4 md:left-0" : "right-4 md:right-0"}`}
                    style={{ WebkitTextStroke: dark ? "1px rgba(255,255,255,0.5)" : "1px currentColor" }}
                  >
                    {num}
                  </div>
                </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Full-width story viewer */}
      {activeProject && (
        <div ref={panelRef} data-lenis-prevent className="pj-panel fixed inset-0 z-[60] bg-background text-foreground overflow-y-auto" role="dialog" aria-modal="true" aria-label={activeProject.title}>
          <div className="sticky top-0 z-10 bg-background/85 backdrop-blur-md border-b border-foreground/10">
            <div className="max-w-[1400px] mx-auto px-5 md:px-16 py-4 flex items-center justify-between">
              <button onClick={() => setActiveProject(null)} className="font-mono text-xs tracking-[0.16em] uppercase hover:opacity-70 transition-opacity">
                ← Archive
              </button>
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase opacity-40">
                {activeIdx + 1} / {filteredProjects.length}
              </span>
              <button onClick={() => setActiveProject(null)} aria-label="Close case study" className="p-2 hover:opacity-60 transition-opacity">
                <X size={22} />
              </button>
            </div>
          </div>

          <div className="pj-panel-inner max-w-[1400px] mx-auto px-5 md:px-16 pt-10 md:pt-16">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-50 text-center">{activeProject.tag}</p>
            <h2 className="md:whitespace-nowrap text-4xl md:text-[3rem] font-bold tracking-tighter leading-[0.95] mt-4 mx-auto text-center">{activeProject.title}</h2>
            <p className="text-lg md:text-xl opacity-60 leading-relaxed mt-4 max-w-[60ch] mx-auto text-center">{activeProject.excerpt}</p>

            <div className="flex flex-wrap justify-center items-center gap-3 mt-7">
              {activeProject.liveLink && (
                <a href={activeProject.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity">
                  <ExternalLink size={16} />
                  Live Preview
                </a>
              )}
              {activeProject.githubLink && (
                <a href={activeProject.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-foreground/20 text-sm font-semibold hover:opacity-70 transition-opacity">
                  <Github size={16} />
                  Source Code
                </a>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {activeProject.metrics.map((metric: string) => (
                <span key={metric} className="font-mono text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border border-foreground/20">
                  {metric}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 pb-8">
              <article className="lg:col-span-12">

                {/* If rich fullSpecs exist */}
                {activeProject.fullSpecs ? (
                  <div className="flex flex-col">
                    {activeProject.fullSpecs.problem && (
                      <div id="pj-problem" className="border-t border-foreground/10 pt-8 scroll-mt-24">
                        <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-50 mb-4">The business problem</h3>
                        <p className="text-lg opacity-90 leading-relaxed italic border-l-2 border-black/25 pl-5">{activeProject.fullSpecs.problem}</p>
                      </div>
                    )}

                    {activeProject.fullSpecs.keyFindings && (
                      <div id="pj-findings" className="mt-12 scroll-mt-24">
                        <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-50">Key findings</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 rounded-[1.25rem] overflow-hidden mt-5 border border-foreground/10">
                          {activeProject.fullSpecs.keyFindings.metrics.map((m: any, i: number) => (
                            <div key={i} className="bg-card p-5 md:p-6 min-w-0">
                              <span className="font-mono text-lg md:text-2xl font-semibold tracking-tight leading-none block">{m.value}</span>
                              <span className="block font-mono text-[10px] tracking-[0.12em] uppercase opacity-50 mt-2 leading-snug">{m.label}</span>
                            </div>
                          ))}
                        </div>

                      {activeProject.fullSpecs.keyFindings.insightsList && (
                        <div className="flex flex-col gap-4 mt-6">
                          {activeProject.fullSpecs.keyFindings.insightsList.map((insight: any, i: number) => (
                            <div key={i} className="rounded-[1.25rem] bg-card border border-foreground/10 p-5 md:p-6">
                              <h4 className="text-lg md:text-xl font-semibold tracking-tight mb-3 text-balance">{insight.title}</h4>
                              <p className="text-sm md:text-base text-zinc-600 leading-relaxed"><span className="font-semibold uppercase tracking-widest text-xs opacity-50 mr-2">Finding:</span> {insight.finding}</p>
                              <p className="text-sm md:text-base text-zinc-600 leading-relaxed mt-1"><span className="font-semibold uppercase tracking-widest text-xs opacity-50 mr-2">Impact:</span> {insight.impact}</p>
                              <p className="text-sm md:text-base leading-relaxed mt-3"><span className="font-semibold uppercase tracking-widest text-xs mr-2">Implication:</span> {insight.implication}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeProject.fullSpecs.keyFindings.table && (
                        <div id="pj-table" className="mt-6 rounded-[1.25rem] border border-foreground/10 overflow-hidden scroll-mt-24">
                          <table className="w-full text-left text-sm bg-card">
                            <thead>
                              <tr className="bg-foreground/5 font-mono text-[10px] tracking-[0.14em] uppercase opacity-60">
                                {(activeProject.fullSpecs.keyFindings.tableHeaders || ["Funnel Stage", "Sessions Lost", "Revenue Impact", "Priority"]).map((header: string, idx: number) => (
                                  <th key={idx} className="px-4 md:px-6 py-3 font-medium whitespace-nowrap">{header}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {activeProject.fullSpecs.keyFindings.table.map((row: any, i: number) => (
                                <tr key={i} className="border-t border-foreground/10">
                                  <td className="px-4 md:px-6 py-4 font-medium">{row.stage}</td>
                                  <td className="px-4 md:px-6 py-4 font-mono">{row.lost}</td>
                                  <td className="px-4 md:px-6 py-4 font-mono font-semibold">{row.impact}</td>
                                  <td className="px-4 md:px-6 py-4 font-mono text-xs">{row.priority}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="flex flex-col gap-4 mt-6">
                        <p className="text-base md:text-lg text-foreground/80 leading-relaxed">{activeProject.fullSpecs.keyFindings.insight}</p>
                        <p className="font-mono text-xs inline-block w-fit px-4 py-2 rounded-lg bg-foreground text-background">{activeProject.fullSpecs.keyFindings.action}</p>
                      </div>
                    </div>
                  )}

                    {activeProject.fullSpecs.solution && (
                      <div className="mt-12">
                        <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-50 mb-4">What it solves</h3>
                        <p className="text-lg text-foreground/80 leading-relaxed">{activeProject.fullSpecs.solution}</p>
                      </div>
                    )}
                    {activeProject.fullSpecs.howItWorks && (
                      <div className="mt-10">
                        <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-50 mb-4">How it works</h3>
                        <p className="text-lg text-foreground/80 leading-relaxed">{activeProject.fullSpecs.howItWorks}</p>
                      </div>
                    )}
                    {activeProject.fullSpecs.specs && (
                      <div id="pj-impact" className="mt-12 scroll-mt-24">
                        <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-50">Performance & impact</h3>
                        <div className="mt-2 border-t border-foreground/10 lg:grid lg:grid-cols-2 lg:gap-x-12">
                          {activeProject.fullSpecs.specs.map((spec: string, idx: number) => (
                            <div key={idx} className="flex gap-6 py-6 border-b border-foreground/10">
                              <span className="font-mono text-sm opacity-40">{String(idx + 1).padStart(2, "0")}</span>
                              <p className="text-lg leading-relaxed opacity-90">{spec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Fallback for simple details */
                  activeProject.details && (
                    <div id="pj-impact" className="mt-12 scroll-mt-24">
                      <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-50">Technical specifications</h3>
                      <div className="mt-2 border-t border-foreground/10 lg:grid lg:grid-cols-2 lg:gap-x-12">
                        {activeProject.details.map((detail: string, idx: number) => (
                          <div key={idx} className="flex gap-6 py-6 border-b border-foreground/10">
                            <span className="font-mono text-sm opacity-40">{String(idx + 1).padStart(2, "0")}</span>
                            <p className="text-lg leading-relaxed opacity-90">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </article>
            </div>

            <div className="border-t border-foreground/10 mt-4 py-8 flex justify-between items-center gap-4">
              <button onClick={() => stepProject(-1)} className="text-sm font-semibold hover:opacity-70 transition-opacity text-left">
                ← Prev · {filteredProjects[(activeIdx - 1 + filteredProjects.length) % filteredProjects.length]?.title}
              </button>
              <button onClick={() => stepProject(1)} className="text-sm font-semibold hover:opacity-70 transition-opacity text-right">
                Next · {filteredProjects[(activeIdx + 1) % filteredProjects.length]?.title} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
