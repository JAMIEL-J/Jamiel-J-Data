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
      
      if (webglCanvasRef.current) {
        webGLFluid(webglCanvasRef.current, {
          IMMEDIATE: true,
          TRIGGER: "hover",
          SIM_RESOLUTION: 256, // Lower sim res + blur = better gooey effect
          DYE_RESOLUTION: 1024,
          DENSITY_DISSIPATION: 0.96, // Fades naturally, leaving a nice liquid trail
          VELOCITY_DISSIPATION: 0.5, // Stops quickly, ensuring it follows the cursor ONLY and doesn't shoot off
          PRESSURE: 0.8,
          CURL: 5, // Minimal curl so it doesn't drift away from the cursor
          SPLAT_RADIUS: 0.10, // Balanced radius
          SPLAT_FORCE: 8000, 
          SPLAT_COUNT: 0, // Disables the random liquid splash on initial load
          COLORFUL: true, // We filter to grayscale in CSS
          BLOOM: false, // Disables the white vignette/halo at the edges
          SUNRAYS: false, // Disables light rays
        });
      }

      // Render loop to copy WebGL output to the two 2D knockout canvases
      const renderLoop = () => {
        const source = webglCanvasRef.current;
        const baseCtx = canvasBaseRef.current?.getContext("2d", { willReadFrequently: false });
        const revealCtx = canvasRevealRef.current?.getContext("2d", { willReadFrequently: false });

        if (source && baseCtx && revealCtx && canvasBaseRef.current && canvasRevealRef.current) {
          // Sync dimensions
          if (canvasBaseRef.current.width !== source.clientWidth) {
            canvasBaseRef.current.width = source.clientWidth;
            canvasBaseRef.current.height = source.clientHeight;
            canvasRevealRef.current.width = source.clientWidth;
            canvasRevealRef.current.height = source.clientHeight;
          }

          // Draw from WebGL canvas to 2D canvases
          baseCtx.drawImage(source, 0, 0, canvasBaseRef.current.width, canvasBaseRef.current.height);
          revealCtx.drawImage(source, 0, 0, canvasRevealRef.current.width, canvasRevealRef.current.height);
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
