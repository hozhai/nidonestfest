<script>
  import { t } from '$lib/i18n/i18n.js';
</script>

<svelte:head>
  <title>{$t('nav.about')} | Nido Nest Fest</title>
</svelte:head>

<section class="py-20 px-5">
  <div class="container">
    <h2 class="text-center text-3xl md:text-4xl font-bold mb-12 text-primary">
      {$t('about.title')}
    </h2>
    <div class="grid gap-10">
      <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
        <h3 class="text-2xl font-semibold mb-3 text-accent">{$t('about.mission_title')}</h3>
        <p class="text-[#333]">{$t('about.mission_text')}</p>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
        <h3 class="text-2xl font-semibold mb-6 text-accent">{$t('about.info_title')}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="p-5 rounded-lg bg-[#f8f9fa]">
            <h4 class="text-highlight mb-2 font-semibold">{$t('about.info.duration_title')}</h4>
            <p class="text-[#333]">{$t('about.info.duration_value')}</p>
          </div>
          <div class="p-5 rounded-lg bg-[#f8f9fa]">
            <h4 class="text-highlight mb-2 font-semibold">{$t('about.info.location_title')}</h4>
            <p class="text-[#333]">{$t('about.info.location_value')}</p>
          </div>
          <div class="p-5 rounded-lg bg-[#f8f9fa]">
            <h4 class="text-highlight mb-2 font-semibold">{$t('about.info.features_title')}</h4>
            <p class="text-[#333]">{$t('about.info.features_value')}</p>
          </div>
          <div class="p-5 rounded-lg bg-[#f8f9fa]">
            <h4 class="text-highlight mb-2 font-semibold">{$t('about.info.year_title')}</h4>
            <p class="text-[#333]">{$t('about.info.year_value')}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
        <h3 class="text-2xl font-semibold mb-3 text-accent">{$t('about.about_nido_title')}</h3>
        <div class="pending-box">
          <p>{$t('about.about_nido_pending')}</p>
        </div>
      </div>
    </div>
  </div>
</section>
