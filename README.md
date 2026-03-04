# Kshitiz Tyagi — Personal Resume Website

A modern, dark-themed personal portfolio/resume website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Getting Started

### Prerequisites

Install **Node.js** (v18 or later):  
👉 https://nodejs.org/en/download

### Setup

```bash
# 1. Navigate to project folder
cd kshitiz-resume

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

---

## 🗂 Project Structure

```
kshitiz-resume/
├── app/
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page (assembles all sections)
├── components/
│   ├── NavBar.tsx         # Sticky navigation with active-section highlight
│   ├── Hero.tsx           # Full-screen hero with stats
│   ├── Education.tsx      # Academic qualifications table
│   ├── Achievements.tsx   # Scholastic honors grid
│   ├── Experience.tsx     # Work experience cards
│   ├── Projects.tsx       # Projects grid with tags
│   ├── Skills.tsx         # Categorized technical skills
│   ├── Positions.tsx      # Positions of responsibility
│   ├── Courses.tsx        # Relevant coursework
│   ├── ExtraCurricular.tsx# Activities & achievements
│   └── Footer.tsx         # Contact section + footer
├── lib/
│   └── data.ts            # All resume content (edit here to update)
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

---

## ✏️ Customization

All resume content lives in **`lib/data.ts`**. Edit that file to update any section without touching the components.

---

## 🎨 Design

- **Theme:** Modern Dark (midnight background `#0a0a12`)
- **Accents:** Electric Cyan `#00d4ff` · Purple `#8b5cf6` · Neon Green `#00ff88`
- **Typography:** Inter + JetBrains Mono
- **Features:** Smooth scroll, sticky nav with active-section tracking, glassmorphism cards, hover glow effects, animated hero
