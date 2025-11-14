<template>
  <section class="py-20 px-5 bg-white">
    <div class="container">
      <h2 class="text-center text-3xl md:text-4xl font-bold mb-10 text-primary">
        {{ t('submission.title') }}
      </h2>
      <div class="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-5xl mx-auto">
        <iframe title="Film submission form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSd-ZHfbiwleUc0E7zIvtoAfY_P-zKbLeKOMEAOuBgcsNQAgww/viewform?embedded=true"
          width="100%" height="1200" frameborder="0" marginheight="0" marginwidth="0" class="w-full rounded-md">
          Loading…
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { t } = useI18n();
const pageTitle = computed(() => t('nav.submit'));

useHead(() => ({
  title: pageTitle.value
}));
</script>
