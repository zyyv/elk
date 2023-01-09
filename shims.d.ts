/// <reference types="@types/wicg-file-system-access" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.ftl?raw' {
  const content: string
  export default content
}
