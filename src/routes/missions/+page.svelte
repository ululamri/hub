<script lang="ts">
  import { hubMissions } from '$lib/data/hub-content';
</script>

<svelte:head>
  <title>Ikuti Misi — Karyra Hub</title>
</svelte:head>

<section class="panel">
  <span class="eyebrow">Misi Hub</span>
  <h1>Misi kecil untuk aktivasi nyata.</h1>
  <p>
    Misi Hub dirancang agar pengguna tidak berhenti sebagai pembaca. Mereka diarahkan menjadi peserta workshop,
    pemetaan use case lokal, atau builder later saat sudah siap.
  </p>
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
