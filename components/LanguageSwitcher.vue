<template>
  <div class="sticky top-0 z-50 bg-bgdark text-white px-5 py-2 flex justify-end gap-2 shadow-sm">
    <button id="lang-en"
      class="border border-white/80 text-white px-3 py-1 rounded transition text-sm hover:bg-highlight hover:border-highlight"
      :class="{ 'bg-highlight border-highlight': currentLang === 'en' }" type="button" @click="setLanguage('en')">
      {{ t('language.english') }}
    </button>
    <button id="lang-es"
      class="border border-white/80 text-white px-3 py-1 rounded transition text-sm hover:bg-highlight hover:border-highlight"
      :class="{ 'bg-highlight border-highlight': currentLang === 'es' }" type="button" @click="setLanguage('es')">
      {{ t('language.spanish') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { lang, t } = useI18n();

const currentLang = computed(() => lang.value);

function setLanguage(value: 'en' | 'es') {
  lang.value = value;
}
</script>
