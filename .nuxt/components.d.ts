
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AppFooter: typeof import("../components/AppFooter.vue")['default']
export const LanguageSwitcher: typeof import("../components/LanguageSwitcher.vue")['default']
export const NavBar: typeof import("../components/NavBar.vue")['default']
export const UiBlurReveal: typeof import("../components/ui/blur-reveal/BlurReveal.vue")['default']
export const UiDropdownMenu: typeof import("../components/ui/dropdown-menu/DropdownMenu.vue")['default']
export const UiDropdownMenuCheckboxItem: typeof import("../components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue")['default']
export const UiDropdownMenuContent: typeof import("../components/ui/dropdown-menu/DropdownMenuContent.vue")['default']
export const UiDropdownMenuGroup: typeof import("../components/ui/dropdown-menu/DropdownMenuGroup.vue")['default']
export const UiDropdownMenuItem: typeof import("../components/ui/dropdown-menu/DropdownMenuItem.vue")['default']
export const UiDropdownMenuLabel: typeof import("../components/ui/dropdown-menu/DropdownMenuLabel.vue")['default']
export const UiDropdownMenuRadioGroup: typeof import("../components/ui/dropdown-menu/DropdownMenuRadioGroup.vue")['default']
export const UiDropdownMenuRadioItem: typeof import("../components/ui/dropdown-menu/DropdownMenuRadioItem.vue")['default']
export const UiDropdownMenuSeparator: typeof import("../components/ui/dropdown-menu/DropdownMenuSeparator.vue")['default']
export const UiDropdownMenuShortcut: typeof import("../components/ui/dropdown-menu/DropdownMenuShortcut.vue")['default']
export const UiDropdownMenuSub: typeof import("../components/ui/dropdown-menu/DropdownMenuSub.vue")['default']
export const UiDropdownMenuSubContent: typeof import("../components/ui/dropdown-menu/DropdownMenuSubContent.vue")['default']
export const UiDropdownMenuSubTrigger: typeof import("../components/ui/dropdown-menu/DropdownMenuSubTrigger.vue")['default']
export const UiDropdownMenuTrigger: typeof import("../components/ui/dropdown-menu/DropdownMenuTrigger.vue")['default']
export const UiTextHoverEffect: typeof import("../components/ui/text-hover-effect/TextHoverEffect.vue")['default']
export const UiVideoText: typeof import("../components/ui/video-text/VideoText.vue")['default']
export const UiWarpBackgroundBeam: typeof import("../components/ui/warp-background/Beam.vue")['default']
export const UiWarpBackground: typeof import("../components/ui/warp-background/WarpBackground.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const GSAPTransition: typeof import("../node_modules/v-gsap-nuxt/dist/runtime/components/GSAPTransition.vue")['default']
export const Icon: typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAppFooter: LazyComponent<typeof import("../components/AppFooter.vue")['default']>
export const LazyLanguageSwitcher: LazyComponent<typeof import("../components/LanguageSwitcher.vue")['default']>
export const LazyNavBar: LazyComponent<typeof import("../components/NavBar.vue")['default']>
export const LazyUiBlurReveal: LazyComponent<typeof import("../components/ui/blur-reveal/BlurReveal.vue")['default']>
export const LazyUiDropdownMenu: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenu.vue")['default']>
export const LazyUiDropdownMenuCheckboxItem: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue")['default']>
export const LazyUiDropdownMenuContent: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuContent.vue")['default']>
export const LazyUiDropdownMenuGroup: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuGroup.vue")['default']>
export const LazyUiDropdownMenuItem: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuItem.vue")['default']>
export const LazyUiDropdownMenuLabel: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuLabel.vue")['default']>
export const LazyUiDropdownMenuRadioGroup: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuRadioGroup.vue")['default']>
export const LazyUiDropdownMenuRadioItem: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuRadioItem.vue")['default']>
export const LazyUiDropdownMenuSeparator: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuSeparator.vue")['default']>
export const LazyUiDropdownMenuShortcut: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuShortcut.vue")['default']>
export const LazyUiDropdownMenuSub: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuSub.vue")['default']>
export const LazyUiDropdownMenuSubContent: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuSubContent.vue")['default']>
export const LazyUiDropdownMenuSubTrigger: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuSubTrigger.vue")['default']>
export const LazyUiDropdownMenuTrigger: LazyComponent<typeof import("../components/ui/dropdown-menu/DropdownMenuTrigger.vue")['default']>
export const LazyUiTextHoverEffect: LazyComponent<typeof import("../components/ui/text-hover-effect/TextHoverEffect.vue")['default']>
export const LazyUiVideoText: LazyComponent<typeof import("../components/ui/video-text/VideoText.vue")['default']>
export const LazyUiWarpBackgroundBeam: LazyComponent<typeof import("../components/ui/warp-background/Beam.vue")['default']>
export const LazyUiWarpBackground: LazyComponent<typeof import("../components/ui/warp-background/WarpBackground.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyGSAPTransition: LazyComponent<typeof import("../node_modules/v-gsap-nuxt/dist/runtime/components/GSAPTransition.vue")['default']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
