# Aurora OS — Official Website

[![Hosted on Cloudflare Pages](https://img.shields.io/badge/Hosted_on-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Source Repository](https://img.shields.io/badge/Source-auroraos-06B6D4?style=for-the-badge&logo=github)](https://github.com/auroraossoftware/auroraos)

This repository contains the official, high-performance static website for **[Aurora OS](https://github.com/auroraossoftware/auroraos)**: an experimental, open-source, AI-native desktop operating system built on top of the Linux kernel.

---

## 🌟 Key Features of the Website

- **Memorable Aurora Borealis Visual Atmosphere**: Custom 60fps dynamic canvas simulation with ethereal light ribbons responding organically to user interactions.
- **Interactive In-Browser Aurora Terminal**: Real interactive console allowing visitors to test capabilities (`sys.cpu.read`, `sys.memory.read`, `proc.list`, benchmark runner, and default-deny policy rejections) in real-time.
- **4-Tier Architecture Stack Explorer**: Interactive breakdown of Applications, `aurora-ai` Core Daemon (Rust), Worker Inference layer, and Linux Userspace/Kernel.
- **Empirical Milestone 8 Benchmarks**: Interactive charts showcasing sub-millisecond latencies (0.061 ms noop, 0.141 ms policy denial), 2.8 MiB flatline resident memory (VmRSS), and 211 passing tests.
- **Cloudflare Pages Optimized**: Zero-dependency static architecture, instantaneous CDN edge serving, pre-configured `_headers` for strict security, `robots.txt`, `sitemap.xml`, and SVG social share cards.
- **Prominent Source Code Option**: Direct integration with the source repository at [`auroraossoftware/auroraos`](https://github.com/auroraossoftware/auroraos).

---

## 🚀 Hosting on Cloudflare Pages (Free Tier Step-by-Step)

Deploying this website to **Cloudflare Pages Free Tier** takes less than 2 minutes and costs $0.

### Step 1: Push This Repository to GitHub
Ensure all files in this repository are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "feat: complete modern static website for Aurora OS"
git push origin main
```

### Step 2: Connect to Cloudflare Pages
1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select your GitHub account and choose the `auroraos-website` repository.

### Step 3: Configure Build Settings
Configure the build settings as follows:
- **Project Name:** `auroraos` (or your preferred name; this sets your `*.pages.dev` subdomain)
- **Production Branch:** `main`
- **Framework Preset:** `None`
- **Build Command:** *(Leave empty)*
- **Build Output Directory:** `.` (root directory)

*(Alternatively, if you select a Node preset, `npm run build` is pre-configured in `package.json` to complete without errors.)*

### Step 4: Deploy!
Click **Save and Deploy**. Cloudflare Pages will distribute the static assets across 300+ global edge data centers in seconds.

### (Optional) Step 5: Custom Domain Setup
In your Cloudflare Pages project dashboard, click **Custom Domains** to link your custom domain (e.g. `auroraos.org` or `auroraos.dev`) with automatic SSL/TLS certificates and DDoS protection.

---

## 💻 Local Development & Preview

You can preview the website locally using any static web server:

### Option A: Using Python (Built-in)
```bash
python3 -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option B: Using Node.js
```bash
npm start
```

---

## 📁 Repository Structure

```text
auroraos-website/
├── index.html           # Main semantic HTML5 webpage & SEO metadata
├── styles.css           # Custom dark aurora design system & glassmorphism
├── app.js               # Canvas aurora engine, interactive terminal, tabs
├── _headers             # Cloudflare Pages security & caching headers
├── robots.txt           # Search engine crawler policies
├── sitemap.xml          # XML sitemap for SEO discovery
├── package.json         # Development scripts and metadata
├── README.md            # Deployment & project documentation
└── assets/
    ├── favicon.svg      # Vector Aurora OS crest icon
    └── og-image.svg     # 1200x630 social preview share banner
```

---

## 📄 License

This website and Aurora OS are open-source and released under the [MIT License](https://opensource.org/licenses/MIT).
