# Denis Bayor — Portfolio

A fast, single-page developer portfolio built with plain HTML, CSS and JavaScript. No build step, no framework.

## Files

| File | What it does |
| --- | --- |
| `index.html` | All content: Home, About, Skills, Projects, Experience & Services, Contact |
| `styles.css` | Navy/white/green design, responsive layout (phone, tablet, desktop) |
| `script.js` | Mobile menu, project filters, active nav link, scroll reveal, contact form |

## Before you publish — fill these in

Search `index.html` for `TODO` to find each spot.

1. **Email** — replace `your.email@example.com` (appears twice on the contact link).
2. **LinkedIn** — replace `https://www.linkedin.com/in/your-profile` (contact section and footer).
3. **CV** — add your PDF at `assets/Denis-Bayor-CV.pdf`.
4. **Screenshots** — add real screenshots at:
   - `assets/projects/ecomart.png`
   - `assets/projects/mobile.png`
   - `assets/projects/nkwa.png`
   - `assets/projects/medical.png`
   Until you do, each card shows a coloured placeholder. Landscape images around 1280×720 work best.
5. **EcoMart results** — replace "Add your real findings here" with your genuine usability-study findings.
6. **National Service** — describe what you actually do at Zannoo International School.
7. **Project repos** — the mobile, Nkwa and medical cards link to your GitHub profile; point each to its own repository once public.
8. **Project status badges** — adjust "Being polished" / "Coursework" to match reality.
9. **Contact form** (optional) — create a free form at https://formspree.io and replace `YOUR_FORM_ID`. Until then, the form opens the visitor's email app with the message pre-filled.

## Run locally

Open `index.html` in a browser, or for a local server:

```bash
npx serve .
```

## Deploy (GitHub + Vercel)

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/bayordenis/portfolio.git
git push -u origin main
```

Then on vercel.com: **Add New → Project → import `portfolio` → Deploy**. No build settings needed.
After it's live, uncomment the `og:url` / `og:image` tags in `index.html` and set them to your URL, then add the link to your CV, GitHub profile and LinkedIn.

## Final checklist

- [ ] Email, LinkedIn and CV added
- [ ] Real screenshots for every project
- [ ] Every button and link tested
- [ ] Checked on a phone
- [ ] Deployed and the live URL verified
