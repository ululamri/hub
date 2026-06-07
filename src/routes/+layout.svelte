<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { hubPath, sparkAppUrl } from '$lib/config/hub-paths';

  let { children } = $props();

  const navigation = [
    { href: '/', label: 'Beranda', short: 'Hub', copy: 'Peta awal' },
    { href: '/resources', label: 'Resource', short: 'Resource', copy: 'Kurasi Starknet' },
    { href: '/missions', label: 'Misi', short: 'Misi', copy: 'Aktivasi lokal' }
  ];

  function isActive(href: string) {
    const target = hubPath(href).replace(/\/$/, '') || '/';
    const current = page.url.pathname.replace(/\/$/, '') || '/';
    if (href === '/') return current === target;
    return current === target || current.startsWith(`${target}/`);
  }
</script>

<svelte:head>
  <meta name="color-scheme" content="dark" />
</svelte:head>

<div class="hub-shell">
  <div class="hub-ambient" aria-hidden="true"></div>

  <header class="hub-topbar">
    <a class="hub-brand" href={hubPath('/')} aria-label="Buka beranda Karyra Hub">
      <span class="hub-brand-mark">K</span>
      <span>
        <strong>Karyra Hub</strong>
        <small>Starknet gateway</small>
      </span>
    </a>

    <nav class="hub-nav" aria-label="Navigasi Hub">
      {#each navigation as item}
        <a class="hub-nav-link" class:active={isActive(item.href)} href={hubPath(item.href)}>
          <span>{item.label}</span>
          <small>{item.copy}</small>
        </a>
      {/each}
    </nav>

    <a class="hub-spark-link" href={sparkAppUrl}>Lanjutkan di Spark</a>
  </header>

  <main class="hub-main">
    {@render children()}
  </main>

  <nav class="hub-mobile-nav" aria-label="Navigasi cepat Hub">
    {#each navigation as item}
      <a class:active={isActive(item.href)} href={hubPath(item.href)}>{item.short}</a>
    {/each}
    <a href={sparkAppUrl}>Spark</a>
  </nav>

  <footer class="hub-footer">
    <div>
      <strong>Karyra Hub</strong>
      <p>Ruang kurasi untuk resource, misi, komunitas, use case lokal, dan jalur builder later di ekosistem Starknet.</p>
    </div>
    <div class="hub-footer-links">
      <a href={hubPath('/resources')}>Jelajahi Resource</a>
      <a href={hubPath('/missions')}>Ikuti Misi</a>
      <a href={sparkAppUrl}>Kembali ke Spark</a>
    </div>
  </footer>
</div>
