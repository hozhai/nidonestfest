<template>
  <section class="h-screen p-20">
    <ui-blur-reveal>
      <h1 class="font-secondary font-black text-9xl italic mt-20">{{ t("home.hero.title.welcome") }}</h1>
    </ui-blur-reveal>
    <ui-blur-reveal :delay="300">
      <h2 class="font-secondary font-black text-7xl italic -mt-10">{{ t("home.hero.title.to_the") }}</h2>
           </ui-blur-reveal>
  </section>

  <section class="bg-white text-black py-14 px-5 text-center">
    <div class="container">
      <div class="flex justify-center gap-5 flex-wrap">
        <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
          <span class="block text-3xl md:text-4xl font-bold text-gold">{{ countdown.months }}</span>
          <span class="block text-xs mt-2 uppercase tracking-wider text-white">
            {{ t('home.countdown.months') }}
          </span>
        </div>
        <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
          <span class="block text-3xl md:text-4xl font-bold text-gold">{{ countdown.weeks }}</span>
          <span class="block text-xs mt-2 uppercase tracking-wider text-white">
            {{ t('home.countdown.weeks') }}
          </span>
        </div>
        <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
          <span class="block text-3xl md:text-4xl font-bold text-gold">{{ countdown.days }}</span>
          <span class="block text-xs mt-2 uppercase tracking-wider text-white">
            {{ t('home.countdown.days') }}
          </span>
        </div>
        <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
          <span class="block text-3xl md:text-4xl font-bold text-gold">{{ countdown.hours }}</span>
          <span class="block text-xs mt-2 uppercase tracking-wider text-white">
            {{ t('home.countdown.hours') }}
          </span>
        </div>
        <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
          <span class="block text-3xl md:text-4xl font-bold text-gold">{{ countdown.minutes }}</span>
          <span class="block text-xs mt-2 uppercase tracking-wider text-white">
            {{ t('home.countdown.minutes') }}
          </span>
        </div>
        <div class="bg-primary p-5 rounded-lg min-w-[90px] shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
          <span class="block text-3xl md:text-4xl font-bold text-gold">{{ countdown.seconds }}</span>
          <span class="block text-xs mt-2 uppercase tracking-wider text-white">
            {{ t('home.countdown.seconds') }}
          </span>
        </div>
      </div>
      <p class="mt-8 text-2xl md:text-3xl font-bold opacity-90">
        {{ t('home.countdown.subtitle') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue';

const { t } = useI18n();

const countdown = reactive({
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});

const targetDate = new Date('2026-04-01T00:00:00').getTime();
let intervalId: number | undefined;

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;
  if (distance <= 0) {
    countdown.months = 0;
    countdown.weeks = 0;
    countdown.days = 0;
    countdown.hours = 0;
    countdown.minutes = 0;
    countdown.seconds = 0;
    return;
  }

  countdown.months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44));
  countdown.weeks = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7));
  countdown.days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
  countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
}

onMounted(() => {
  updateCountdown();
  intervalId = window.setInterval(updateCountdown, 1000);
});

onBeforeUnmount(() => {
  if (intervalId) {
    window.clearInterval(intervalId);
  }
});

const pageTitle = computed(() => t('nav.home'));

useHead(() => ({
  title: pageTitle.value
}));
</script>
