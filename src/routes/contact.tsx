import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import gsap from "gsap";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  useEffect(() => {
    gsap.fromTo(
      ".contact-animate", 
      { y: 60, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.1 }
    );
  }, []);

  return (
    <div className="min-h-[100dvh] pt-48 pb-24 px-6 md:px-12 flex flex-col justify-between max-w-[1400px] mx-auto">
      
      {/* Editorial Header */}
      <div className="flex flex-col items-center text-center mb-32">
        <div className="flex items-center justify-center gap-4 mb-8 contact-animate">
            <span className="w-2 h-2 rounded-full bg-foreground animate-pulse"></span>
            <h2 className="text-sm font-bold uppercase tracking-widest opacity-50">
              Open for Opportunities
            </h2>
        </div>
        <h1 className="contact-animate text-[12vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-12">
          LET'S TALK.
        </h1>
        <p className="contact-animate text-xl md:text-2xl lg:text-3xl font-medium tracking-tight w-full max-w-full opacity-80 leading-snug">
          I’m currently looking for Data Analyst roles where I can help teams find the signal in the noise.
        </p>
      </div>

      {/* Full-width interactive link rows */}
      <div className="flex flex-col border-t-2 border-foreground/20">
        
        {/* Email Row */}
        <a 
          href="mailto:jamieljahirhussain@gmail.com" 
          className="contact-animate group py-12 md:py-20 border-b border-foreground/10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:pl-8 transition-all duration-500 cursor-pointer"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">Drop a Line</h3>
            <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Email</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xl md:text-3xl font-medium tracking-tight opacity-50 group-hover:opacity-100 transition-opacity break-all md:break-normal">jamieljahirhussain@gmail.com</span>
            <div className="hidden md:flex w-16 h-16 rounded-full bg-foreground text-background items-center justify-center opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </div>
        </a>

        {/* LinkedIn Row */}
        <a 
          href="https://www.linkedin.com/in/jamiel-j-856ab9329/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="contact-animate group py-12 md:py-20 border-b border-foreground/10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:pl-8 transition-all duration-500 cursor-pointer"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">Professional</h3>
            <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter">LinkedIn</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xl md:text-3xl font-medium tracking-tight opacity-50 group-hover:opacity-100 transition-opacity">Connect with me</span>
            <div className="hidden md:flex w-16 h-16 rounded-full bg-foreground text-background items-center justify-center opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </div>
        </a>

        {/* GitHub Row */}
        <a 
          href="https://github.com/JAMIEL-J/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="contact-animate group py-12 md:py-20 border-b border-foreground/10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:pl-8 transition-all duration-500 cursor-pointer"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">Code & Projects</h3>
            <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter">GitHub</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xl md:text-3xl font-medium tracking-tight opacity-50 group-hover:opacity-100 transition-opacity">View repositories</span>
            <div className="hidden md:flex w-16 h-16 rounded-full bg-foreground text-background items-center justify-center opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </div>
        </a>
        
        {/* Location Row */}
        <div 
          className="contact-animate group py-12 md:py-20 border-b border-foreground/10 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all duration-500 cursor-default"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-50">Local Time & Base</h3>
            <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Location</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xl md:text-3xl font-medium tracking-tight opacity-80">Pudukkottai, Tamil Nadu, India</span>
          </div>
        </div>

      </div>
    </div>
  );
}

