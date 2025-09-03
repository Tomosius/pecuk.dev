# 🌐 pecuk.dev — Portfolio Website

This is my personal portfolio site built with **SvelteKit**, **Tailwind CSS**, and **Vite**.  
It showcases my projects, skills, and background, and is deployed on **GitHub Pages**.

---

## ✨ Features

- ⚡ **Fast + Modern** — Powered by [SvelteKit](https://kit.svelte.dev) and [Vite](https://vitejs.dev).  
- 🎨 **Styled with Tailwind** — Responsive, minimal, and clean design.  
- 🌙 **Theme toggle** — Switch between color themes.  
- 📂 **Projects page** — Filterable + searchable project grid with individual detail pages.  
- 📱 **Responsive design** — Optimized for mobile, tablet, and desktop.  
- 📧 **Contact form** — Integrated with [Web3Forms](https://web3forms.com) for form submissions.

---

## 📦 Tech Stack

- [SvelteKit](https://kit.svelte.dev) — Framework  
- [Tailwind CSS](https://tailwindcss.com) — Styling  
- [TypeScript](https://www.typescriptlang.org/) — Type safety  
- [Vite](https://vitejs.dev) — Build tool  
- [Web3Forms](https://web3forms.com) — Contact form backend  
- Deployment: **GitHub Pages**

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Tomosius/pecuk.dev.git
cd pecuk.dev
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Building for Production

```bash
npm run build
```

The build output is located in `.svelte-kit/output/`.

To preview the production build:
```bash
npm run preview
```

---

## 🌍 Deployment (GitHub Pages)

This project uses `paths.base` and `assets` from `$app/paths` so it works correctly when deployed under a subpath (`/pecuk.dev/`).  

1. Push changes to your repo.  
2. Build your project:  
   ```bash
   npm run build
   ```
3. Deploy the output (usually with GitHub Actions or `gh-pages` branch).

---

## 📂 Project Structure

```bash
pecuk.dev/
├── src/
│   ├── lib/
│   │   ├── assets/          # Logos, images
│   │   ├── components/      # Navbar, ProjectCard, etc.
│   │   └── projects/
│   │       ├── data.ts      # All project metadata
│   │       └── types.ts     # Project type definitions
│   └── routes/
│       ├── +layout.svelte   # Global layout
│       ├── +page.svelte     # Home
│       ├── about/           # About page
│       ├── contact/         # Contact form
│       └── projects/        # Projects list + slug pages
├── static/                  # Static assets (served as-is)
├── svelte.config.js
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🖼️ Adding Projects

All projects live in **`src/lib/projects/data.ts`**.  
Each project follows this schema:

```ts
export type Project = {
  slug: string;
  title: string;
  period: string;
  tech: string[];
  summary: string;
  body: string;
  links: { label: string; href: string }[];
  cover?: string;
  gallery?: string[];
  tagline?: string;
  tags?: string[];
};
```

### Example:
```ts
{
  slug: "vampyre",
  title: "Vampyre — A Vampire History Site",
  tagline: "HTML & CSS Showcase Project",
  period: "2024",
  tech: ["HTML", "CSS"],
  tags: ["HTML", "CSS", "Responsive"],
  summary: "A responsive website about vampire culture...",
  body: "This project was built to demonstrate...",
  links: [
    { label: "Live site", href: "https://tomosius.github.io/Vampyre" },
    { label: "Source code", href: "https://github.com/Tomosius/Vampyre" }
  ],
  cover: "images/projects/vampyre/img.png",
  gallery: [
    "images/projects/vampyre/screenshot1.png",
    "images/projects/vampyre/screenshot2.png"
  ]
}
```

---

## 📬 Contact

You can reach me via the contact form on [pecuk.dev](https://tomosius.github.io/pecuk.dev)  
or directly at: **contact@pecuk.dev**

---

## 📜 License

MIT License © 2025 Tomas Pecukevicius
