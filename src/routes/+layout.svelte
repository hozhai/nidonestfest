<script>
  import '../app.css';
  import { lang, t } from '$lib/i18n/i18n.js';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  let menuOpen = false;
  $: if (browser) document.body.classList.toggle('menu-open', menuOpen);
  // Close the mobile menu on route change to avoid locking scroll
  $: {
    const path = $page.url.pathname; // reactive dependency
    if (browser) menuOpen = false;
  }

  function closeMenu() {
    menuOpen = false;
  }
</script>

<div class="min-h-screen flex flex-col">
  <!-- Language Switcher -->
  <div class="sticky top-0 z-50 bg-bgdark text-white px-5 py-2 flex justify-end gap-2">
    <button
      id="lang-en"
      class="border border-white/80 text-white px-3 py-1 rounded hover:bg-highlight hover:border-highlight transition text-sm"
      class:bg-highlight={$lang === 'en'}
      class:border-highlight={$lang === 'en'}
      on:click={() => lang.set('en')}>{$t('language.english')}</button
    >
    <button
      id="lang-es"
      class="border border-white/80 text-white px-3 py-1 rounded hover:bg-highlight hover:border-highlight transition text-sm"
      class:bg-highlight={$lang === 'es'}
      class:border-highlight={$lang === 'es'}
      on:click={() => lang.set('es')}>{$t('language.spanish')}</button
    >
  </div>

  <!-- Navigation -->
  <nav class="fixed w-full backdrop-blur-xl top-10 z-50 bg-primary shadow bg-opacity-70">
    <div class="container flex items-center justify-between py-4">
      <div class="text-white text-xl font-bold">{$t('brand.title')}</div>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex list-none gap-8 items-center">
        <li>
          <a
            href="/"
            class="text-white hover:text-highlight transition"
            class:text-highlight={$page.url.pathname === '/'}
            class:font-bold={$page.url.pathname === '/'}>{$t('nav.home')}</a
          >
        </li>
        <li>
          <a
            href="/about"
            class="text-white hover:text-highlight transition"
            class:text-highlight={$page.url.pathname.startsWith('/about')}
            class:font-bold={$page.url.pathname.startsWith('/about')}>{$t('nav.about')}</a
          >
        </li>
        <li>
          <a
            href="/submission"
            class="text-white hover:text-highlight transition"
            class:text-highlight={$page.url.pathname.startsWith('/submission')}
            class:font-bold={$page.url.pathname.startsWith('/submission')}>{$t('nav.submit')}</a
          >
        </li>
        <li>
          <a
            href="/judges"
            class="text-white hover:text-highlight transition"
            class:text-highlight={$page.url.pathname.startsWith('/judges')}
            class:font-bold={$page.url.pathname.startsWith('/judges')}>{$t('nav.judges')}</a
          >
        </li>
        <li>
          <a
            href="/timeline"
            class="text-white hover:text-highlight transition"
            class:text-highlight={$page.url.pathname.startsWith('/timeline')}
            class:font-bold={$page.url.pathname.startsWith('/timeline')}>{$t('nav.timeline')}</a
          >
        </li>
        <li>
          <a
            href="/videos"
            class="text-white hover:text-highlight transition"
            class:text-highlight={$page.url.pathname.startsWith('/videos')}
            class:font-bold={$page.url.pathname.startsWith('/videos')}>{$t('nav.videos')}</a
          >
        </li>
      </ul>

      <!-- Hamburger -->
      <button
        aria-label="Toggle menu"
        class="md:hidden flex flex-col gap-1 cursor-pointer z-50"
        on:click={() => (menuOpen = !menuOpen)}
      >
        <span
          class="w-6 h-0.5 bg-white transition-transform"
          class:rotate-[-45deg]={menuOpen}
          class:translate-y-[6px]={menuOpen}
          class:bg-white={!menuOpen}
          class:bg-black={menuOpen}
        ></span>
        <span class="w-6 h-0.5 bg-white transition-opacity" class:opacity-0={menuOpen}></span>
        <span
          class="w-6 h-0.5 bg-white transition-transform"
          class:rotate-[45deg]={menuOpen}
          class:-translate-y-[6px]={menuOpen}
          class:bg-white={!menuOpen}
          class:bg-black={menuOpen}
        ></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <ul
      class="md:hidden fixed left-0 right-0 bottom-0 bg-white flex flex-col items-center pt-12 gap-5 shadow-lg transform transition-transform duration-300 z-40 top-[64px] -translate-x-full overflow-y-auto"
      class:translate-x-0={menuOpen}
      class:pointer-events-none={!menuOpen}
      aria-hidden={!menuOpen}
    >
      <li><a href="/" class="text-gray-900 text-lg" on:click={closeMenu}>{$t('nav.home')}</a></li>
      <li>
        <a href="/about" class="text-gray-900 text-lg" on:click={closeMenu}>{$t('nav.about')}</a>
      </li>
      <li>
        <a href="/submission" class="text-gray-900 text-lg" on:click={closeMenu}
          >{$t('nav.submit')}</a
        >
      </li>
      <li>
        <a href="/judges" class="text-gray-900 text-lg" on:click={closeMenu}>{$t('nav.judges')}</a>
      </li>
      <li>
        <a href="/timeline" class="text-gray-900 text-lg" on:click={closeMenu}
          >{$t('nav.timeline')}</a
        >
      </li>
      <li>
        <a href="/videos" class="text-gray-900 text-lg" on:click={closeMenu}>{$t('nav.videos')}</a>
      </li>
    </ul>
  </nav>

  <main class="flex-1">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="bg-primary text-white pt-12 pb-6 border-t-4 border-t-accent">
    <div class="container">
      <div class="grid gap-10 md:grid-cols-3 mb-6">
        <div>
          <h3 class="text-white mb-3 text-xl font-semibold">{$t('brand.title')}</h3>
          <p>{$t('footer.tagline')}</p>
        </div>
        <div>
          <h4 class="text-white mb-3 text-lg font-semibold">{$t('footer.quick_links')}</h4>
          <ul class="space-y-2">
            <li><a class="hover:text-highlight" href="/about">{$t('nav.about')}</a></li>
            <li><a class="hover:text-highlight" href="/submission">{$t('nav.submit')}</a></li>
            <li><a class="hover:text-highlight" href="/judges">{$t('nav.judges')}</a></li>
            <li><a class="hover:text-highlight" href="/timeline">{$t('nav.timeline')}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white mb-3 text-lg font-semibold">{$t('footer.contact')}</h4>
          <div class="pending-box">
            <p>
              <a class="text-white hover:text-highlight" href="mailto:jonas.hekel@students.nido.cl"
                >jonas.hekel@students.nido.cl</a
              >
            </p>
          </div>
        </div>
      </div>
      <div class="text-center pt-4 border-t border-white/10">
        <p>&copy; 2025 Nido Film Festival. {$t('footer.rights')}</p>
      </div>
    </div>
  </footer>
</div>
