import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-char",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 75%",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const title = "LET'S WORK".split("");

  return (
    <footer ref={footerRef} className="relative bg-foreground text-background pt-24 pb-8 mt-24 rounded-t-[2rem] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col h-full">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="max-w-md">
            <h3 className="text-2xl md:text-4xl font-medium mb-6">Ready to make something exceptional?</h3>
            <p className="text-background/60 text-lg">
              I'm always open to discussing data strategy, visualization projects, or partnership opportunities.
            </p>
          </div>
          
          <a href="mailto:jamieljahirhussain@gmail.com" className="group flex items-center justify-center w-40 h-40 rounded-full bg-background text-foreground hover:scale-105 transition-transform duration-500 ease-out flex-shrink-0">
            <span className="text-lg font-bold mr-2">Email Me</span>
            <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Massive Typography */}
        <div className="overflow-hidden mb-16 border-b border-background/20 pb-16 flex justify-between">
          <h2 className="text-[13vw] md:text-[15vw] font-black uppercase tracking-tighter leading-none flex">
            {title.map((char, i) => (
              <span key={i} className="footer-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-sm font-medium tracking-widest uppercase">
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-background/50 mb-2">Socials</span>
              <a href="https://www.linkedin.com/in/jamiel-j-856ab9329/" target="_blank" rel="noopener noreferrer" className="hover:text-background/70 transition-colors">LinkedIn</a>
              <a href="https://github.com/JAMIEL-J/" target="_blank" rel="noopener noreferrer" className="hover:text-background/70 transition-colors">GitHub</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-background/50 mb-2">Pages</span>
              <Link to="/" className="hover:text-background/70 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-background/70 transition-colors">About</Link>
              <Link to="/projects" className="hover:text-background/70 transition-colors">Projects</Link>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-2 mt-8 md:mt-0">
            <span className="text-background/50 mb-2">Location</span>
            <span>Pudukkottai, Tamil Nadu, India</span>
            <span className="mt-4 opacity-50">© {new Date().getFullYear()} Jamiel J</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
