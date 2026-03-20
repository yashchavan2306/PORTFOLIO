# 🧑‍💻 Developer Portfolio

A clean, professional React portfolio with terminal aesthetics and a light warm color palette.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
```

The app will open at **http://localhost:3000**

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── Portfolio.jsx      ← Main component (edit this)
├── package.json
└── README.md
```

---

## ✏️ Customization

Open `src/Portfolio.jsx` and update:

| Item | Where to find it |
|---|---|
| Your name | Search `Alex Morgan` |
| Your title | Search `Full-Stack Engineer` |
| About text | Search `about-text` blocks |
| Projects | `const projects = [...]` array |
| Achievements | `const achievements = [...]` array |
| Skills | `const techCategories = [...]` array |
| Contact info | `contact-items` array |
| **Your photo** | Replace the `hero-photo-placeholder` div with: `<img className="hero-photo-img" src="YOUR_PHOTO_URL" alt="Your Name" />` |

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to the `build/` folder — ready to deploy to Vercel, Netlify, or any static host.

---

## 🎨 Fonts Used

- **Playfair Display** — headings & hero (serif)
- **JetBrains Mono** — terminal elements & labels (monospace)
- **DM Sans** — body text (sans-serif)

---

## 📦 Tech

- React 18
- Pure CSS (no external UI library)
- Google Fonts
