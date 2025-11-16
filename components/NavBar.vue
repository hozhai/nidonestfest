<template>
  <nav :class="navClasses">
    <div class="container flex items-center justify-between gap-4 py-4">
      <div class="text-white text-xl font-bold">{{ t('brand.title') }}</div>

      <ul class="hidden md:flex list-none gap-8 items-center">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="text-white transition hover:text-highlight"
            :class="{ 'text-highlight font-bold': item.active }"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <div class="hidden md:flex gap-2">
          <button
            v-for="option in languageOptions"
            :key="option.code"
            type="button"
            :class="languageButtonClasses(option.code)"
            @click="setLanguage(option.code)"
          >
            {{ t(option.labelKey) }}
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          class="md:hidden flex flex-col gap-1 cursor-pointer z-50"
          type="button"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <span class="w-6 h-0.5 transition-transform" :class="menuOpen ? '-rotate-45 translate-y-1.5 bg-white' : 'bg-white'" />
          <span class="w-6 h-0.5 bg-white transition-opacity" :class="{ 'opacity-0': menuOpen }" />
          <span class="w-6 h-0.5 transition-transform" :class="menuOpen ? 'rotate-45 -translate-y-1.5 bg-white' : 'bg-white'" />
        </button>
      </div>
    </div>

    <ul
      class="md:hidden fixed w-full h-screen left-0 right-0 bottom-0 top-16 bg-white flex flex-col items-center pt-12 gap-5 shadow-lg transform transition-transform duration-300 z-40 overflow-y-auto"
      :class="menuOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'"
      :aria-hidden="!menuOpen"
    >
      <li v-for="item in navItems" :key="`${item.to}-mobile`">
        <NuxtLink class="text-gray-900 text-lg" :to="item.to" @click="closeMenu">
          {{ item.label }}
        </NuxtLink>
      </li>
      <li class="flex gap-3 pt-4">
        <button
          v-for="option in languageOptions"
          :key="`${option.code}-mobile`"
          type="button"
          :class="languageButtonClasses(option.code, 'light')"
          @click="setLanguage(option.code)"
        >
          {{ t(option.labelKey) }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const { t, lang } = useI18n();
const route = useRoute();

const menuOpen = ref(false);

const navItems = computed(() => [
  { to: '/', label: t('nav.home'), active: route.path === '/' },
  { to: '/about', label: t('nav.about'), active: route.path.startsWith('/about') },
  { to: '/submission', label: t('nav.submit'), active: route.path.startsWith('/submission') },
  { to: '/judges', label: t('nav.judges'), active: route.path.startsWith('/judges') },
  { to: '/timeline', label: t('nav.timeline'), active: route.path.startsWith('/timeline') },
  { to: '/videos', label: t('nav.videos'), active: route.path.startsWith('/videos') }
]);

const languageOptions = [
  { code: 'en', labelKey: 'language.english' },
  { code: 'es', labelKey: 'language.spanish' }
] as const;

type LanguageCode = (typeof languageOptions)[number]['code'];

const currentLang = computed(() => lang.value);

function setLanguage(value: LanguageCode) {
  lang.value = value;
}

function languageButtonClasses(code: LanguageCode, variant: 'dark' | 'light' = 'dark') {
  const base = 'px-3 py-1 rounded text-sm border transition font-medium';
  const palette = variant === 'dark'
    ? 'border-white/70 text-white hover:bg-highlight hover:border-highlight'
    : 'border-gray-800/40 text-gray-900 hover:bg-primary/10';
  const activeClasses = variant === 'dark'
    ? 'bg-highlight border-highlight text-white'
    : 'bg-primary/10 border-primary text-primary';

  return [
    base,
    palette,
    currentLang.value === code ? activeClasses : ''
  ]
    .filter(Boolean)
    .join(' ');
}

const isHome = computed(() => route.path === '/');
const hasScrolled = ref(false);
const isTransparent = computed(() => isHome.value && !hasScrolled.value);

const navClasses = computed(() => {
  const base = 'fixed left-0 right-0 top-0 z-40 transition-colors duration-300 border-b';
  return `${base} ${
    isTransparent.value
      ? 'bg-transparent border-transparent shadow-none'
      : 'bg-primary/70 border-white/10 shadow backdrop-blur-md'
  }`;
});

function updateScrollState() {
  if (!import.meta.client) return;
  if (!isHome.value) {
    hasScrolled.value = true;
    return;
  }
  hasScrolled.value = window.scrollY > 10;
}

watch(
  () => route.path,
  () => {
    if (menuOpen.value) {
      menuOpen.value = false;
    }
  }
);

if (import.meta.client) {
  onMounted(() => {
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateScrollState);
  });

  watch(isHome, () => {
    updateScrollState();
  });

  watch(
    menuOpen,
    (value: boolean) => {
      document.body.classList.toggle('menu-open', value);
    },
    { immediate: true }
  );
}

function closeMenu() {
  menuOpen.value = false;
}
</script>

