import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import colors from "tailwindcss/colors";

const config: Config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				cc_primary: "#2B0B3F",    // deep royal purple
				cc_secondary: "#44215C",  // dark plum
				cc_accent: "#BB86FC",     // neon lavender
				cc_highlight: "#FF6B6B",  // warm coral
				cc_neutral_light: "#F5F5F5", // light gray
				cc_neutral_dark: "#1E1E1E",  // dark gray
			},
		},
	},
	plugins: [forms, typography],
};

export default config;