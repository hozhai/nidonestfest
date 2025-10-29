<script>
  import { t } from '$lib/i18n/i18n.js';
</script>

<section class="judges">
  <div class="container">
    <h2>{$t('judges.title')}</h2>
    <div class="judges-grid">
      <div class="judge-card">
        <div class="judge-image">
          <i class="fas fa-user"></i>
        </div>
        <h3>David Gran</h3>
        <div class="pending-box">
          <p>{$t('judges.pending')}</p>
        </div>
      </div>
      <div class="judge-card">
        <div class="judge-image">
          <i class="fas fa-user"></i>
        </div>
        <h3>Jonas Hekel</h3>
        <div class="pending-box">
          <p>{$t('judges.pending')}</p>
        </div>
      </div>
      <div class="judge-card">
        <div class="judge-image">
          <i class="fas fa-user"></i>
        </div>
        <h3>Pedro Pascal</h3>
        <div class="pending-box">
          <p>{$t('judges.pending')}</p>
        </div>
      </div>
    </div>
  </div>
</section>
