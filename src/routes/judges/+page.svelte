<script>
  import { t } from '$lib/i18n/i18n.js';
</script>

<svelte:head>
  <title>
    {$t('nav.judges')} | Nido Nest Fest
  </title>
</svelte:head>

<section class="py-20 px-5">
  <div class="container">
    <h2 class="text-center text-3xl md:text-4xl font-bold mb-10 text-primary">
      {$t('judges.title')}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
        <div
          class="w-20 h-20 rounded-full bg-[#f0f2f5] flex items-center justify-center mx-auto mb-3"
        >
          <i class="fas fa-user text-2xl text-accent"></i>
        </div>
        <h3 class="text-center font-semibold">David Gran</h3>
        <div class="pending-box mt-3">
          <p>{$t('judges.pending')}</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
        <div
          class="w-20 h-20 rounded-full bg-[#f0f2f5] flex items-center justify-center mx-auto mb-3"
        >
          <i class="fas fa-user text-2xl text-accent"></i>
        </div>
        <h3 class="text-center font-semibold">Jonas Hekel</h3>
        <div class="pending-box mt-3">
          <p>{$t('judges.pending')}</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
        <div
          class="w-20 h-20 rounded-full bg-[#f0f2f5] flex items-center justify-center mx-auto mb-3"
        >
          <i class="fas fa-user text-2xl text-accent"></i>
        </div>
        <h3 class="text-center font-semibold">Pedro Pascal</h3>
        <div class="pending-box mt-3">
          <p>{$t('judges.pending')}</p>
        </div>
      </div>
    </div>
  </div>
</section>
