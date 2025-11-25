<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Sign In</h1>
      <button
        class="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-50 transition shadow-sm"
        @click="signIn.social({ provider: 'google' })">
        <Icon name="logos:google-icon" class="w-5 h-5" />
        <span>Sign in with Google</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signIn } from '~/lib/auth-client';

definePageMeta({
  layout: 'default'
});
</script>
