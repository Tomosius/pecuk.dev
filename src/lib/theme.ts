import { writable } from 'svelte/store';

export type Theme = {
	bgTop: string;
	bgMid: string;
	bgBottom: string;
	glowTop: string;
	glowSide: string;
	accent: string; // for highlights / headings
	accentSoft: string; // for hover or secondary accents
};
export const indigoTheme: Theme = {
	bgTop: '#2c2c54',
	bgMid: '#1f1f3d',
	bgBottom: '#1a1a33',
	glowTop: 'rgba(139,92,246,0.18)',
	glowSide: 'rgba(79,70,229,0.12)',
	accent: '#8b5cf6', // indigo-500
	accentSoft: '#a78bfa' // indigo-400
};

export const tealTheme: Theme = {
	bgTop: '#0e2433',
	bgMid: '#0a1b28',
	bgBottom: '#07121c',
	glowTop: 'rgba(56,189,248,0.18)',
	glowSide: 'rgba(56,189,248,0.10)',
	accent: '#38bdf8', // cyan-400
	accentSoft: '#67e8f9' // cyan-300
};

export const themeStore = writable<Theme>(indigoTheme);
