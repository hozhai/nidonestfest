<script>
  import { t } from '$lib/i18n/i18n.js';
</script>

<svelte:head>
  <title>
    {$t('nav.timeline')} | Nido Nest Fest
  </title>
</svelte:head>

<section class="py-20 px-5">
  <div class="container">
    <h2 class="text-center text-3xl md:text-4xl font-bold mb-10 text-primary">
      {$t('timeline.title')}
    </h2>
    <div>
      <div class="pending-box">
        <p>{$t('timeline.pending')}</p>
      </div>
    </div>
  </div>
</section>
