import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
declare module "../../node_modules/.pnpm/nuxt@3.8.2_qb26myshdvkt5vu5yn52a3mrvi/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}