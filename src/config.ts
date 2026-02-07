/**
 * Config per CTA e form. Override con variabili d'ambiente a build time.
 * Vedi CONFIG.md per dettagli.
 */
const getEnv = (key: string, fallback: string) =>
  typeof import.meta.env[key] !== 'undefined' ? String(import.meta.env[key]) : fallback;

export const siteConfig = {
  /** true = link a Typeform/Google Form; false = form nativo in pagina */
  useExternalForm: getEnv('PUBLIC_USE_EXTERNAL_FORM', 'false') === 'true',
  /** URL del form esterno (usato se useExternalForm = true) */
  externalFormUrl: getEnv('PUBLIC_EXTERNAL_FORM_URL', ''),
  /** Endpoint per submit form nativo (placeholder) */
  applyEndpoint: getEnv('PUBLIC_APPLY_ENDPOINT', '/api/apply'),
  /** Base path del sito (per link e asset) */
  basePath: import.meta.env.BASE_PATH || '',
  /** URL acquisto video (Gumroad / Stripe / ecc.): lezione 1 (~2h) e lezione 2 (~4h). Vuoto = nasconde CTA. */
  videoPurchaseUrl: getEnv('PUBLIC_VIDEO_PURCHASE_URL', ''),
} as const;
