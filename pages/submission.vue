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
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize</th>
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
                  <td class="py-3 px-4 text-sm text-gray-500">{{ formatPrizeDisplay(sub.prize_categories ||
                    sub.prize_category,
                    sub.prize_amount)
                  }}</td>
                  <td class="py-3 px-4 text-sm text-gray-500">{{ sub.runtime }}</td>
                  <td class="py-3 px-4 text-sm text-gray-500">{{ new Date(sub.created_at).toLocaleDateString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Dialog v-model:open="isDialogOpen">
            <DialogContent class="sm:max-w-[600px] max-h-[85vh] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogTitle class="text-xl text-gray-900">{{ selectedSubmission?.film_name }}</DialogTitle>
                <DialogDescription class="text-gray-500">
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
                    <div
                      v-if="(selectedSubmission.prize_categories || selectedSubmission.prize_category) || selectedSubmission.prize_amount">
                      <span class="text-gray-500">Prize:</span>
                      {{ formatPrizeDisplay(selectedSubmission.prize_categories || selectedSubmission.prize_category,
                        selectedSubmission.prize_amount) }}
                    </div>
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
        <form class="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100" @submit.prevent="submitForm()">
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

            <!-- Prize Categories / Fees -->
            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('submission.form.prize') }}</label>
              <p class="text-xs text-gray-500 mb-3">{{ t('submission.form.prizeInstructions') }}</p>
              <div class="grid gap-3 md:grid-cols-2">
                <label v-for="opt in prizeOptions" :key="opt.key" :class="['flex items-start gap-3 p-3 border rounded-lg transition cursor-pointer',
                  formData.prizeCategories.includes(opt.key) ? 'border-primary bg-primary/5' : 'border-gray-200',
                  hasLockedAwards && isLockedPrize(opt.key) ? 'opacity-60 cursor-not-allowed' : '']">
                  <input v-model="formData.prizeCategories" type="checkbox" :value="opt.key"
                    :disabled="hasLockedAwards && isLockedPrize(opt.key)" class="mt-1" />
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ prizeLabel(opt.key) }}</p>
                    <p class="text-xs text-gray-600">{{ formatClp(opt.entryFee) }}</p>
                  </div>
                </label>
              </div>
              <p class="mt-3 text-xs" :class="paymentAmount ? 'text-gray-600' : 'text-amber-600'">
                <span v-if="paymentAmount">{{ t('submission.form.priceToPay') }}:
                  {{ formatClp(paymentAmount) }}</span>
                <span v-else>{{ t('submission.form.prizeRequired') }}</span>
              </p>
              <p v-if="hasLockedAwards" class="mt-2 text-xs text-gray-500">
                Paid awards stay selected. You can add more categories and pay the difference.
              </p>
            </div>

            <div v-if="uniqueSelectedPrizes.length" class="col-span-1 md:col-span-2">
              <div class="flex flex-col gap-2 p-3 border border-primary/40 rounded-lg bg-primary/5">
                <div>
                  <p class="text-sm font-semibold text-gray-900">Webpay</p>
                  <p class="text-xs text-gray-600">{{ t('submission.payment.cardsInChile') }}</p>
                </div>
                <p class="text-xs text-gray-500">
                  {{ t('submission.payment.fallbackHelp') }}
                </p>
              </div>
              <p v-if="needsPaymentProof" class="mt-2 text-xs text-amber-600">
                {{ t('submission.payment.paymentRequired') }}
              </p>
              <div v-if="showTestPaymentToggle" class="mt-3">
                <label
                  class="flex items-start gap-3 p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer">
                  <input v-model="testPaymentOverride" type="checkbox" class="mt-1" />
                  <div>
                    <p class="text-sm font-semibold text-gray-900">Simulate payment (test mode)</p>
                    <p class="text-xs text-gray-600">
                      Skip the Webpay redirect and record this entry with a test payment provider. Use only on staging
                      or local environments.
                    </p>
                  </div>
                </label>
              </div>
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
import { PRIZE_OPTIONS, getPrizeOption } from '~/lib/prizes';

type SubmissionForm = {
  fullName: string;
  socialLink: string;
  filmName: string;
  synopsis: string;
  genre: string;
  runtime: string;
  productionDates: string;
  budget: string;
  shootingFormat: string;
  aspectRatio: string;
  language: string;
  country: string;
  pastScreenings: string;
  additionalInfo: string;
  prizeCategories: string[];
  webpayToken: string;
};

const initialForm: SubmissionForm = {
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
  additionalInfo: '',
  prizeCategories: [],
  webpayToken: '',
};

const DRAFT_STORAGE_KEY = 'nidonestfest_submission_draft';
const isClient = typeof window !== 'undefined';

const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();
const pageTitle = computed(() => t('nav.submit'));
const session = useSession();

useHead(() => ({
  title: pageTitle.value
}));

