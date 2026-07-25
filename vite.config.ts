import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    TanStackRouterVite({
      quoteStyle: "double",
      autoCodeSplitting: true,
      codeSplittingOptions: { splitBehavior: () => [], addHmr: false },
    }),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    nitro({
      preset: "vercel"
    })
  ],
});
