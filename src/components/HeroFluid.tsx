import { useEffect, useRef } from "react";

interface HeroFluidProps {
  childrenBase: React.ReactNode;
  childrenReveal: React.ReactNode;
}

export default function HeroFluid({ childrenBase, childrenReveal }: HeroFluidProps) {
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasBaseRef = useRef<HTMLCanvasElement>(null);
  const canvasRevealRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId = 0;
    let io: IntersectionObserver | null = null;
    let visible = true;
    let frame = 0;
    let disposed = false;
    const onVis = () => {
      if (document.hidden) return;
      // re-check hero visibility on tab return
      if (wrapRef.current) {
        const r = wrapRef.current.getBoundingClientRect();
        visible = r.bottom > 0 && r.top < window.innerHeight;
      } else visible = true;
    };

    const initFluid = async () => {
      // Dynamic import to avoid SSR issues if used in Next.js
      const webGLFluid = (await import("webgl-fluid")).default;
      if (disposed) return;
      
      const isMobile = window.innerWidth < 768;
      if (webglCanvasRef.current) {
        webGLFluid(webglCanvasRef.current, {
          IMMEDIATE: true,
          TRIGGER: "hover",
          SIM_RESOLUTION: isMobile ? 96 : 144,
          DYE_RESOLUTION: isMobile ? 256 : 512,
          DENSITY_DISSIPATION: 0.97,
          VELOCITY_DISSIPATION: 0.6,
          PRESSURE: 0.7,
          CURL: 3,
          SPLAT_RADIUS: 0.10,
          SPLAT_FORCE: 6000, 
          SPLAT_COUNT: 0,
          COLORFUL: true,
          BLOOM: false,
          SUNRAYS: false,
        });
      }

      // Pause WebGL copy when hero is off-screen — biggest scroll-jank win.
      // Throttle copy to ~30fps (every 2nd frame): halves drawImage + blur cost.
      io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
      if (wrapRef.current) io.observe(wrapRef.current);
      document.addEventListener("visibilitychange", onVis);

      // Render loop to copy WebGL output to the two 2D knockout canvases
      // Single RAF chain only — early-outs never re-schedule (fixes RAF pileup).
      const renderLoop = () => {
        if (disposed) return;
        animationFrameId = requestAnimationFrame(renderLoop);
        if (!visible || document.hidden) return;
        frame += 1;
        if (frame % 2 !== 0) return; // 30fps copy
        const source = webglCanvasRef.current;
        if (!source || source.clientWidth === 0 || source.clientHeight === 0 || source.width === 0 || source.height === 0) return;
        const baseCanvas = canvasBaseRef.current;
        const revealCanvas = canvasRevealRef.current;
        if (!baseCanvas || !revealCanvas) return;
        const baseCtx = baseCanvas.getContext("2d");
        const revealCtx = revealCanvas.getContext("2d");
        if (!baseCtx || !revealCtx) return;

        // Sync dimensions only when valid
        if (baseCanvas.width !== source.clientWidth || baseCanvas.height !== source.clientHeight) {
          const w = source.clientWidth;
          const h = source.clientHeight;
          if (w > 0 && h > 0) {
            baseCanvas.width = w;
            baseCanvas.height = h;
            revealCanvas.width = w;
            revealCanvas.height = h;
          }
        }

        if (baseCanvas.width > 0 && baseCanvas.height > 0) {
          try {
            baseCtx.drawImage(source, 0, 0, baseCanvas.width, baseCanvas.height);
            revealCtx.drawImage(source, 0, 0, revealCanvas.width, revealCanvas.height);
          } catch {}
        }
      };

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    initFluid();

    // Forward window pointer events to the hidden WebGL canvas so it tracks fluid without blocking the DOM
    const forwardEvent = (e: Event) => {
      if (webglCanvasRef.current && e.target !== webglCanvasRef.current) {
        const clone = new (e.constructor as any)(e.type, e);
        webglCanvasRef.current.dispatchEvent(clone);
      }
    };
    
    // Coarse pointers: skip fluid event forwarding (native touch scroll stays smooth)
    const isCoarseDown = window.matchMedia("(pointer: coarse)").matches;
    const events = isCoarseDown ? [] as string[] : ['mousemove', 'mousedown', 'mouseup'];
    events.forEach(ev => window.addEventListener(ev, forwardEvent, { passive: true }));

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameId);
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      events.forEach(ev => window.removeEventListener(ev, forwardEvent));
    };
  }, []);

  // Adjust blur and contrast to make the blob feel like a natural fluid puddle
  const baseFilter = "grayscale(1) brightness(1.5) blur(10px) contrast(2500%) invert(1)";
  const revealFilter = "grayscale(1) brightness(1.5) blur(10px) contrast(2500%)";

  return (
    <div ref={wrapRef} className="relative w-full min-h-[100dvh] bg-black overflow-hidden">
      
      {/* HIDDEN WEBGL SOURCE */}
      <canvas 
        ref={webglCanvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0 opacity-0 pointer-events-none" 
      />

      {/* 1. BASE LAYER KNOCKOUT */}
      {/* This layer allows pointer events so buttons and links are clickable */}
      <div className="absolute inset-0 z-10 isolate mix-blend-screen bg-white">
        <div className="absolute inset-0 z-10 mix-blend-multiply pointer-events-auto">
          {childrenBase}
        </div>
        {/* Canvas 1: Black fluid on White BG */}
        <canvas 
          ref={canvasBaseRef} 
          className="absolute inset-0 z-20 w-full h-full mix-blend-multiply pointer-events-none scale-[1.05]" 
          style={{ filter: baseFilter }} 
        />
      </div>

      {/* 2. REVEAL LAYER KNOCKOUT */}
      {/* This layer passes pointer events through to the Base layer */}
      <div className="absolute inset-0 z-20 isolate mix-blend-screen bg-black pointer-events-none">
        <div className="absolute inset-0 z-10 mix-blend-screen">
          {childrenReveal}
        </div>
        {/* Canvas 2: White fluid on Black BG */}
        <canvas 
          ref={canvasRevealRef} 
          className="absolute inset-0 z-20 w-full h-full mix-blend-multiply scale-[1.05]" 
          style={{ filter: revealFilter }} 
        />
      </div>

    </div>
  );
}
