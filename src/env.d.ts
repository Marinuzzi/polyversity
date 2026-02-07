/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BASE_PATH: string;
  readonly PUBLIC_USE_EXTERNAL_FORM: string;
  readonly PUBLIC_EXTERNAL_FORM_URL: string;
  readonly PUBLIC_APPLY_ENDPOINT: string;
  readonly PUBLIC_VIDEO_PURCHASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
