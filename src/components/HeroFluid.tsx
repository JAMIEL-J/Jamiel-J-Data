import { useEffect, useRef } from "react";

interface HeroFluidProps {
  childrenBase: React.ReactNode;
  childrenReveal: React.ReactNode;
}

export default function HeroFluid({ childrenBase, childrenReveal }: HeroFluidProps) {
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasBaseRef = useRef<HTMLCanvasElement>(null);
  const canvasRevealRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const initFluid = async () => {
      // Dynamic import to avoid SSR issues if used in Next.js
      const webGLFluid = (await import("webgl-fluid")).default;
      
      const isMobile = window.innerWidth < 768;
      if (webglCanvasRef.current) {
        webGLFluid(webglCanvasRef.current, {
          IMMEDIATE: true,
          TRIGGER: "hover",
          SIM_RESOLUTION: isMobile ? 128 : 192,
          DYE_RESOLUTION: isMobile ? 512 : 768,
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

      // Render loop to copy WebGL output to the two 2D knockout canvases
      const renderLoop = () => {
        const source = webglCanvasRef.current;
        if (!source || source.clientWidth === 0 || source.clientHeight === 0 || source.width === 0 || source.height === 0) {
          animationFrameId = requestAnimationFrame(renderLoop);
          return;
        }
        const baseCanvas = canvasBaseRef.current;
        const revealCanvas = canvasRevealRef.current;
        if (!baseCanvas || !revealCanvas) {
          animationFrameId = requestAnimationFrame(renderLoop);
          return;
        }
        const baseCtx = baseCanvas.getContext("2d");
        const revealCtx = revealCanvas.getContext("2d");
        if (!baseCtx || !revealCtx) {
          animationFrameId = requestAnimationFrame(renderLoop);
          return;
        }

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

        animationFrameId = requestAnimationFrame(renderLoop);
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
    
    const events = ['mousemove', 'mousedown', 'mouseup', 'touchstart', 'touchmove', 'touchend'];
    events.forEach(ev => window.addEventListener(ev, forwardEvent, { passive: false }));

    return () => {
      cancelAnimationFrame(animationFrameId);
      events.forEach(ev => window.removeEventListener(ev, forwardEvent));
    };
  }, []);

  // Adjust blur and contrast to make the blob feel like a natural fluid puddle
  const baseFilter = "grayscale(1) brightness(1.5) blur(10px) contrast(2500%) invert(1)";
  const revealFilter = "grayscale(1) brightness(1.5) blur(10px) contrast(2500%)";

  return (
    <div className="relative w-full min-h-[100dvh] bg-black overflow-hidden">
      
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
