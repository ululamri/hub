<script lang="ts">
  import { onMount } from 'svelte';
  import { readStarknetNetworkStatus, type StarknetNetworkSnapshot } from '$lib/starknet/starknet-readiness';

  let snapshot = $state<StarknetNetworkSnapshot>({
    status: 'checking',
    networkName: 'Starknet Sepolia',
    mode: 'Read-only',
    message: 'Mengecek status Starknet tanpa wallet...'
  });

  onMount(() => {
    let active = true;
    void readStarknetNetworkStatus().then((nextSnapshot) => {
      if (active) snapshot = nextSnapshot;
    });

    return () => {
      active = false;
    };
  });
</script>

<article class="card starknet-alpha-card starknet-network-card" aria-live="polite">
  <div class="badge-row">
    <span class="badge tech">Starknet SDK</span>
    <span class="badge safe">Read-only</span>
    <span class={`badge ${snapshot.status === 'online' ? 'safe' : snapshot.status === 'checking' ? 'context' : 'public'}`}>
      {snapshot.status === 'checking' ? 'Mengecek' : snapshot.status === 'online' ? 'Tersambung' : 'Belum tersambung'}
    </span>
  </div>

  <h3>Status jaringan Starknet</h3>
  <p>{snapshot.message}</p>

  <dl class="starknet-facts">
    <div>
      <dt>Jaringan</dt>
      <dd>{snapshot.networkName}</dd>
    </div>
    <div>
      <dt>Mode</dt>
      <dd>{snapshot.mode}</dd>
    </div>
    {#if snapshot.chainId}
      <div>
        <dt>Chain ID</dt>
        <dd>{snapshot.chainId}</dd>
      </div>
    {/if}
    {#if snapshot.latestBlock}
      <div>
        <dt>Block terbaru</dt>
        <dd>{snapshot.latestBlock.toLocaleString('id-ID')}</dd>
      </div>
    {/if}
  </dl>

  <small class="starknet-alpha-note">Tidak ada wallet, private key, atau transaksi yang diminta pada tahap ini.</small>
</article>
