/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TIKTOK_CLIENT_ID: string
  readonly VITE_TIKTOK_CLIENT_SECRET: string
  readonly VITE_REDIRECT_URI: string
  readonly VITE_TIKTOK_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}