# Brightlingsea Academy — School Website

**A complete junior high school website built with school colors: Blue (#0056A3), Orange (#FF6B35), Yellow (#FFD700)**

---

## 📂 Project Structure

```
Brightlingsea Academy/
│
├── README.md                              # This file
├── JHS-Website-Client-Requirements-Checklist.md   # Full client checklist with phases
│
├── index.html                             # Homepage (Phase 1)
├── about.html                             # About Us page (Phase 1)
├── admissions.html                        # Admissions page (Phase 1)
├── gallery.html                           # Photo Gallery page (Phase 1)
├── activities.html                        # Activities page (Phase 1)
├── anniversary.html                       # Anniversary page (Phase 1)
├── contact.html                           # Contact page (Phase 1)
│
├── grade-checker/
│   ├── index.html                         # Grade Checker page (Phase 1)
│
├── assets/
│   ├── css/
│   │   ├── main.css                       # Global styles, colors, components
│   │   └── pages.css                      # Page-specific styles
│   │
│   ├── js/
│   │   ├── main.js                        # Shared JS: menu, animations, form handling
│   │   └── grade-checker.js               # Grade checker logic & demo data
│   │
│   └── images/                            # Add your school photos here
│
└── [future] Phase 2 & 3 pages as needed
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|---|---|---|
| **Blue** | `#0056A3` | Navigation, trust elements, headers |
| **Orange** | `#FF6B35` | Call-to-action buttons, highlights, CTAs |
| **Yellow** | `#FFD700` | Homepage accents, hero highlights, badges |

---

## 📄 Pages Built (Phase 1 — Yellow Tier)

| Page | File | Description |
|---|---|---|
| **Homepage** | `index.html` | Hero, quick links, about preview, stats, events, CTA |
| **About** | `about.html` | History, mission, vision, values, leadership team |
| **Admissions** | `admissions.html` | Requirements, documents, fees table, application process |
| **Gallery** | `gallery.html` | Filterable photo grid with 24 placeholder items (6 categories) |
| **Activities** | `activities.html` | Filterable activities grid: sports, clubs, events, community, achievements |
| **Anniversary** | `anniversary.html` | 25+ years banner, timeline (7 milestones), photo mini-gallery |
| **Contact** | `contact.html` | Contact info, map placeholder, school hours, contact form |
| **Grade Checker** | `grade-checker/index.html` | BECE results lookup with 4 sample students + demo mode |

---

## 🔧 Key Features

- **Fully responsive** — mobile-first design, works on Opera Mini
- **School branding** — all pages use the orange/blue/yellow palette
- **Mobile navigation** — hamburger menu with smooth animation
- **Scroll animations** — reveal effects as sections scroll into view
- **Counter animation** — hero stats animate when visible
- **Gallery filter** — category-based filtering with smooth transitions
- **Activity filter** — category-based filtering
- **Contact form** — with validation, loading state, and success feedback
- **Grade checker** — index number validation, sample data (5 students), print to PDF, help modal
- **Footer** — dynamic year, quick links, social icons
- **Back to top** — floating button appears after scrolling
- **Accessibility** — semantic HTML, aria labels, keyboard navigation

---

## 📄 Client Checklist

See `JHS-Website-Client-Requirements-Checklist.md` for the full requirements checklist organized in 3 phases:

- 🟡 **Phase 1 (Yellow)** — Foundation MVP, 1–2 weeks
- 🟠 **Phase 2 (Orange)** — Parent engagement, 2–3 weeks
- 🔵 **Phase 3 (Blue)** — Full digital ecosystem, 3–4 weeks

---

## 🚀 Getting Started

1. **Replace placeholder content** with real school information
2. **Add real photos** to `assets/images/` and update the `<img>` tags
3. **Customize the sample data** in `assets/js/grade-checker.js`
4. **Update contact details** (phone, email, address) across all pages
5. **Deploy** to your hosting provider

---

## 📝 To-Do for Production

- [ ] Replace all placeholder icons with real `<img>` tags pointing to school photos
- [ ] Connect grade checker to real GES database (or use CSV/JSON backend)
- [ ] Update school name, history, and content throughout
- [ ] Add Google Maps embed in contact page
- [ ] Consider adding SSL certificate
- [ ] Set up Google Analytics
- [ ] Submit to Google Search Console
