import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { X, ArrowRight, Github, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
          { label: "Total Sales Rev", value: "₹13.59M" },
          { label: "Gross Revenue", value: "₹15.84M" },
          { label: "Avg Item Price", value: "₹120.65" }
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
            finding: "Top Performers generate ₹200K+ individually, while Low Performers generate <₹1,000 despite multiple orders.",
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

function Projects() {
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [filterTag, setFilterTag] = useState<string>("All");

  const tags = ["All", ...Array.from(new Set(CASE_STUDIES.map(c => c.tag)))];
  const filteredProjects = filterTag === "All" ? CASE_STUDIES : CASE_STUDIES.filter(c => c.tag === filterTag);

  useEffect(() => {
    // Lock body scroll when modal is open
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeProject]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      ".hero-text",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
    );

    gsap.fromTo(
      ".project-row",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Huge background parallax text */}
      <div className="absolute top-[10%] left-0 w-full text-center pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <h1 className="text-[30vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
          ARCHIVE
        </h1>
      </div>

      <div className="relative z-10 pt-48 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col items-center text-center gap-10 border-b border-foreground/10 mb-8">
        <div className="hero-text text-xs md:text-sm font-bold uppercase tracking-widest opacity-50 flex items-center gap-4 border border-foreground/20 rounded-full px-6 py-2 bg-foreground/[0.02]">
          <span className="w-2 h-2 rounded-full bg-foreground animate-pulse"></span>
          Archive — Selected Works
        </div>
        
        <h1 className="hero-text text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] text-balance">
          Case Studies
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-48">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${
                filterTag === tag 
                  ? "bg-foreground text-background" 
                  : "bg-transparent border border-foreground/20 hover:border-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div>
          {filteredProjects.map((c, i) => (
            <div
              key={i}
              onClick={() => setActiveProject(c)}
              className="project-row group relative flex flex-col md:flex-row md:items-center justify-between py-12 md:py-20 border-b-2 border-foreground/20 hover:border-foreground transition-colors cursor-pointer overflow-hidden"
            >
              {/* Background fill animation */}
              <div className="absolute inset-0 bg-foreground origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] z-0"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 w-full text-foreground group-hover:text-background transition-colors duration-500">
                <div className="text-sm font-black uppercase tracking-widest opacity-50 w-8">0{i + 1}</div>
                <div className="flex flex-col">
                  <h2 className="text-3xl md:text-[5vw] font-black uppercase tracking-tighter leading-[0.85] group-hover:translate-x-8 transition-transform duration-500 ease-out">{c.title}</h2>
                  <div className="text-sm md:text-lg font-bold uppercase tracking-widest opacity-70 mt-4 group-hover:translate-x-8 transition-transform duration-500 ease-out delay-75">{c.tag}</div>
                </div>

                <div className="md:ml-auto flex flex-wrap gap-3 mt-6 md:mt-0 opacity-0 group-hover:opacity-100 md:group-hover:-translate-x-8 transition-all duration-500 ease-out delay-100">
                  {c.metrics.slice(0, 3).map(metric => (
                    <span key={metric} className="px-4 py-2 border border-current rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Panel (Modal) */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ${activeProject ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setActiveProject(null)}
        />

        {/* Panel */}
        <div
          className={`relative w-full md:w-[850px] h-full bg-foreground text-background shadow-2xl p-6 md:p-16 flex flex-col overflow-y-auto transition-transform duration-500 ease-out transform ${activeProject ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button
            onClick={() => setActiveProject(null)}
            className="absolute top-8 right-8 p-4 hover:opacity-70 transition-opacity"
          >
            <X size={32} />
          </button>

          {activeProject && (
            <div className="mt-16 animate-up pb-16">
              <div className="text-sm uppercase tracking-widest opacity-70 mb-6 md:mb-8 border-b border-background/20 pb-4">{activeProject.tag}</div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-6 md:mb-8">{activeProject.title}</h2>
              <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8">{activeProject.excerpt}</p>

              {/* Links Placeholders */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                {activeProject.liveLink && (
                  <a href={activeProject.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 bg-background text-foreground rounded-full text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                    <ExternalLink size={18} />
                    Live Preview
                  </a>
                )}
                {activeProject.githubLink && (
                  <a href={activeProject.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 bg-transparent border border-background/30 text-background rounded-full text-sm font-bold uppercase tracking-widest hover:border-background transition-colors">
                    <Github size={18} />
                    Source Code
                  </a>
                )}
              </div>

              {/* If rich fullSpecs exist */}
              {activeProject.fullSpecs ? (
                <div className="flex flex-col gap-10">
                  {activeProject.fullSpecs.problem && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-50">The Business Problem</h3>
                      <p className="text-lg opacity-90 leading-relaxed italic border-l-4 border-foreground/30 pl-4">{activeProject.fullSpecs.problem}</p>
                    </div>
                  )}

                  {activeProject.fullSpecs.keyFindings && (
                    <div className="flex flex-col gap-8 bg-background/5 p-6 rounded-lg border border-background/10">
                      <h3 className="text-sm font-bold uppercase tracking-widest opacity-50">📊 Key Findings</h3>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {activeProject.fullSpecs.keyFindings.metrics.map((m: any, i: number) => (
                          <div key={i} className="flex flex-col gap-1">
                            <span className="text-2xl md:text-3xl font-black">{m.value}</span>
                            <span className="text-xs uppercase tracking-widest opacity-70">{m.label}</span>
                          </div>
                        ))}
                      </div>

                      {activeProject.fullSpecs.keyFindings.insightsList && (
                        <div className="flex flex-col gap-8 my-4">
                          {activeProject.fullSpecs.keyFindings.insightsList.map((insight: any, i: number) => (
                            <div key={i} className="flex flex-col gap-2 p-4 bg-background/5 border border-background/10 rounded-lg">
                              <h4 className="text-lg md:text-xl font-bold tracking-tight mb-2 text-balance">{insight.title}</h4>
                              <p className="text-sm md:text-base opacity-80 leading-relaxed"><span className="font-semibold uppercase tracking-widest text-xs opacity-60 mr-2">Finding:</span> {insight.finding}</p>
                              <p className="text-sm md:text-base opacity-80 leading-relaxed"><span className="font-semibold uppercase tracking-widest text-xs opacity-60 mr-2">Impact:</span> {insight.impact}</p>
                              <p className="text-sm md:text-base opacity-90 leading-relaxed mt-2"><span className="font-semibold uppercase tracking-widest text-xs mr-2">💡 Implication:</span> {insight.implication}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeProject.fullSpecs.keyFindings.table && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="border-b border-background/20 opacity-70">
                                {(activeProject.fullSpecs.keyFindings.tableHeaders || ["Funnel Stage", "Sessions Lost", "Revenue Impact", "Priority"]).map((header: string, idx: number) => (
                                  <th key={idx} className="pb-3 font-semibold uppercase tracking-widest whitespace-nowrap pr-4">{header}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {activeProject.fullSpecs.keyFindings.table.map((row: any, i: number) => (
                                <tr key={i} className="border-b border-background/10">
                                  <td className="py-4 pr-4">{row.stage}</td>
                                  <td className="py-4 pr-4 font-mono">{row.lost}</td>
                                  <td className="py-4 pr-4 font-mono">{row.impact}</td>
                                  <td className="py-4 pr-4">{row.priority}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="flex flex-col gap-4 mt-2">
                        <p className="text-base leading-relaxed opacity-90">{activeProject.fullSpecs.keyFindings.insight}</p>
                        <p className="text-sm font-semibold uppercase tracking-widest text-background bg-foreground w-fit px-3 py-1">{activeProject.fullSpecs.keyFindings.action}</p>
                      </div>
                    </div>
                  )}

                  {activeProject.fullSpecs.solution && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-50">What It Solves</h3>
                      <p className="text-lg opacity-90 leading-relaxed">{activeProject.fullSpecs.solution}</p>
                    </div>
                  )}
                  {activeProject.fullSpecs.howItWorks && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-50">How It Works</h3>
                      <p className="text-lg opacity-90 leading-relaxed">{activeProject.fullSpecs.howItWorks}</p>
                    </div>
                  )}
                  {activeProject.fullSpecs.specs && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-50">Performance & Impact</h3>
                      <ul className="list-disc pl-6 flex flex-col gap-3 text-lg opacity-90">
                        {activeProject.fullSpecs.specs.map((spec: string, idx: number) => (
                          <li key={idx} className="leading-relaxed">{spec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback for simple details */
                activeProject.details && (
                  <>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-background/20 pb-4">Technical Specifications</h3>
                    <ul className="list-disc pl-6 flex flex-col gap-4 text-lg opacity-80">
                      {activeProject.details.map((detail: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
