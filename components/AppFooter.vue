<template>
  <footer class="bg-primary text-white pt-12 pb-6 border-t-4 border-t-accent">
    <div class="container">
      <div class="grid gap-10 md:grid-cols-3 mb-6">
        <div>
          <h3 class="text-white mb-3 text-xl font-semibold">{{ t('brand.title') }}</h3>
          <p>{{ t('footer.tagline') }}</p>
        </div>
        <div>
          <h4 class="text-white mb-3 text-lg font-semibold">{{ t('footer.quick_links') }}</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink class="hover:text-highlight transition-all duration-300" to="/about">{{ t('nav.about') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:text-highlight transition-all duration-300" to="/submission">{{ t('nav.submit')
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:text-highlight transition-all duration-300" to="/about#judges">{{ t('nav.judges')
                }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:text-highlight transition-all duration-300" to="/timeline">{{ t('nav.timeline') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-white mb-3 text-lg font-semibold">{{ t('footer.contact') }}</h4>
          <div class="pending-box">
            <p>
              <a class="text-white hover:text-highlight transition-colors duration-300"
                href="mailto:jonas.hekel@students.nido.cl">
                jonas.hekel@students.nido.cl
              </a>
            </p>
          </div>
        </div>
      </div>
      <div class="text-center pt-4 border-t border-white/10">
        <p>&copy; 2025 Nido Film Festival. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
