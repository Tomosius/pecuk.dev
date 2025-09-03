// src/lib/projects/data.ts
export type Project = {
	slug: string;
	title: string;
	period: string;           // e.g. "2024"
	tech: string[];           // main stack
	summary: string;
	body: string;
	links: { label: string; href: string }[];
	cover?: string;           // store as 'images/...'
	gallery?: string[];       // store as ['images/...', ...]
	tagline?: string;         // short descriptive sentence
	tags?: string[];          // list of searchable keywords
};

export const projects: Project[] = [
	{
		slug: "vampyre",
		title: "Vampyre — A Vampire History Site",
		tagline: "HTML & CSS Showcase Project",
		period: "2024",
		tech: ["HTML", "CSS"],
		tags: ["HTML", "CSS", "Accessibility", "Responsive"],
		summary: "A responsive website about vampire culture...",
		body:
			"This project was built to demonstrate clean semantic HTML, responsive design, image handling, a 404 page, and accessibility features. It includes floating images, media queries, W3C validation, and cross-device/browser compatibility.",
		links: [
			{ label: "Live site", href: "https://tomosius.github.io/Vampyre" },
			{ label: "Source code", href: "https://github.com/Tomosius/Vampyre" }
		],
		cover: "images/projects/vampyre/img.png",
	},
	{
		slug: "battleship",
		title: "Battleship — Python Terminal Game",
		tagline: "Classic battleship in the terminal with AI opponent",
		period: "2024",
		tech: ["Python"],
		tags: ["Python", "Terminal", "Game", "OOP", "Code Institute"],
		summary:
			"A Python implementation of the classic Battleship game, running in the terminal with randomized ship placement and an AI opponent.",
		body:
			"This project demonstrates Python logic, error handling, and game mechanics inside the terminal. It features player vs computer gameplay, input validation, and a clean board display using ASCII characters. The game was deployed on Heroku with persistent play through standard I/O.",
		links: [
			{ label: "Live demo (Heroku)", href: "https://battleship-portfolio-3-1c0a52c29890.herokuapp.com/" },
			{ label: "Source code", href: "https://github.com/Tomosius/Battleship-Portfolio-3" }
		],
		cover: "images/projects/battleship/game_play.png",
	},
	{
		slug: "hangman-terminal",
		title: "Hangman — Interactive Web Game",
		tagline: "Fun hangman with AI-style word selection",
		period: "2024",
		tech: ["JavaScript", "HTML", "CSS"],
		tags: ["JavaScript", "Web Game", "UX", "Responsive", "Code Institute"],
		summary:
			"An engaging web-based Hangman game with AI-inspired word generation, responsive UI and levels.",
		body:
			"This Hangman game combines classic gameplay with enhanced usability features: difficulty levels via a slider, a timer, an action log of guesses, and clear UX/animations. It showcases HTML, CSS, and JavaScript skills—DOM manipulation, event handling, and responsive design—plus validation and cross-device compatibility.",
		links: [
			{ label: "Live demo", href: "https://tomosius.github.io/P2-HangMan" },
			{ label: "Source code", href: "https://github.com/Tomosius/P2-HangMan" }
		],
		cover: "images/projects/hangman/cover.png",
	},
	{
		slug: "my-precious",
		title: "My Precious — Lost & Found Community",
		tagline: "Django-powered platform for reuniting lost items",
		period: "2025",
		tech: ["Python", "Django", "HTML", "CSS", "Bootstrap", "Heroku"],
		tags: ["Django", "Web App", "CRUD", "Messaging", "Geo-location", "Responsive"],
		summary:
			"A full-stack web app that enables users to post lost or found items, message each other, and help reunite belongings with their owners.",
		body:
			"Built using Django with three key apps—Users, Posts, and Conversations—this platform supports authentication, CRUD posts with photos, direct messaging, and pagination. Features include image storage via Cloudinary, geolocation support, and responsive UI powered by Bootstrap. The site is deployed on Heroku with PostgreSQL and includes validation and CI lint checks.",
		links: [
			{ label: "Live demo", href: "https://project-4-django-my-precious-180ebe0871af.herokuapp.com/" },
			{ label: "Source code", href: "https://github.com/Tomosius/My_Precious" }
		],
		cover: "images/projects/my-precious/mokup.png",
	},
	{
		slug: "heritage-houses",
		title: "Heritage House Sale Price Prediction",
		tagline: "ML-driven price forecasting for historic homes",
		period: "2025",
		tech: ["Python", "scikit-learn", "Streamlit", "Altair", "Heroku"],
		tags: ["ML", "Regression", "Streamlit", "Data Cleaning", "Feature Engineering"],
		summary:
			"An ML project predicting sale prices of heritage houses using scikit-learn and a Streamlit dashboard.",
		body:
			"Built with CRISP-DM methodology: data cleaning, hypothesis-driven feature engineering, model validation, and predictions through a Streamlit interface. Models including Gradient Boosting and feature pipelines were evaluated; results visualized using Altair. Deployed on Heroku for interactive predictions.",
		links: [
			{ label: "Live demo", href: "https://heritage-houses-ce5e2ad82147.herokuapp.com/" },
			{ label: "Source code", href: "https://github.com/Tomosius/heritage_houses_p5" }
		],
		cover: "images/projects/heritage-houses/mokup.png",
	}
];

export function getBySlug(slug: string) {
	return projects.find((p) => p.slug === slug);
}