const formData = ref<SubmissionForm>({ ...initialForm });
const enablePaymentTestMode = computed(() => Boolean(runtimeConfig.public?.enablePaymentTestMode));
const testPaymentOverride = ref(false);
const originalPrizeCategories = ref<string[]>([]);
const originalPrizeAmount = ref<number | null>(null);
const originalPaymentProvider = ref<string | null>(null);
const originalPaymentReference = ref<string | null>(null);

const uniqueSelectedPrizes = computed(() => sortPrizeSelection(formData.value.prizeCategories));

const lockedPrizeKeys = computed(() => sortPrizeSelection(originalPrizeCategories.value));

const isLockedPrize = (key: string) => lockedPrizeKeys.value.includes(key);

const selectedPrizeTotal = computed(() => {
  return uniqueSelectedPrizes.value.reduce((sum, key) => {
    const option = getPrizeOption(key);
    return sum + (option?.entryFee ?? 0);
  }, 0);
});

const addedPrizeKeys = computed(() =>
  uniqueSelectedPrizes.value.filter((key) => !isLockedPrize(key))
);

const addedPrizeTotal = computed(() => {
  return addedPrizeKeys.value.reduce((sum, key) => {
    const option = getPrizeOption(key);
    return sum + (option?.entryFee ?? 0);
  }, 0);
});

const hasLockedAwards = computed(() => lockedPrizeKeys.value.length > 0);

const paymentAmount = computed(() => {
  if (hasLockedAwards.value) {
    return addedPrizeTotal.value;
  }
  return selectedPrizeTotal.value;
});

const hasPaymentProof = computed(() => Boolean(formData.value.webpayToken));

const needsPaymentProof = computed(() => {
  if (testPaymentOverride.value) return false;
  return paymentAmount.value > 0;
});

const showTestPaymentToggle = computed(
  () => enablePaymentTestMode.value && paymentAmount.value > 0
);

const formatClp = (amount?: number | null) => {
  if (!amount) return '';
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(amount);
};

const coercePrizeArray = (value?: string[] | string | null) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed) as string[];
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error('Failed to parse prize categories string', error);
      }
    }
    return [trimmed];
  }
  return [];
};

const sortPrizeSelection = (keys: string[]) => [...new Set(keys)].sort();

const selectionsEqual = (a: string[], b: string[]) => {
  const sortedA = sortPrizeSelection(a);
  const sortedB = sortPrizeSelection(b);
  if (sortedA.length !== sortedB.length) return false;
  return sortedA.every((key, idx) => key === sortedB[idx]);
};

const prizeLabel = (key: string) => {
  const label = t(`submission.prizes.${key}`);
  return label || key;
};

const formatPrizeDisplay = (categories?: string[] | string | null, amount?: number | null) => {
  const list = Array.from(new Set(coercePrizeArray(categories)));
  const label = list
    .map((key) => prizeLabel(key))
    .filter(Boolean)
    .join(', ');
  const amountLabel = amount ? formatClp(amount) : null;
  if (label && amountLabel) {
    return `${label} – ${amountLabel}`;
  }
  return label || amountLabel || '-';
};

const formatPaymentProvider = (provider?: string | null) => {
  if (!provider) return '';
  if (provider === 'webpay') return 'Webpay';
  if (provider === 'khipu') return 'Khipu';
  return provider;
};

const saveDraft = () => {
  if (!isClient) return;
  const { webpayToken, ...rest } = formData.value;
  window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(rest));
};

const loadDraft = () => {
  if (!isClient) return;
  const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw) as Partial<SubmissionForm>;
    formData.value = { ...formData.value, ...parsed };
  } catch (error) {
    console.error('Error loading submission draft', error);
  }
};

const prizeOptions = PRIZE_OPTIONS;

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

const route = useRoute();
const router = useRouter();

const finalizingPayment = ref(false);
const PAYMENT_QUERY_KEYS = ['token_ws'];

const clearPaymentQueryParams = () => {
  if (!isClient) return;
  const hasPaymentQuery = PAYMENT_QUERY_KEYS.some((key) => key in route.query);
  if (!hasPaymentQuery) return;
  const newQuery = { ...route.query } as Record<string, any>;
  PAYMENT_QUERY_KEYS.forEach((key) => {
    if (key in newQuery) {
      delete newQuery[key];
    }
  });
  router.replace({ path: route.path, query: newQuery });
};

const fetchSubmission = async () => {
  try {
    const data = await $fetch<any>('/api/submission');
    if (data) {
      hasSubmission.value = true;
      const parsedCategories = sortPrizeSelection(
        coercePrizeArray(data.prize_categories || data.prize_category)
      );
      originalPrizeCategories.value = parsedCategories;
      originalPrizeAmount.value = data.prize_amount || null;
      originalPaymentProvider.value = data.payment_provider || null;
      originalPaymentReference.value = data.payment_reference || null;
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
        additionalInfo: data.additional_info || '',
        prizeCategories: parsedCategories,
        webpayToken: ''
      };
    } else {
      hasSubmission.value = false;
      originalPrizeCategories.value = [];
      originalPrizeAmount.value = null;
      originalPaymentProvider.value = null;
      originalPaymentReference.value = null;
      formData.value.webpayToken = '';
    }
  } catch (e) {
    console.error('Error fetching submission', e);
  }
};

