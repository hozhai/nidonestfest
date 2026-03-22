<template>
  <section class="py-20 px-5 bg-white">
    <div class="container mx-auto max-w-3xl">
      <h2 class="text-center text-3xl md:text-4xl font-bold mb-12 text-primary">{{ t('toc.title') }}</h2>

      <div class="prose prose-gray max-w-none space-y-8">
        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <p class="text-gray-600">{{ t('toc.intro') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('toc.sections.eligibility.title') }}</h3>
          <p class="text-gray-600">{{ t('toc.sections.eligibility.content') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('toc.sections.originality.title') }}</h3>
          <p class="text-gray-600 mb-3">{{ t('toc.sections.originality.content1') }}</p>
          <p class="text-gray-600 mb-3">{{ t('toc.sections.originality.content2') }}</p>
          <p class="text-gray-600">{{ t('toc.sections.originality.content3') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('toc.sections.contentGuidelines.title') }}</h3>
          <p class="text-gray-600">{{ t('toc.sections.contentGuidelines.content') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('toc.sections.submissionFormat.title') }}</h3>
          <p class="text-gray-600">{{ t('toc.sections.submissionFormat.content') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('toc.sections.usageRights.title') }}</h3>
          <p class="text-gray-600">{{ t('toc.sections.usageRights.content') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('toc.sections.judging.title') }}</h3>
          <p class="text-gray-600">{{ t('toc.sections.judging.content') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('toc.sections.liability.title') }}</h3>
          <p class="text-gray-600">{{ t('toc.sections.liability.content') }}</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <h3 class="text-2xl font-semibold mb-3 text-accent">{{ t('toc.sections.agreement.title') }}</h3>
          <p class="text-gray-600">{{ t('toc.sections.agreement.content') }}</p>
        </div>

        <p class="text-sm text-gray-600 text-center pt-4">{{ t('toc.contact') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { t } = useI18n();
const pageTitle = computed(() => t('toc.title'));

useHead(() => ({
  title: pageTitle.value
}));
</script>
