import type { Config } from 'tailwindcss';
import { generatePalette } from 'tailwindcss-palette-generator';

export default {
	content: ['./src/**/*.{svelte,ts,js}'],
	plugins: []
} satisfies Config;