const fetchAdminData = async () => {
  try {
    const data = await $fetch<any[]>('/api/admin/submissions');
    adminSubmissions.value = data;
    isAdmin.value = true;
  } catch {
    isAdmin.value = false;
  }
};

const initData = async () => {
  if (session.value.data) {
    await fetchSubmission();
    await fetchAdminData();
  }
};

const redirectToWebpay = (url: string, token: string) => {
  if (!isClient) return;
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  form.style.display = 'none';
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'token_ws';
  input.value = token;
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
};

const startCheckout = async () => {
  if (!uniqueSelectedPrizes.value.length) return;
  if (paymentAmount.value <= 0) {
    return;
  }
  try {
    saveDraft();
    const sessionResponse = await $fetch<{
      method: 'webpay';
      url: string;
      token: string;
    }>('/api/payment/create-session', {
      method: 'POST',
      body: {
        prizeCategories: uniqueSelectedPrizes.value,
        paymentMethod: 'webpay'
      }
    });

    redirectToWebpay(sessionResponse.url, sessionResponse.token);
  } catch (error) {
    isError.value = true;
    message.value = t('submission.form.paymentError');
    console.error(error);
  }
};

const submitForm = async (options?: { skipPayment?: boolean }) => {
  const skipPaymentFlow = Boolean(options?.skipPayment);
  const hadPaymentProof = hasPaymentProof.value;
  loading.value = true;
  if (!skipPaymentFlow) {
    message.value = '';
    isError.value = false;
  }

  try {
    if (!uniqueSelectedPrizes.value.length) {
      isError.value = true;
      message.value = t('submission.form.prizeRequired');
      return;
    }
    if (!skipPaymentFlow && needsPaymentProof.value && !hasPaymentProof.value) {
      await startCheckout();
      return;
    }

    const payload: Record<string, any> = {
      ...formData.value,
      prizeCategories: uniqueSelectedPrizes.value,
      testPaymentBypass: enablePaymentTestMode.value && testPaymentOverride.value && paymentAmount.value > 0
    };
    await $fetch('/api/submission', {
      method: 'POST',
      body: payload
    });
    message.value = t('submission.form.success');
    hasSubmission.value = true;
    if (isAdmin.value) {
      await fetchAdminData();
    }
    await fetchSubmission();
    if (isClient) {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
    formData.value.webpayToken = '';
    if (!hasLockedAwards.value) {
      formData.value.prizeCategories = [];
    }
    testPaymentOverride.value = false;
  } catch (e) {
    isError.value = true;
    message.value = t('submission.form.error');
    console.error(e);
    if (hadPaymentProof) {
      formData.value.webpayToken = '';
    }
  } finally {
    clearPaymentQueryParams();
    loading.value = false;
  }
};

const getQueryValue = (value: string | null | (string | null)[] | undefined) =>
  Array.isArray(value) ? (value[0] || '') : (value || '');

const attemptFinalizeAfterPayment = async () => {
  if (!isClient || finalizingPayment.value || !session.value.data) return;

  const webpayToken = getQueryValue(route.query.token_ws);
  if (!webpayToken) return;

  finalizingPayment.value = true;
  try {
    formData.value.webpayToken = webpayToken;
    await submitForm({ skipPayment: true });
  } finally {
    finalizingPayment.value = false;
  }
};

onMounted(async () => {
  loadDraft();
  await initData();
  await attemptFinalizeAfterPayment();
});

watch(session, async (newVal) => {
  if (newVal?.data) {
    await initData();
  }
});

watch(
  () => [route.query.token_ws, session.value.data],
  () => {
    attemptFinalizeAfterPayment();
  }
);

watch(
  () => [...formData.value.prizeCategories],
  (newValue, oldValue) => {
    const sortedNew = sortPrizeSelection(newValue);
    const enforced = sortPrizeSelection([...sortedNew, ...lockedPrizeKeys.value]);

    if (!selectionsEqual(sortedNew, enforced)) {
      formData.value.prizeCategories = enforced;
      return;
    }

    const sortedOld = sortPrizeSelection(oldValue || []);
    if (!selectionsEqual(sortedNew, sortedOld)) {
      formData.value.webpayToken = '';
    }
  },
  { deep: true }
);

watch(
  () => [enablePaymentTestMode.value, hasLockedAwards.value, paymentAmount.value],
  ([enabled, _locked, amount]) => {
    if (!enabled || amount <= 0) {
      testPaymentOverride.value = false;
    }
  }
);

watch(
  formData,
  () => {
    saveDraft();
  },
  { deep: true }
);
</script>
