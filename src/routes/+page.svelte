<script>
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n/i18n.js';
  import image from '$lib/public/bg.jpg?enhanced';

  let months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;
  const targetDate = new Date('2026-04-01T00:00:00').getTime();

  function updateCountdown() {
    const now = Date.now();
    const distance = targetDate - now;
    if (distance <= 0) {
      months = weeks = days = hours = minutes = seconds = 0;
      return;
    }
    months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44));
    weeks = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7));
    days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  let interval;
  onMount(() => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>
    {$t('nav.home')} | Nido Nest Fest
  </title>
</svelte:head>

<!-- Home Section / Hero -->
<section
  id="home"
  class="h-[80vh] text-white text-center relative overflow-hidden py-24 px-5 flex justify-center items-center"
>
  <enhanced:img src={image} alt="Background" class="absolute top-0 left-0 w-screen" />
  <div
    class="max-w-3xl mx-auto relative z-10 bg-black bg-opacity-50 px-20 py-10 rounded-xl backdrop-blur-lg"
  >
    <h2 class="text-4xl md:text-5xl font-bold mb-4">{$t('home.hero.title')}</h2>
    <p class="text-lg md:text-xl opacity-90 mb-8">{$t('home.hero.subtitle')}</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a
        href="/submission"
        class="inline-block px-6 py-3 rounded font-semibold bg-highlight text-white border-2 border-transparent transition transform hover:-translate-y-0.5 hover:bg-gold hover:text-primary shadow-[5px_5px_0_0_rgba(233,69,96,0.4)]"
        >{$t('home.hero.cta_submit')}</a
      >
      <a
        href="/about"
        class="inline-block px-6 py-3 rounded font-semibold border-2 border-white text-white transition hover:bg-white hover:text-primary"
        >{$t('home.hero.cta_learn')}</a
      >
    </div>
  </div>
</section>

<!-- Countdown Timer -->
<section class="bg-white text-black py-14 px-5 text-center">
  <div class="container">
    <div class="flex justify-center gap-5 flex-wrap">
      <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
        <span class="block text-3xl md:text-4xl font-bold text-gold" id="months">{months}</span>
        <span class="block text-xs mt-2 uppercase tracking-wider text-white"
          >{$t('home.countdown.months')}</span
        >
      </div>
      <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
        <span class="block text-3xl md:text-4xl font-bold text-gold" id="weeks">{weeks}</span>
        <span class="block text-xs mt-2 uppercase tracking-wider text-white"
          >{$t('home.countdown.weeks')}</span
        >
      </div>
      <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
        <span class="block text-3xl md:text-4xl font-bold text-gold" id="days">{days}</span>
        <span class="block text-xs mt-2 uppercase tracking-wider text-white"
          >{$t('home.countdown.days')}</span
        >
      </div>
      <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
        <span class="block text-3xl md:text-4xl font-bold text-gold" id="hours">{hours}</span>
        <span class="block text-xs mt-2 uppercase tracking-wider text-white"
          >{$t('home.countdown.hours')}</span
        >
      </div>
      <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
        <span class="block text-3xl md:text-4xl font-bold text-gold" id="minutes">{minutes}</span>
        <span class="block text-xs mt-2 uppercase tracking-wider text-white"
          >{$t('home.countdown.minutes')}</span
        >
      </div>
      <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
        <span class="block text-3xl md:text-4xl font-bold text-gold" id="seconds">{seconds}</span>
        <span class="block text-xs mt-2 uppercase tracking-wider text-white"
          >{$t('home.countdown.seconds')}</span
        >
      </div>
    </div>
    <p class="mt-8 text-2xl md:text-3xl font-bold opacity-90">{$t('home.countdown.subtitle')}</p>
  </div>
</section>
