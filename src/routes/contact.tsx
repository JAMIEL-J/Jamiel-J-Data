import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  useEffect(() => {
    gsap.fromTo(
      ".contact-animate", 
      { y: 80, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.1 }
    );
  }, []);

  return (
    <div className="min-h-screen pt-48 pb-24 px-6 md:px-12 flex flex-col justify-between max-w-[1400px] mx-auto bg-background text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-24">
        <h1 className="contact-animate text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-[0.85] mb-8 md:mb-0">
          Get in<br />Touch
        </h1>
        <div className="contact-animate max-w-md md:mb-6">
          <p className="text-xl md:text-2xl font-normal opacity-80 leading-relaxed">
            I’m currently looking for Data Analyst roles where I can help teams find the signal in the noise. 
          </p>
          <div className="mt-8 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-sm font-bold uppercase tracking-widest opacity-60">Open for Opportunities</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 border-t-2 border-foreground pt-16">
        <div className="contact-animate flex flex-col gap-12">
          <div className="flex flex-col gap-4 overflow-hidden">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-50">Email</h3>
            <a href="mailto:jamieljahirhussain@gmail.com" className="group flex items-center justify-between border-b border-foreground/20 pb-6 hover:border-foreground transition-colors cursor-pointer">
              <span className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight group-hover:translate-x-4 transition-transform duration-300 ease-out whitespace-nowrap overflow-hidden text-ellipsis">
                jamieljahirhussain<br className="md:hidden" />@gmail.com
              </span>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 -translate-x-8 group-hover:translate-x-0 transition-all duration-300 ease-out flex-shrink-0" size={32} />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-50">Location</h3>
            <div className="border-b border-foreground/20 pb-6">
              <span className="text-2xl md:text-4xl font-black tracking-tight">Pudukkottai, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        <div className="contact-animate flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-50">Networks</h3>
            <a href="https://www.linkedin.com/in/jamiel-j-856ab9329/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-foreground/20 pb-6 hover:border-foreground transition-colors">
              <span className="text-3xl md:text-5xl font-black tracking-tight group-hover:translate-x-4 transition-transform duration-300 ease-out">LinkedIn</span>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 -translate-x-8 group-hover:translate-x-0 transition-all duration-300 ease-out" size={32} />
            </a>
            <a href="https://github.com/JAMIEL-J/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-foreground/20 pb-6 hover:border-foreground transition-colors">
              <span className="text-3xl md:text-5xl font-black tracking-tight group-hover:translate-x-4 transition-transform duration-300 ease-out">GitHub</span>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 -translate-x-8 group-hover:translate-x-0 transition-all duration-300 ease-out" size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
