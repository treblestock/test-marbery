import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "../../node_modules/.pnpm/nuxt@3.8.2_qb26myshdvkt5vu5yn52a3mrvi/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}