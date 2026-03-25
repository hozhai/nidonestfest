<template>
  <section class="py-20 px-5">
    <div class="container">
      <h2 class="text-center text-3xl md:text-4xl font-bold mb-12 text-primary">
        {{ t('about.title') }}
      </h2>
      <div class="grid gap-10">
        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('about.mission_title') }}</h3>
          <p class="text-[#333]">{{ t('about.mission_text') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-6 text-accent">{{ t('about.info_title') }}</h3>
          <p class="text-[#333]">{{ t('about.info_paragraph') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('about.about_nido_title') }}</h3>
          <div class="pending-box">
            <p>{{ t('about.about_nido') }}</p>
          </div>
        </div>

        <div id="judges" class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)] scroll-mt-28">
          <h3 class="text-2xl font-semibold mb-6 text-accent">{{ t('judges.title') }}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-[8px_8px_0_rgba(0,0,0,0.15)]">
              <div class="w-20 h-20 rounded-full bg-[#f0f2f5] flex items-center justify-center mx-auto mb-3">
                <Icon name="line-md:account" class="text-3xl text-accent" />
              </div>
              <h4 class="text-center font-semibold">{{ t('judges.david_gran.name') }}</h4>
              <div class="mt-3 rounded-lg bg-[#f8f9fa] p-4">
                <p class="text-sm text-[#333]">{{ t('judges.david_gran.description') }}</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-[8px_8px_0_rgba(0,0,0,0.15)]">
              <div class="w-20 h-20 rounded-full bg-[#f0f2f5] flex items-center justify-center mx-auto mb-3">
                <Icon name="line-md:account" class="text-3xl text-accent" />
              </div>
              <h4 class="text-center font-semibold">{{ t('judges.jonas_hekel.name') }}</h4>
              <div class="mt-3 rounded-lg bg-[#f8f9fa] p-4">
                <p class="text-sm text-[#333]">{{ t('judges.jonas_hekel.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { t } = useI18n();
const pageTitle = computed(() => t('nav.about'));

useHead(() => ({
  title: pageTitle.value
}));
</script>
