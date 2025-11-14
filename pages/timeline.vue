<template>
  <section class="py-20 px-5">
    <div class="container">
      <h2 class="text-center text-3xl md:text-4xl font-bold mb-10 text-primary">
        {{ t('timeline.title') }}
      </h2>
      <div class="pending-box">
        <p>{{ t('timeline.pending') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { t } = useI18n();
const pageTitle = computed(() => t('nav.timeline'));

useHead(() => ({
  title: pageTitle.value
}));
</script>
