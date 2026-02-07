# POLYversity by Marinuzzi

Sito ufficiale **POLYversity** — contro l'università unica, per menti multiple. Target: giovani 15–20. Stack: Astro + Tailwind, static, SEO-oriented.

- **Dominio previsto:** `polyversity.marinuzzi.it`
- **Build:** static (Nginx, Cloudflare Pages, GitHub Pages)

---

## Requisiti

- Node.js 18+
- npm (o pnpm/yarn)

---

## Comandi

```bash
# Installazione
npm install

# Dev locale (http://localhost:4321)
npm run dev

# Build produzione → cartella dist/
npm run build

# Anteprima build locale
npm run preview
```

---

## Configurazione

- **Base path (subdomain vs path):** vedi [CONFIG.md](./CONFIG.md). Per subdomain lascia `BASE_PATH` vuoto; per path tipo `marinuzzi.it/polyversity` usa `BASE_PATH=/polyversity npm run build`.
- **Form candidatura:** form nativo (endpoint da configurare) o link a Typeform/Google Form. Stessa guida in [CONFIG.md](./CONFIG.md).
- **Copy:** tutte le stringhe sono documentate in [COPY.md](./COPY.md).

---

## Deploy

### Opzione A: Nginx (subdomain polyversity.marinuzzi.it)

1. Build: `npm run build` → output in `dist/`.
2. Copia il contenuto di `dist/` sul server (es. `/var/www/polyversity`).
3. Configura un virtual host Nginx per `polyversity.marinuzzi.it` con `root` che punta a quella cartella.
4. SSL: certificato per `polyversity.marinuzzi.it` (es. Let’s Encrypt).
5. Headers consigliati: caching per asset statici (vedi checklist sotto).

### Opzione B: Cloudflare Pages

1. Collega il repo a Cloudflare Pages.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Variabili d’ambiente (se servono): imposta `BASE_PATH`, `PUBLIC_USE_EXTERNAL_FORM`, `PUBLIC_EXTERNAL_FORM_URL`, `PUBLIC_APPLY_ENDPOINT` nella UI di Pages.
5. Dominio: aggiungi custom domain `polyversity.marinuzzi.it` e DNS (CNAME o proxy).

### Opzione C: GitHub Pages (con path)

Se usi path tipo `username.github.io/polyversity`:

```bash
BASE_PATH=/polyversity npm run build
```

Imposta in GitHub Pages la source su branch e cartella `dist` (o usa un workflow che fa build e pubblica la cartella `dist`).

---

## Checklist pre-deploy

- [ ] **DNS:** record A/CNAME per `polyversity.marinuzzi.it` (o per il path scelto) punta al server o a Cloudflare.
- [ ] **SSL:** certificato attivo per il dominio (HTTPS).
- [ ] **Base path:** build eseguito con `BASE_PATH` corretto (vuoto per subdomain, `/polyversity` per path).
- [ ] **Form:** scelta form nativo vs esterno; se nativo, `PUBLIC_APPLY_ENDPOINT` punta a un endpoint reale (Formspree, tuo backend, ecc.).
- [ ] **OG image:** aggiungi `public/og-default.png` (1200×630 px) per anteprima social, oppure aggiorna `ogImage` nelle pagine che usano un’immagine diversa.
- [ ] **Headers / caching:**
  - Cache lunga per asset con hash (es. `Cache-Control: public, max-age=31536000, immutable`).
  - HTML: `Cache-Control: public, max-age=0, must-revalidate` (o breve max-age).
- [ ] **robots.txt e sitemap:** in `public/robots.txt` è indicato `Sitemap: https://polyversity.marinuzzi.it/sitemap.xml`. Se usi base path, verifica che l’URL della sitemap sia raggiungibile (es. `https://polyversity.marinuzzi.it/polyversity/sitemap.xml`) e aggiorna il file se necessario.
- [ ] **Lighthouse:** verifica performance e accessibilità (target 90+).

---

## Struttura progetto

```
polyversity/
├── public/           # Statici (favicon, robots, og image)
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/        # Una pagina per route
│   ├── styles/
│   ├── config.ts     # Config form/base path (legge env)
│   └── env.d.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── COPY.md           # Tutte le stringhe copy
├── CONFIG.md         # Istruzioni CTA, form, base path
└── README.md
```

---

## Licenza

Privato / riservato. Nessuna ridistribuzione senza autorizzazione.
