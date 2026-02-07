# Config — CTA, form, base path

Modifiche senza toccare il codice: variabili d'ambiente a **build time**.

---

## Base path (subdomain vs path)

- **Subdomain** `polyversity.marinuzzi.it`: non impostare nulla (o `BASE_PATH=`).
- **Path** `marinuzzi.it/polyversity`: imposta `BASE_PATH=/polyversity`.

```bash
# Esempio build per subdomain (default)
npm run build

# Esempio build per path
BASE_PATH=/polyversity npm run build
```

In Nginx / Cloudflare Pages, la root del sito deve puntare alla cartella `dist` (o `dist/` senza rewrite per path).

---

## Form di candidatura (Cohort Zero)

Due modalità:

### 1. Form nativo (default)

Il sito mostra il form in pagina. L’invio va a un endpoint che **devi** fornire (sito statico = niente `/api/apply` sul server).

- `PUBLIC_USE_EXTERNAL_FORM=false` (o non impostato)
- `PUBLIC_APPLY_ENDPOINT=` URL completo del tuo backend o servizio (es. Formspree, Getform, tuo server).

Esempio con Formspree:

```bash
PUBLIC_APPLY_ENDPOINT=https://formspree.io/f/xxxxx npm run build
```

Il form invia `POST` con `Content-Type: application/x-www-form-urlencoded` (campi: name, email, age, letter, portfolio).

### 2. Form esterno (Typeform / Google Form)

Il sito mostra un pulsante che apre il form esterno.

- `PUBLIC_USE_EXTERNAL_FORM=true`
- `PUBLIC_EXTERNAL_FORM_URL=` URL del Typeform o Google Form

```bash
PUBLIC_USE_EXTERNAL_FORM=true PUBLIC_EXTERNAL_FORM_URL=https://form.typeform.com/to/xxxxx npm run build
```

---

## Video (lezioni AI Ordine)

Per la pagina **Video** (`/video`): due lezioni (~2h e ~4h) dal corso AI per l'Ordine. Il pulsante "Acquista accesso" punta all'URL che configuri.

- `PUBLIC_VIDEO_PURCHASE_URL=` URL della pagina di acquisto (Gumroad, Stripe Payment Link, PayPal, ecc.). Se vuoto, la CTA non viene mostrata (solo messaggio "in configurazione").

```bash
PUBLIC_VIDEO_PURCHASE_URL=https://gumroad.com/l/xxxxx npm run build
```

---

## Riepilogo variabili

| Variabile | Default | Descrizione |
|-----------|---------|-------------|
| `BASE_PATH` | `''` | Prefisso path (es. `/polyversity`) |
| `PUBLIC_USE_EXTERNAL_FORM` | `false` | `true` = link a form esterno |
| `PUBLIC_EXTERNAL_FORM_URL` | `''` | URL Typeform/Google Form (se form esterno) |
| `PUBLIC_APPLY_ENDPOINT` | `/api/apply` | Endpoint per form nativo (URL assoluto consigliato) |
| `PUBLIC_VIDEO_PURCHASE_URL` | `''` | URL acquisto video (Gumroad / Stripe / ecc.) |

---

## File .env

Puoi creare un file `.env` nella root del progetto (non committare dati sensibili). Esempio:

```env
BASE_PATH=
PUBLIC_USE_EXTERNAL_FORM=false
PUBLIC_EXTERNAL_FORM_URL=
PUBLIC_APPLY_ENDPOINT=https://formspree.io/f/yourformid
PUBLIC_VIDEO_PURCHASE_URL=https://gumroad.com/l/yourproduct
```

Poi: `npm run build`. Astro legge `.env`; per le `PUBLIC_*` le inietta anche nel client tramite `astro.config.mjs`.
