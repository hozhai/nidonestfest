<template>
  <section class="py-20 px-5">
    <div class="container">
      <h2 class="text-center text-3xl md:text-4xl font-bold mb-10 text-primary">
        {{ t('videos.title') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="index in 3" :key="`video-placeholder-${index}`"
          class="flex items-center justify-center flex-col gap-2 bg-white rounded-lg p-8 shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <i class="fas fa-video text-3xl text-accent" />
          <p>{{ t('videos.pending') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { t } = useI18n();
const pageTitle = computed(() => t('nav.videos'));

useHead(() => ({
  title: pageTitle.value
}));
</script>
