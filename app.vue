<template>
    <div class="min-h-screen flex flex-col bg-[#f8f9fa] text-[#333333]">
        <NavBar />
        <main class="flex-1">
            <NuxtPage />
        </main>
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/NavBar.vue';
import AppFooter from '~/components/AppFooter.vue';
</script>
