import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "IRANSans",
        ],
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
