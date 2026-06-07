<script lang="ts">
  import { hubCollections, hubResources, readinessLabels } from '$lib/data/hub-content';
  import { hubHref } from '$lib/config/hub-paths';

  function riskClass(risk: string) {
    if (risk === 'Ramah pemula') return 'safe';
    if (risk === 'Teknis') return 'tech';
    return 'context';
  }
</script>

<svelte:head>
  <title>Jelajahi Resource — Karyra Hub</title>
</svelte:head>

<section class="panel">
  <span class="eyebrow">Resource Library</span>
  <h1>Resource Starknet dengan konteks kesiapan.</h1>
  <p>
    Setiap rujukan di Hub diberi label agar pengguna tahu mana yang ramah pemula, mana yang perlu konteks,
    dan mana yang sebaiknya dibuka setelah siap masuk jalur teknis.
  </p>
</section>

<section class="section">
  <div class="section-head">
    <div>
      <span class="eyebrow">Semua resource</span>
      <h2>Jelajahi dengan arah.</h2>
    </div>
  </div>

  <div class="grid">
    {#each hubResources as resource}
      <article class="card resource-card" id={resource.category.toLowerCase().replaceAll(' ', '-')}>
        <div class="badge-row">
          <span class="badge">{resource.category}</span>
          <span class="badge">{readinessLabels[resource.stage]}</span>
          <span class={`badge ${riskClass(resource.risk)}`}>{resource.risk}</span>
        </div>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <a class="btn" href={hubHref(resource.href)}>{resource.action}</a>
      </article>
    {/each}
  </div>
</section>

<section class="section">
  <div class="section-head">
    <div>
      <span class="eyebrow">Koleksi</span>
      <h2>Paket belajar, bukan daftar acak.</h2>
      <p>Koleksi ini menjadi jalur awal untuk rekomendasi resource yang kelak bisa dipersonalisasi dari Passport.</p>
    </div>
  </div>

  <div class="grid two">
    {#each hubCollections as collection}
      <article class="card">
        <span class="badge">{readinessLabels[collection.stage]}</span>
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
        <div class="scope-list">
          {#each collection.items as item}
            <span>{item}</span>
          {/each}
        </div>
      </article>
    {/each}
  </div>
</section>
