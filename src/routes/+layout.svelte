<script lang="ts">
  import '../app.css';
  import { hubPath, sparkAppUrl } from '$lib/config/hub-paths';

  let { children } = $props();
</script>

<div class="hub-shell">
  <header class="hub-topbar">
    <a class="hub-brand" href={hubPath('/')} aria-label="Karyra Hub beranda">
      <span class="hub-brand-mark">H</span>
      <span>Karyra Hub</span>
    </a>
    <nav class="hub-nav" aria-label="Navigasi Hub">
      <a href={hubPath('/resources')}>Jelajahi Resource</a>
      <a href={hubPath('/missions')}>Ikuti Misi</a>
      <a class="primary-link" href={sparkAppUrl}>Kembali ke Spark</a>
    </nav>
  </header>

  <main class="hub-main">
    {@render children()}
  </main>

  <footer class="hub-footer">
    <span>Karyra Hub · Starknet readiness gateway</span>
    <span>Ruang kurasi untuk resource, komunitas, misi, dan jalur builder later.</span>
  </footer>
</div>
