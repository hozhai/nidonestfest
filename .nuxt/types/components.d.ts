
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

interface _GlobalComponents {
  'AppFooter': typeof import("../../components/AppFooter.vue")['default']
  'LanguageSwitcher': typeof import("../../components/LanguageSwitcher.vue")['default']
  'NavBar': typeof import("../../components/NavBar.vue")['default']
  'UiBlurReveal': typeof import("../../components/ui/blur-reveal/BlurReveal.vue")['default']
  'UiDropdownMenu': typeof import("../../components/ui/dropdown-menu/DropdownMenu.vue")['default']
  'UiDropdownMenuCheckboxItem': typeof import("../../components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue")['default']
  'UiDropdownMenuContent': typeof import("../../components/ui/dropdown-menu/DropdownMenuContent.vue")['default']
  'UiDropdownMenuGroup': typeof import("../../components/ui/dropdown-menu/DropdownMenuGroup.vue")['default']
  'UiDropdownMenuItem': typeof import("../../components/ui/dropdown-menu/DropdownMenuItem.vue")['default']
  'UiDropdownMenuLabel': typeof import("../../components/ui/dropdown-menu/DropdownMenuLabel.vue")['default']
  'UiDropdownMenuRadioGroup': typeof import("../../components/ui/dropdown-menu/DropdownMenuRadioGroup.vue")['default']
  'UiDropdownMenuRadioItem': typeof import("../../components/ui/dropdown-menu/DropdownMenuRadioItem.vue")['default']
  'UiDropdownMenuSeparator': typeof import("../../components/ui/dropdown-menu/DropdownMenuSeparator.vue")['default']
  'UiDropdownMenuShortcut': typeof import("../../components/ui/dropdown-menu/DropdownMenuShortcut.vue")['default']
  'UiDropdownMenuSub': typeof import("../../components/ui/dropdown-menu/DropdownMenuSub.vue")['default']
  'UiDropdownMenuSubContent': typeof import("../../components/ui/dropdown-menu/DropdownMenuSubContent.vue")['default']
  'UiDropdownMenuSubTrigger': typeof import("../../components/ui/dropdown-menu/DropdownMenuSubTrigger.vue")['default']
  'UiDropdownMenuTrigger': typeof import("../../components/ui/dropdown-menu/DropdownMenuTrigger.vue")['default']
  'UiTextHoverEffect': typeof import("../../components/ui/text-hover-effect/TextHoverEffect.vue")['default']
  'UiVideoText': typeof import("../../components/ui/video-text/VideoText.vue")['default']
  'UiWarpBackgroundBeam': typeof import("../../components/ui/warp-background/Beam.vue")['default']
  'UiWarpBackground': typeof import("../../components/ui/warp-background/WarpBackground.vue")['default']
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  'GSAPTransition': typeof import("../../node_modules/v-gsap-nuxt/dist/runtime/components/GSAPTransition.vue")['default']
  'Icon': typeof import("../../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  'LazyAppFooter': LazyComponent<typeof import("../../components/AppFooter.vue")['default']>
  'LazyLanguageSwitcher': LazyComponent<typeof import("../../components/LanguageSwitcher.vue")['default']>
  'LazyNavBar': LazyComponent<typeof import("../../components/NavBar.vue")['default']>
  'LazyUiBlurReveal': LazyComponent<typeof import("../../components/ui/blur-reveal/BlurReveal.vue")['default']>
  'LazyUiDropdownMenu': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenu.vue")['default']>
  'LazyUiDropdownMenuCheckboxItem': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue")['default']>
  'LazyUiDropdownMenuContent': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuContent.vue")['default']>
  'LazyUiDropdownMenuGroup': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuGroup.vue")['default']>
  'LazyUiDropdownMenuItem': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuItem.vue")['default']>
  'LazyUiDropdownMenuLabel': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuLabel.vue")['default']>
  'LazyUiDropdownMenuRadioGroup': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuRadioGroup.vue")['default']>
  'LazyUiDropdownMenuRadioItem': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuRadioItem.vue")['default']>
  'LazyUiDropdownMenuSeparator': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuSeparator.vue")['default']>
  'LazyUiDropdownMenuShortcut': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuShortcut.vue")['default']>
  'LazyUiDropdownMenuSub': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuSub.vue")['default']>
  'LazyUiDropdownMenuSubContent': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuSubContent.vue")['default']>
  'LazyUiDropdownMenuSubTrigger': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuSubTrigger.vue")['default']>
  'LazyUiDropdownMenuTrigger': LazyComponent<typeof import("../../components/ui/dropdown-menu/DropdownMenuTrigger.vue")['default']>
  'LazyUiTextHoverEffect': LazyComponent<typeof import("../../components/ui/text-hover-effect/TextHoverEffect.vue")['default']>
  'LazyUiVideoText': LazyComponent<typeof import("../../components/ui/video-text/VideoText.vue")['default']>
  'LazyUiWarpBackgroundBeam': LazyComponent<typeof import("../../components/ui/warp-background/Beam.vue")['default']>
  'LazyUiWarpBackground': LazyComponent<typeof import("../../components/ui/warp-background/WarpBackground.vue")['default']>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  'LazyGSAPTransition': LazyComponent<typeof import("../../node_modules/v-gsap-nuxt/dist/runtime/components/GSAPTransition.vue")['default']>
  'LazyIcon': LazyComponent<typeof import("../../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
