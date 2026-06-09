<script lang="ts">
  import { onMount } from 'svelte';
  import { readStarknetRpcStatus, type StarknetRpcSnapshot } from '$lib/starknet/starknet-rpc-status';

  let snapshot = $state<StarknetRpcSnapshot>({
    status: 'checking',
    networkName: 'Starknet Sepolia',
    mode: 'Read-only RPC',
    endpointLabel: 'Public Starknet RPC',
    message: 'Mengecek data live Starknet lewat RPC publik...'
  });
  let refreshing = $state(false);

  const statusLabel = $derived(
    snapshot.status === 'checking'
      ? 'Mengecek'
      : snapshot.status === 'online'
        ? 'Live'
        : snapshot.status === 'unavailable'
          ? 'Browser only'
          : 'Belum terbaca'
  );

  const statusTone = $derived(
    snapshot.status === 'online' ? 'safe' : snapshot.status === 'checking' ? 'context' : 'public'
  );

  const blockLabel = $derived(
    snapshot.latestBlock !== undefined ? snapshot.latestBlock.toLocaleString('id-ID') : 'Belum tersedia'
  );

  const syncingLabel = $derived(
    snapshot.syncing === undefined ? 'Belum terbaca' : snapshot.syncing ? 'Sedang sinkron' : 'Tidak syncing'
  );

  const checkedLabel = $derived(
    snapshot.checkedAt ? new Date(snapshot.checkedAt).toLocaleString('id-ID') : 'Belum dicek'
  );

  async function refreshRpc() {
    refreshing = true;
    snapshot = {
      ...snapshot,
      status: 'checking',
      message: 'Mengecek ulang data live Starknet lewat RPC publik...'
    };

    try {
      snapshot = await readStarknetRpcStatus();
    } finally {
      refreshing = false;
    }
  }

  onMount(() => {
    void refreshRpc();
  });
</script>

<article class="card starknet-alpha-card starknet-rpc-live-card" aria-live="polite">
  <div class="badge-row">
    <span class="badge tech">Live RPC</span>
    <span class="badge safe">Read-only</span>
    <span class={`badge ${statusTone}`}>{statusLabel}</span>
  </div>

  <h3>Live Starknet RPC</h3>
  <p>{snapshot.message}</p>

  <dl class="starknet-facts starknet-rpc-facts">
    <div>
      <dt>Network</dt>
      <dd>{snapshot.networkName}</dd>
    </div>
    <div>
      <dt>Endpoint</dt>
      <dd>{snapshot.endpointLabel}</dd>
    </div>
    <div>
      <dt>RPC method</dt>
      <dd>starknet_blockNumber</dd>
    </div>
    <div>
      <dt>Latest block</dt>
      <dd>{blockLabel}</dd>
    </div>
    <div>
      <dt>Chain ID</dt>
      <dd>{snapshot.chainIdLabel ? `${snapshot.chainIdLabel} · ${snapshot.chainId}` : snapshot.chainId ?? 'Belum tersedia'}</dd>
    </div>
    <div>
      <dt>Sync status</dt>
      <dd>{syncingLabel}</dd>
    </div>
    <div>
      <dt>Latency</dt>
      <dd>{snapshot.latencyMs !== undefined ? `${snapshot.latencyMs} ms` : 'Belum tersedia'}</dd>
    </div>
    <div>
      <dt>Checked</dt>
      <dd>{checkedLabel}</dd>
    </div>
  </dl>

  <div class="rpc-card-actions">
    <button class="btn ghost rpc-refresh-button" type="button" onclick={refreshRpc} disabled={refreshing}>
      {refreshing ? 'Mengecek...' : 'Cek ulang RPC'}
    </button>
  </div>

  <small class="starknet-alpha-note">
    Card ini hanya membaca data jaringan. Tidak ada wallet connect, signature, private key, seed phrase, atau transaksi.
  </small>
</article>
