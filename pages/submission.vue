<template>
  <section class="py-20 px-5 bg-white">
    <div class="container mx-auto">
      <h2 class="text-center text-3xl md:text-4xl font-bold mb-10 text-primary">
        {{ t('submission.title') }}
      </h2>

      <div v-if="session.data" class="max-w-4xl mx-auto">
        <!-- Admin View -->
        <div v-if="isAdmin" class="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 class="text-2xl font-bold mb-6 text-gray-800">{{ t('submission.admin.title') }}</h3>
          <div v-if="adminSubmissions.length === 0" class="text-gray-500">
            {{ t('submission.admin.noSubmissions') }}
          </div>
          <div v-else class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead class="bg-gray-100">
                <tr>
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Film</th>
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Runtime
                  </th>
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="sub in adminSubmissions" :key="sub.id"
                  class="hover:bg-gray-50 cursor-pointer transition-colors" @click="openDialog(sub)">
                  <td class="py-3 px-4">
                    <div class="flex items-center">
                      <div class="text-sm font-medium text-gray-900">{{ sub.full_name }}</div>
                    </div>
                    <div class="text-xs text-gray-500">{{ sub.email }}</div>
                  </td>
                  <td class="py-3 px-4">
                    <div class="text-sm text-gray-900 font-medium">{{ sub.film_name }}</div>
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-500">{{ sub.genre }}</td>
                  <td class="py-3 px-4 text-sm text-gray-500">{{ sub.runtime }}</td>
                  <td class="py-3 px-4 text-sm text-gray-500">{{ new Date(sub.created_at).toLocaleDateString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Dialog v-model:open="isDialogOpen">
            <DialogContent class="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle class="text-xl">{{ selectedSubmission?.film_name }}</DialogTitle>
                <DialogDescription>
                  Submitted by {{ selectedSubmission?.full_name }}
                </DialogDescription>
              </DialogHeader>

              <div v-if="selectedSubmission" class="grid gap-6 py-4">
                <!-- Contact Info -->
                <div class="bg-gray-50 p-3 rounded-md">
                  <h4 class="font-semibold text-sm text-gray-700 mb-2">Contact Information</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div><span class="text-gray-500">Email:</span> {{ selectedSubmission.email }}</div>
                    <div v-if="selectedSubmission.social_link"><span class="text-gray-500">Social:</span> <a
                        :href="selectedSubmission.social_link" target="_blank" class="text-blue-600 hover:underline">{{
                        selectedSubmission.social_link }}</a></div>
                  </div>
                </div>

                <!-- Film Details -->
                <div>
                  <h4 class="font-semibold text-sm text-gray-700 mb-2 border-b pb-1">Film Details</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="block text-xs text-gray-500 uppercase">Genre</span>
                      {{ selectedSubmission.genre }}
                    </div>
                    <div>
                      <span class="block text-xs text-gray-500 uppercase">Runtime</span>
                      {{ selectedSubmission.runtime }}
                    </div>
                    <div>
                      <span class="block text-xs text-gray-500 uppercase">Language</span>
                      {{ selectedSubmission.language }}
                    </div>
                    <div>
                      <span class="block text-xs text-gray-500 uppercase">Country</span>
                      {{ selectedSubmission.country }}
                    </div>
                  </div>
                </div>

                <!-- Technical Specs -->
                <div>
                  <h4 class="font-semibold text-sm text-gray-700 mb-2 border-b pb-1">Technical Specs & Production</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="block text-xs text-gray-500 uppercase">Production Dates</span>
                      {{ selectedSubmission.production_dates }}
                    </div>
                    <div>
                      <span class="block text-xs text-gray-500 uppercase">Budget</span>
                      {{ selectedSubmission.budget || 'N/A' }}
                    </div>
                    <div>
                      <span class="block text-xs text-gray-500 uppercase">Shooting Format</span>
                      {{ selectedSubmission.shooting_format }}
                    </div>
                    <div>
                      <span class="block text-xs text-gray-500 uppercase">Aspect Ratio</span>
                      {{ selectedSubmission.aspect_ratio }}
                    </div>
                  </div>
                </div>

                <!-- Long Text Fields -->
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-sm text-gray-700 mb-1">Synopsis</h4>
                    <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{{
                      selectedSubmission.synopsis }}</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-sm text-gray-700 mb-1">Past Screenings</h4>
                    <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{{
                      selectedSubmission.past_screenings }}</p>
                  </div>

                  <div v-if="selectedSubmission.additional_info">
                    <h4 class="font-semibold text-sm text-gray-700 mb-1">Additional Info</h4>
                    <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{{
                      selectedSubmission.additional_info }}</p>
                  </div>
                </div>

                <div class="text-xs text-gray-400 text-right border-t pt-2">
                  Submission ID: {{ selectedSubmission.id }} • Created: {{ new
                    Date(selectedSubmission.created_at).toLocaleString() }}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <!-- Submission Form -->
        <form class="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100" @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.fullName') }}</label>
              <input v-model="formData.fullName" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Social Media -->
            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.socialLink') }}</label>
              <input v-model="formData.socialLink" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Film Name -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.filmName') }}</label>
              <input v-model="formData.filmName" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Genre -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.genre') }}</label>
              <input v-model="formData.genre" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Synopsis -->
            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.synopsis') }}</label>
              <textarea v-model="formData.synopsis" rows="4" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition"></textarea>
            </div>

            <!-- Runtime -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.runtime') }}</label>
              <input v-model="formData.runtime" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Production Dates -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.productionDates')
                }}</label>
              <input v-model="formData.productionDates" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Budget -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.budget') }}</label>
              <input v-model="formData.budget" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Shooting Format -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.shootingFormat')
                }}</label>
              <input v-model="formData.shootingFormat" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Aspect Ratio -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.aspectRatio') }}</label>
              <input v-model="formData.aspectRatio" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Language -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.language') }}</label>
              <input v-model="formData.language" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Country -->
            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.country') }}</label>
              <input v-model="formData.country" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition" />
            </div>

            <!-- Past Screenings -->
            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.pastScreenings')
                }}</label>
              <textarea v-model="formData.pastScreenings" rows="3" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition"></textarea>
            </div>

            <!-- Additional Info -->
            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.additionalInfo')
                }}</label>
              <textarea v-model="formData.additionalInfo" rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition"></textarea>
            </div>
          </div>

          <!-- Submit Button & Messages -->
          <div class="mt-8 flex flex-col items-center">
            <button type="submit" :disabled="loading"
              class="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {{ loading ? 'Saving...' : (hasSubmission ? t('submission.form.update') : t('submission.form.submit')) }}
            </button>

            <div v-if="message"
              :class="['mt-4 p-3 rounded text-center w-full', isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
              {{ message }}
            </div>
          </div>
        </form>
      </div>

      <!-- Sign In Prompt -->
      <div v-else class="flex flex-col items-center justify-center py-10 text-center">
        <p class="text-xl text-gray-600 mb-6">{{ t("submission.signIn") }}</p>
        <button
          class="flex items-center cursor-pointer justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded hover:bg-gray-50 transition shadow-sm"
          @click="signIn.social({ provider: 'google' })">
          <Icon name="logos:google-icon" class="w-5 h-5" />
          <span>{{ t("submission.button") }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { signIn, useSession } from '~/lib/auth-client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

const { t } = useI18n();
const pageTitle = computed(() => t('nav.submit'));
const session = useSession();

useHead(() => ({
  title: pageTitle.value
}));

const formData = ref({
  fullName: '',
  socialLink: '',
  filmName: '',
  synopsis: '',
  genre: '',
  runtime: '',
  productionDates: '',
  budget: '',
  shootingFormat: '',
  aspectRatio: '',
  language: '',
  country: '',
  pastScreenings: '',
  additionalInfo: ''
});

const loading = ref(false);
const message = ref('');
const isError = ref(false);
const adminSubmissions = ref<any[]>([]);
const isAdmin = ref(false);
const hasSubmission = ref(false);

// Dialog state
const isDialogOpen = ref(false);
const selectedSubmission = ref<any>(null);

const openDialog = (submission: any) => {
  selectedSubmission.value = submission;
  isDialogOpen.value = true;
};

const fetchSubmission = async () => {
  try {
    const data = await $fetch<any>('/api/submission');
    if (data) {
      hasSubmission.value = true;
      formData.value = {
        fullName: data.full_name,
        socialLink: data.social_link || '',
        filmName: data.film_name,
        synopsis: data.synopsis,
        genre: data.genre,
        runtime: data.runtime,
        productionDates: data.production_dates,
        budget: data.budget || '',
        shootingFormat: data.shooting_format,
        aspectRatio: data.aspect_ratio,
        language: data.language,
        country: data.country,
        pastScreenings: data.past_screenings,
        additionalInfo: data.additional_info || ''
      };
    }
  } catch (e) {
    console.error("Error fetching submission", e);
  }
};

const fetchAdminData = async () => {
  try {
    const data = await $fetch<any[]>('/api/admin/submissions');
    adminSubmissions.value = data;
    isAdmin.value = true;
  } catch (e) {
    isAdmin.value = false;
  }
};

const initData = async () => {
  if (session.value.data) {
    await fetchSubmission();
    await fetchAdminData();
  }
};

onMounted(initData);

watch(session, async (newVal) => {
  if (newVal?.data) {
    await initData();
  }
});

const submitForm = async () => {
  loading.value = true;
  message.value = '';
  isError.value = false;

  try {
    await $fetch('/api/submission', {
      method: 'POST',
      body: formData.value
    });
    message.value = t('submission.form.success');
    hasSubmission.value = true;
    if (isAdmin.value) {
      await fetchAdminData();
    }
  } catch (e) {
    isError.value = true;
    message.value = t('submission.form.error');
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>
