<script lang="ts">
  import { onMount } from 'svelte';
  import { detectStarknetWallets, hasDetectedStarknetWallet, type StarknetWalletCandidate } from '$lib/starknet/wallet-detection';

  let wallets = $state<StarknetWalletCandidate[]>([]);

  onMount(() => {
    wallets = detectStarknetWallets();
  });

  const detected = $derived(hasDetectedStarknetWallet(wallets));
</script>

<article class="card starknet-alpha-card starknet-wallet-card">
  <div class="badge-row">
    <span class="badge context">Wallet safety</span>
    <span class="badge safe">Tanpa connect</span>
  </div>

  <h3>Preview wallet Starknet</h3>
  <p>
    Hub hanya mendeteksi ketersediaan wallet di browser. Pengguna tetap diarahkan menyelesaikan simulasi keamanan sebelum connect.
  </p>

  {#if wallets.length > 0}
    <ul class="wallet-list">
      {#each wallets as wallet}
        <li class:detected={wallet.detected}>
          <span>{wallet.detected ? 'Terdeteksi' : 'Belum ada'}</span>
          <strong>{wallet.name}</strong>
          <small>{wallet.note}</small>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="starknet-alpha-note">Wallet dicek saat halaman dibuka di browser.</p>
  {/if}

  <div class="callout compact-callout">
    <strong>{detected ? 'Wallet terdeteksi, tetap aman dulu.' : 'Tidak perlu memasang wallet untuk mulai.'}</strong>
    <p>{detected ? 'Spark akan tetap mengutamakan latihan dan pemahaman sebelum tindakan wallet.' : 'Pengguna bisa belajar konsep, risiko, dan alur Starknet tanpa extension apa pun.'}</p>
  </div>
</article>
