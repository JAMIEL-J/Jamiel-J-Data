import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import gsap from "gsap";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.jamiel-j.me/contact" }],
    meta: [{ property: "og:url", content: "https://www.jamiel-j.me/contact" }],
  }),
});

function Contact() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-animate",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: 0.05, overwrite: "auto" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-10 flex flex-col items-center text-center">
        <p className="contact-animate font-mono text-[11px] tracking-[0.2em] uppercase opacity-40">Contact</p>
        <h1 className="contact-animate whitespace-nowrap text-[11vw] md:text-[8rem] font-bold uppercase tracking-tighter leading-[0.85] mt-4">
          Let&apos;s Talk.
        </h1>
        <p className="contact-animate text-lg md:text-xl font-light opacity-60 leading-relaxed mt-7 max-w-[52ch]">
          I&apos;m currently looking for Data Analyst roles where I can help teams find the signal in the noise.
        </p>

        <div className="contact-animate grid md:grid-cols-3 gap-6 border-t border-foreground/10 mt-12 pt-5 font-mono text-[11px] tracking-[0.12em] uppercase opacity-60 w-full text-center">
          <div><p className="opacity-50 mb-1">Email</p><p className="normal-case tracking-normal text-sm opacity-100">jamieljahirhussain@gmail.com</p></div>
          <div><p className="opacity-50 mb-1">Base</p><p className="text-sm opacity-100">Pudukkottai, Tamil Nadu</p></div>
          <div><p className="opacity-50 mb-1">Status</p><p className="text-sm opacity-100">Open for opportunities</p></div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-6 md:px-10 mt-6 border-t border-foreground/10">
        <a
          href="mailto:jamieljahirhussain@gmail.com"
          className="contact-animate group grid md:grid-cols-[1fr_auto] gap-2 items-baseline py-9 md:py-11 border-b border-foreground/10 hover:bg-foreground/[0.03] transition-colors"
        >
          <span className="text-2xl md:text-4xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">
            Email <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">→</span>
          </span>
          <span className="font-mono text-sm opacity-50 break-all">jamieljahirhussain@gmail.com</span>
        </a>
        <a
          href="https://www.linkedin.com/in/jamiel-j-856ab9329/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-animate group grid md:grid-cols-[1fr_auto] gap-2 items-baseline py-9 md:py-11 border-b border-foreground/10 hover:bg-foreground/[0.03] transition-colors"
        >
          <span className="text-2xl md:text-4xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">
            LinkedIn <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">→</span>
          </span>
          <span className="font-mono text-sm opacity-50">Connect with me</span>
        </a>
        <a
          href="https://github.com/JAMIEL-J/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-animate group grid md:grid-cols-[1fr_auto] gap-2 items-baseline py-9 md:py-11 border-b border-foreground/10 hover:bg-foreground/[0.03] transition-colors"
        >
          <span className="text-2xl md:text-4xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">
            GitHub <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">→</span>
          </span>
          <span className="font-mono text-sm opacity-50">View repositories</span>
        </a>
        <div className="contact-animate grid md:grid-cols-[1fr_auto] gap-2 items-baseline py-9 md:py-11 border-b border-foreground/10">
          <span className="text-2xl md:text-4xl font-medium tracking-tight">Location</span>
          <span className="font-mono text-sm opacity-80">Pudukkottai, Tamil Nadu, India</span>
        </div>
      </main>

      <footer className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16 text-center">
        <a
          href="mailto:jamieljahirhussain@gmail.com"
          className="contact-animate font-light tracking-[-0.02em] text-[7.5vw] md:text-6xl break-all hover:opacity-60 transition-opacity"
        >
          jamieljahirhussain@gmail.com
        </a>
        <p className="contact-animate font-mono text-[10px] tracking-[0.18em] uppercase opacity-40 mt-8">
          Pudukkottai, Tamil Nadu, India
        </p>
      </footer>
    </div>
  );
}
