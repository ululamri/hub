<script lang="ts">
  import { ecosystemAreas, hubCollections, hubMissions, hubResources, readinessLabels } from '$lib/data/hub-content';
  import { hubHref, hubPath } from '$lib/config/hub-paths';

  const featuredResources = hubResources.slice(0, 3);
  const featuredCollections = hubCollections.slice(0, 3);
  const featuredMissions = hubMissions.slice(0, 2);

  function riskClass(risk: string) {
    if (risk === 'Ramah pemula') return 'safe';
    if (risk === 'Teknis') return 'tech';
    return 'context';
  }
</script>

<svelte:head>
  <title>Karyra Hub — Guided Starknet Gateway</title>
  <meta
    name="description"
    content="Karyra Hub adalah gerbang eksplorasi Starknet yang dipandu: resource, komunitas, misi, dan jalur builder later untuk pengguna lokal."
  />
</svelte:head>

<section class="hero-grid">
  <div class="hero-copy panel">
    <span class="eyebrow">Guided Starknet gateway</span>
    <h1>Jelajahi Starknet saat fondasimu sudah cukup.</h1>
    <p>
      Karyra Hub bukan katalog link mentah. Hub adalah ruang kurasi yang membantu pengguna lokal menemukan resource,
      komunitas, aplikasi, dan jalur builder dengan konteks kesiapan yang jelas.
    </p>
    <div class="hero-actions">
      <a class="btn primary" href={hubPath('/resources')}>Jelajahi Resource</a>
      <a class="btn" href={hubPath('/missions')}>Ikuti Misi Ringan</a>
    </div>
  </div>

  <aside class="hero-panel panel" aria-label="Alur Hub">
    <div class="readiness-card">
      <small>Jalur besar</small>
      <h3>Core → Lab → Passport → Hub</h3>
      <p>Hub menjadi langkah eksplorasi setelah pengguna punya dasar dan tahu cara menjaga diri.</p>
    </div>
    <div class="path-steps">
      <div class="path-step"><span>1</span><div><strong>Belajar dasar</strong><p>Pahami konsep sebelum menyentuh wallet.</p></div></div>
      <div class="path-step"><span>2</span><div><strong>Praktik aman</strong><p>Coba simulasi tanpa aset nyata.</p></div></div>
      <div class="path-step"><span>3</span><div><strong>Lihat kesiapan</strong><p>Passport membaca bukti belajar dan langkah berikutnya.</p></div></div>
      <div class="path-step"><span>4</span><div><strong>Jelajahi Hub</strong><p>Resource Starknet dipandu dengan label risiko dan koleksi tematik.</p></div></div>
    </div>
  </aside>
</section>

<section class="section">
  <div class="section-head">
    <div>
      <span class="eyebrow">Resource awal</span>
      <h2>Mulai dari yang aman dulu.</h2>
      <p>Setiap resource diberi konteks kesiapan agar pemula tidak langsung terseret ke transaksi, wallet, atau jargon teknis.</p>
    </div>
    <a class="btn" href={hubPath('/resources')}>Lihat semua</a>
  </div>

  <div class="grid">
    {#each featuredResources as resource}
      <article class="card resource-card">
        <div class="badge-row">
          <span class="badge">{resource.category}</span>
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
      <span class="eyebrow">Koleksi tematik</span>
      <h2>Hub mengarahkan, bukan membanjiri.</h2>
      <p>Koleksi dibuat mengikuti readiness: dari pemula, komunitas, sampai builder later untuk memperluas jalan masuk ke Starknet.</p>
    </div>
  </div>

  <div class="grid">
    {#each featuredCollections as collection}
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

<section class="section">
  <div class="section-head">
    <div>
      <span class="eyebrow">Misi ringan</span>
      <h2>Dari membaca menuju kontribusi.</h2>
      <p>Misi Hub membantu Spark tumbuh dari edukasi menjadi aktivasi lokal dan jalur public goods.</p>
    </div>
    <a class="btn" href={hubPath('/missions')}>Ikuti misi</a>
  </div>

  <div class="grid two">
    {#each featuredMissions as mission}
      <article class="card mission-card">
        <h3>{mission.title}</h3>
        <p>{mission.description}</p>
        <ol>
          {#each mission.steps as step}
            <li>{step}</li>
          {/each}
        </ol>
      </article>
    {/each}
  </div>
</section>

<section class="section callout">
  <span class="eyebrow">Cakupan ekosistem</span>
  <h2>Hub dibangun untuk membuka banyak pintu ke Starknet.</h2>
  <p>
    Cakupan Hub diperluas lewat produk: edukasi lokal, keamanan wallet, aktivasi komunitas, jalur builder later,
    dan pemetaan use case lokal.
  </p>
  <div class="grid two compact-grid">
    {#each ecosystemAreas as area}
      <article class="mini-card">
        <strong>{area.title}</strong>
        <p>{area.description}</p>
        <small>{area.focus}</small>
      </article>
    {/each}
  </div>
</section>
