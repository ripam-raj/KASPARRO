import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary brand colors
                primary: {
                    50: "#f0f4ff",
                    100: "#e0e8ff",
                    200: "#c7d4fe",
                    300: "#a3b8fc",
                    400: "#7a91f9",
                    500: "#5a6cf4",
                    600: "#4a4de8",
                    700: "#3f3dcd",
                    800: "#3534a5",
                    900: "#303183",
                    950: "#1e1d4d",
                },
                // Accent colors
                accent: {
                    cyan: "#00d4ff",
                    purple: "#a855f7",
                    pink: "#ec4899",
                    green: "#22c55e",
                    orange: "#f97316",
                },
                // Surface colors for dark & light mode (slate/zinc mapping)
                surface: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a",
                    950: "#020617",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Inter", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-primary": "linear-gradient(135deg, #4a4de8 0%, #a855f7 100%)",
                "gradient-hero": "linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 1) 100%)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "slide-up": "slideUp 0.5s ease-out",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(90, 108, 244, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(90, 108, 244, 0.6)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
