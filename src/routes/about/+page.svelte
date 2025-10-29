<script>
  import { t } from '$lib/i18n/i18n.js';
</script>

<section class="about">
  <div class="container">
    <h2>{$t('about.title')}</h2>
    <div class="about-content">
      <div class="mission-statement">
        <h3>{$t('about.mission_title')}</h3>
        <p>{$t('about.mission_text')}</p>
      </div>

      <div class="festival-info">
        <h3>{$t('about.info_title')}</h3>
        <div class="info-grid">
          <div class="info-item">
            <h4>{$t('about.info.duration_title')}</h4>
            <p>{$t('about.info.duration_value')}</p>
          </div>
          <div class="info-item">
            <h4>{$t('about.info.location_title')}</h4>
            <p>{$t('about.info.location_value')}</p>
          </div>
          <div class="info-item">
            <h4>{$t('about.info.features_title')}</h4>
            <p>{$t('about.info.features_value')}</p>
          </div>
          <div class="info-item">
            <h4>{$t('about.info.year_title')}</h4>
            <p>{$t('about.info.year_value')}</p>
          </div>
        </div>
      </div>

      <div class="about-nido">
        <h3>{$t('about.about_nido_title')}</h3>
        <div class="pending-box">
          <p>{$t('about.about_nido_pending')}</p>
        </div>
      </div>
    </div>
  </div>
</section>
