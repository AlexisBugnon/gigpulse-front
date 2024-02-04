/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // Permet de passer le switch du theme manuellement
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Numans", "sans-serif"], // contenu
                heading: ["Poppins", "sans-serif"], // gros titre
                content: ["Cairo", "sans-serif"], // titre intermédaire
            },
        },
    },
    plugins: [require("daisyui")],
    // daisyUI config (optional - here are the default values)
    daisyui: {
        themes: [
            {
                customLight: {
                    primary: "#3DA0A6",
                    secondary: "#e1e8e9",
                    accent: "#5e8b9d",
                    neutral: "#2e4759",
                    "base-100": "#F5FBFB",
                    info: "#4f46e5",
                    success: "#5DCDDE",
                    warning: "#f59e0b",
                    error: "#ef4444",
                },
                customDark: {
                    primary: "#0b2426",
                    secondary: "#d0dbdc",
                    accent: "#334445",
                    neutral: "#334155",
                    "base-100": "#041213",
                    info: "#667eea",
                    success: "#5DCDDE",
                    warning: "#ff6b6b",
                    error: "#b91c1c",
                },
            },
        ],
        darkTheme: "customDark", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
};
