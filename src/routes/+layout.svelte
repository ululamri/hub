<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="hub-shell">
  <header class="hub-topbar">
    <a class="hub-brand" href="/" aria-label="Karyra Hub beranda">
      <span class="hub-brand-mark">H</span>
      <span>Karyra Hub</span>
    </a>
    <nav class="hub-nav" aria-label="Navigasi Hub">
      <a href="/resources">Jelajahi Resource</a>
      <a href="/missions">Ikuti Misi</a>
      <a class="primary-link" href="https://spark.user.cloudjkt01.com">Kembali ke Spark</a>
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
