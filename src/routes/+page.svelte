<script lang="ts">
  import { ecosystemAreas, hubCollections, hubMissions, hubResources, readinessLabels } from '$lib/data/hub-content';
  import { hubHref, hubPath } from '$lib/config/hub-paths';
  import StarknetReadinessPanel from '$lib/components/StarknetReadinessPanel.svelte';
  import StarknetWalletPreview from '$lib/components/StarknetWalletPreview.svelte';
  import StarknetRpcLiveCard from '$lib/components/StarknetRpcLiveCard.svelte';
  import StarknetAddressReader from '$lib/components/StarknetAddressReader.svelte';

  const featuredResources = hubResources.slice(0, 3);
  const featuredCollections = hubCollections.slice(0, 4);
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
    content="Karyra Hub adalah gerbang eksplorasi Starknet yang dipandu: resource, misi, komunitas, use case lokal, dan jalur builder later."
  />
</svelte:head>

<section class="hero-grid">
  <div class="hero-copy panel">
    <span class="eyebrow">Guided Starknet gateway</span>
    <h1>Jelajahi Starknet tanpa merasa dilempar ke ruang teknis.</h1>
    <p>
      Karyra Hub membantu pengguna lokal menemukan resource, komunitas, misi, dan jalur builder dengan konteks kesiapan.
      Fokusnya sederhana: belajar aman dulu, praktik saat siap, lalu masuk ekosistem dengan arah yang jelas.
    </p>
    <div class="hero-actions">
      <a class="btn primary" href={hubPath('/resources')}>Jelajahi Resource Starknet</a>
      <a class="btn ghost" href={hubPath('/missions')}>Ikuti Misi Belajar</a>
    </div>
  </div>

  <aside class="hero-panel panel" aria-label="Alur Hub">
    <div class="readiness-card">
      <small>Alur utama</small>
      <h3>Core → Lab → Passport → Hub</h3>
      <p>Hub memperluas Spark dari readiness gateway menjadi pintu masuk ekosistem Starknet yang ramah pemula.</p>
    </div>
    <div class="path-steps">
      <div class="path-step"><span>1</span><div><strong>Bangun fondasi</strong><p>Pahami konsep dasar dan risiko sebelum membuka wallet.</p></div></div>
      <div class="path-step"><span>2</span><div><strong>Praktik aman</strong><p>Coba simulasi tanpa aset nyata dan tanpa tekanan transaksi.</p></div></div>
      <div class="path-step"><span>3</span><div><strong>Lihat kesiapan</strong><p>Passport membantu membaca bukti belajar dan langkah berikutnya.</p></div></div>
      <div class="path-step"><span>4</span><div><strong>Jelajahi ekosistem</strong><p>Resource, misi, komunitas, dan builder later dibuka dengan label kesiapan.</p></div></div>
    </div>
  </aside>

</section>

<section class="section starknet-alpha-section" aria-labelledby="starknet-alpha-heading">
  <div class="section-head">
    <div>
      <span class="eyebrow">Starknet alpha proof</span>
      <h2 id="starknet-alpha-heading">Integrasi kecil, arah teknis nyata.</h2>
      <p>
        Hub mulai menyentuh Starknet secara aman: membaca status jaringan, mendeteksi wallet tanpa connect,
        dan menyiapkan contoh Cairo/Scarb untuk jalur builder later.
      </p>
    </div>
  </div>

  <div class="grid three">
    <StarknetReadinessPanel />
    <StarknetRpcLiveCard />
    <StarknetWalletPreview />
    <StarknetAddressReader />
    <article class="card starknet-alpha-card cairo-example-card">
      <div class="badge-row">
        <span class="badge tech">Cairo/Scarb</span>
        <span class="badge context">Builder later</span>
      </div>
      <h3>Contoh kontrak readiness</h3>
      <p>
        Contoh minimal ini tidak dideploy dan tidak menyimpan data pengguna. Ia menunjukkan arah builder path:
        dari pengguna aman menuju tooling Starknet saat sudah siap.
      </p>
      <div class="scope-list">
        <span>Cairo</span>
        <span>Scarb</span>
        <span>Starknet contract</span>
      </div>
      <a class="btn" href="https://github.com/ululamri/hub/tree/master/examples/starknet/hello_readiness" target="_blank" rel="noreferrer">Lihat Contoh Cairo/Scarb</a>
    </article>
  </div>
</section>

<section class="section">
  <div class="section-head">
    <div>
      <span class="eyebrow">Langkah cepat</span>
      <h2>Pilih pintu masuk yang paling aman.</h2>
      <p>Hub dirancang agar pengguna tidak harus menebak halaman mana yang perlu dibuka dulu.</p>
    </div>
  </div>

  <div class="grid three">
    <article class="card">
      <span class="badge safe">Mulai aman</span>
      <h3>Resource dengan label kesiapan</h3>
      <p>Buka rujukan yang sudah diberi konteks: ramah pemula, perlu konteks, atau teknis.</p>
      <a class="btn" href={hubPath('/resources')}>Jelajahi Resource</a>
    </article>
    <article class="card">
      <span class="badge context">Aktivasi lokal</span>
      <h3>Misi kecil yang bisa dilakukan</h3>
      <p>Dari membaca, ikut workshop, memetakan use case, sampai siap masuk builder later.</p>
      <a class="btn" href={hubPath('/missions')}>Ikuti Misi</a>
    </article>
    <article class="card">
      <span class="badge tech">Lanjut bertahap</span>
      <h3>Builder later, bukan dipaksa cepat</h3>
      <p>Jalur teknis dibuka setelah pengguna paham keamanan, konteks, dan kebutuhan lokal.</p>
      <a class="btn" href={hubPath('/resources#developer-later')}>Lihat Jalur Builder</a>
    </article>
  </div>
</section>

<section class="section">
  <div class="section-head">
    <div>
      <span class="eyebrow">Resource awal</span>
      <h2>Mulai dari yang aman dulu.</h2>
      <p>Setiap resource diberi konteks kesiapan agar pemula tidak langsung terseret ke transaksi, wallet, atau jargon teknis.</p>
    </div>
    <a class="btn" href={hubPath('/resources')}>Lihat Semua Resource</a>
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
      <p>Koleksi mengikuti readiness: dari pemula, komunitas, sampai builder later untuk memperluas jalan masuk ke Starknet.</p>
    </div>
  </div>

  <div class="grid two">
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
    <a class="btn" href={hubPath('/missions')}>Ikuti Misi</a>
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
  <h2>Hub memperluas posisi Karyra di Starknet.</h2>
  <p>
    Cakupan diperluas lewat produk, bukan klaim kosong: edukasi lokal, keamanan wallet, aktivasi komunitas,
    jalur builder later, guided ecosystem discovery, dan pemetaan use case public goods.
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
