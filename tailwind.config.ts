import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import colors from "tailwindcss/colors";

const config: Config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				// Core brand identity
				cc_brand: colors.indigo,
				cc_accent: colors.pink,

				// Neutral system
				cc_neutral: colors.gray,
				cc_surface: colors.slate,
				cc_border: colors.zinc,

				// States
				cc_success: colors.green,
				cc_warning: colors.yellow,
				cc_danger: colors.red,
				cc_info: colors.blue,

				// Status / Special
				cc_highlight: colors.amber,
				cc_muted: colors.stone,
				cc_overlay: colors.black,

				// Decorative / optional
				cc_secondary: colors.purple,
				cc_tertiary: colors.teal,
			},
		},
	},
	plugins: [forms, typography],
};

export default config;