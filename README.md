# 🌐 pecuk.dev — Portfolio & Blog

This is my personal portfolio and blog site built with **SvelteKit**, **Tailwind CSS**, and **Vite**.  
It showcases my projects, blog posts, skills, and background, and is deployed on **GitHub Pages**.

---

## ✨ Features

- ⚡ **Fast + Modern** — Powered by [SvelteKit](https://kit.svelte.dev) and [Vite](https://vitejs.dev).
- 🎨 **Styled with Tailwind** — Responsive, minimal, and clean design.
- 🌙 **Theme toggle** — Switch between color themes.
- 📂 **Projects** — Filterable + searchable grid with individual detail pages.
- 📝 **Blog** — Markdown/mdsvex-powered blog with search + tag filters.
- 📱 **Responsive design** — Optimized for mobile, tablet, and desktop.
- 📧 **Contact form** — Integrated with [Web3Forms](https://web3forms.com) for form submissions.

---

## 📦 Tech Stack

- [SvelteKit](https://kit.svelte.dev) — Framework
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Vite](https://vitejs.dev) — Build tool
- [mdsvex](https://mdsvex.pngwn.io/) — Markdown/Svelte blog posts
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

This project uses `paths.base` from `$app/paths` so it works correctly when deployed under a subpath (`/pecuk.dev/`).

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
│   │   ├── projects/        # Projects data + types
│   │   └── blog/            # Blog helpers + posts
│   │       ├── content.ts   # Blog loader
│   │       └── posts/       # .md/.svx files
│   └── routes/
│       ├── +layout.svelte   # Global layout
│       ├── +page.svelte     # Home
│       ├── about/           # About page
│       ├── contact/         # Contact form
│       ├── projects/        # Projects list + slug pages
│       └── blog/            # Blog list + slug pages
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
  slug: "vampyre";
  title: "Vampyre — A Vampire History Site";
  tagline: "HTML & CSS Showcase Project";
  period: "2024";
  tech: ["HTML", "CSS"];
  tags: ["HTML", "CSS", "Responsive"];
  summary: "A responsive website about vampire culture...";
  body: "This project was built to demonstrate...";
  links: [
    { label: "Live site", href: "https://tomosius.github.io/Vampyre" },
    { label: "Source code", href: "https://github.com/Tomosius/Vampyre" }
  ];
  cover: "images/projects/vampyre/img.png";
  gallery: [
    "images/projects/vampyre/screenshot1.png",
    "images/projects/vampyre/screenshot2.png"
  ]
}
```

---

## 📝 Adding Blog Posts

All blog posts live in **`src/lib/blog/posts/`** as `.md` or `.svx` files.  
Each file must include frontmatter metadata:

```md
---
title: "DuckDB First Steps"
summary: "Introduction to DuckDB with examples"
date: "2025-03-01"
tags: ["DuckDB", "Database", "Guide"]
cover: "images/blog/duckdb-cover.png"
---

# DuckDB First Steps

Your blog content here in markdown or mdsvex...
```

Posts are automatically discovered and listed on the `/blog` page, with search + tag filtering.

---

## 📬 Contact

You can reach me via the contact form on [pecuk.dev](https://tomosius.github.io/pecuk.dev)  
or directly at: **contact@pecuk.dev**

---

## 📜 License

MIT License © 2025 Tomas Pecukevicius
