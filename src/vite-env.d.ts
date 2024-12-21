/// <reference types="vite/client" />

interface ImportMetaEnv {
  BASE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
