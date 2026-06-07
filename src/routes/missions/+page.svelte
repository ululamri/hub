<script lang="ts">
  import { hubMissions } from '$lib/data/hub-content';
  import { hubPath } from '$lib/config/hub-paths';
</script>

<svelte:head>
  <title>Ikuti Misi — Karyra Hub</title>
  <meta name="description" content="Misi Hub membantu pengguna bergerak dari membaca resource menuju workshop, use case lokal, dan builder later." />
</svelte:head>

<section class="panel route-hero">
  <div class="page-intro">
    <span class="eyebrow">Misi Hub</span>
    <h1>Misi kecil untuk aktivasi nyata.</h1>
    <p>
      Misi Hub dirancang agar pengguna tidak berhenti sebagai pembaca. Mereka diarahkan menjadi peserta workshop,
      pemetaan use case lokal, atau builder later saat sudah siap.
    </p>
  </div>
  <div class="quick-actions">
    <a class="btn primary" href="#baca-3-resource-ramah-pemula">Mulai Misi Pertama</a>
    <a class="btn" href={hubPath('/resources')}>Buka Resource</a>
  </div>
</section>

<section class="page-kicker-grid" aria-label="Jalur misi">
  <div class="kicker-card"><strong>Baca</strong><small>Mulai dari resource ramah pemula.</small></div>
  <div class="kicker-card"><strong>Bertemu</strong><small>Bawa topik ke workshop atau cohort.</small></div>
  <div class="kicker-card"><strong>Berkontribusi</strong><small>Petakan use case dan jalur builder later.</small></div>
</section>

<section class="section">
  <div class="grid two">
    {#each hubMissions as mission}
      <article class="card mission-card" id={mission.title.toLowerCase().replaceAll(' ', '-')}>
        <span class="eyebrow">Misi</span>
        <h3>{mission.title}</h3>
        <p>{mission.description}</p>
        <ol>
          {#each mission.steps as step}
            <li>{step}</li>
          {/each}
        </ol>
        <div class="callout" style="margin-top: 14px;">
          <strong>Hasil yang diharapkan</strong>
          <p>{mission.outcome}</p>
        </div>
      </article>
    {/each}
  </div>
</section>
