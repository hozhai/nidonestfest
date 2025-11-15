<template>
  <nav class="fixed w-full backdrop-blur-md top-12 z-40 bg-primary/50 shadow">
    <div class="container flex items-center justify-between py-4">
      <div class="text-white text-xl font-bold">{{ t('brand.title') }}</div>

      <ul class="hidden md:flex list-none gap-8 items-center">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink :to="item.to" class="text-white transition hover:text-highlight" :class="{
            'text-highlight font-bold': item.active
          }">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <button aria-label="Toggle menu" class="md:hidden flex flex-col gap-1 cursor-pointer z-50" type="button"
        @click="menuOpen = !menuOpen">
        <span class="w-6 h-0.5 transition-transform"
          :class="menuOpen ? 'rotate-[-45deg] translate-y-[6px] bg-black' : 'bg-white'" />
        <span class="w-6 h-0.5 bg-white transition-opacity" :class="{ 'opacity-0': menuOpen }" />
        <span class="w-6 h-0.5 transition-transform"
          :class="menuOpen ? 'rotate-[45deg] -translate-y-[6px] bg-black' : 'bg-white'" />
      </button>
    </div>

    <ul
      class="md:hidden fixed left-0 right-0 bottom-0 top-[64px] bg-white flex flex-col items-center pt-12 gap-5 shadow-lg transform transition-transform duration-300 z-40 -translate-x-full overflow-y-auto"
      :class="menuOpen ? 'translate-x-0 pointer-events-auto' : 'pointer-events-none'" :aria-hidden="!menuOpen">
      <li v-for="item in navItems" :key="`${item.to}-mobile`">
        <NuxtLink class="text-gray-900 text-lg" :to="item.to" @click="closeMenu">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const { t } = useI18n();
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

watch(
  () => route.path,
  () => {
    if (menuOpen.value) {
      menuOpen.value = false;
    }
  }
);

if (typeof window !== 'undefined') {
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
