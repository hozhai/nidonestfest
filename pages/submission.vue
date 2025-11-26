<template>
  <section class="py-20 px-5 bg-white">
    <div class="container">
      <h2 class="text-center text-3xl md:text-4xl font-bold mb-10 text-primary">
        {{ t('submission.title') }}
      </h2>
      <div v-if="session.data" class="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-5xl mx-auto">
        <iframe title="Film submission form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSd-ZHfbiwleUc0E7zIvtoAfY_P-zKbLeKOMEAOuBgcsNQAgww/viewform?embedded=true"
          width="100%" height="1200" frameborder="0" marginheight="0" marginwidth="0" class="w-full rounded-md">
          Loading…
        </iframe>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-10 text-center">
        <p class="text-xl text-gray-600 mb-6">{{ t("submission.signIn") }}</p>
        <button
          class="flex items-center cursor-pointer justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded hover:bg-gray-50 transition shadow-sm"
          @click="signIn.social({ provider: 'google' })">
          <Icon name="logos:google-icon" class="w-5 h-5" />
          <span>{{ t("submission.button") }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { signIn, useSession } from '~/lib/auth-client';

const { t } = useI18n();
const pageTitle = computed(() => t('nav.submit'));
const session = useSession();

useHead(() => ({
  title: pageTitle.value
}));
</script>
