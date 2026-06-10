<script lang="ts">
  import {
    readStarknetSepoliaAddress,
    type StarknetAddressSnapshot
  } from '$lib/starknet/starknet-address-reader';

  let address = $state('');
  let loading = $state(false);
  let result = $state<StarknetAddressSnapshot | null>(null);

  const statusLabel = $derived(
    result === null
      ? 'Ready'
      : result.status === 'success'
        ? 'Success'
        : result.status === 'invalid'
          ? 'Invalid address'
          : 'RPC unavailable'
  );

  const statusTone = $derived(
    result === null ? 'context' : result.status === 'success' ? 'safe' : 'public'
  );

  const checkedLabel = $derived(
    result ? new Date(result.checkedAt).toLocaleString('id-ID') : 'Belum dicek'
  );

  const presenceLabel = $derived(
    result?.presence === 'deployed'
      ? 'Account / contract ditemukan'
      : result?.presence === 'not-deployed'
        ? 'Belum terdeploy'
        : 'Tidak tersedia'
  );

  async function checkAddress(event: SubmitEvent) {
    event.preventDefault();
    if (loading) return;

    loading = true;
    try {
      result = await readStarknetSepoliaAddress(address);
    } finally {
      loading = false;
    }
  }
</script>

<article class="card starknet-alpha-card starknet-address-reader-card">
  <div class="badge-row">
    <span class="badge tech">Starknet Sepolia</span>
    <span class="badge safe">Read-only</span>
    <span class={`badge ${statusTone}`}>{loading ? 'Checking' : statusLabel}</span>
  </div>

  <h3>Starknet Sepolia Address Reader</h3>
  <p>
    Tempel alamat publik Starknet untuk memeriksa apakah account atau contract sudah terdeploy. Pemeriksaan
    ini membaca class hash terbaru lewat RPC publik.
  </p>

  <form class="address-reader-form" onsubmit={checkAddress}>
    <label for="starknet-address">Alamat Starknet Sepolia</label>
    <div class="address-reader-controls">
      <input
        id="starknet-address"
        class="address-reader-input"
        type="text"
        bind:value={address}
        placeholder="0x..."
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        aria-describedby="address-reader-help"
        aria-invalid={result?.status === 'invalid'}
        disabled={loading}
      />
      <button class="btn blue address-reader-button" type="submit" disabled={loading}>
        {loading ? 'Checking...' : 'Check address'}
      </button>
    </div>
    <small id="address-reader-help">Masukkan alamat publik saja. Jangan masukkan credential wallet.</small>
  </form>

  {#if result}
    <section class={`address-reader-result ${result.status}`} aria-live="polite">
      <strong>{statusLabel}</strong>
      <p>{result.message}</p>

      <dl class="starknet-facts address-reader-facts">
        <div class="wide">
          <dt>Address checked</dt>
          <dd>{(result.normalizedAddress ?? result.addressChecked) || 'Tidak ada'}</dd>
        </div>
        <div>
          <dt>Network</dt>
          <dd>{result.networkName}</dd>
        </div>
        <div>
          <dt>Account / contract presence</dt>
          <dd>{presenceLabel}</dd>
        </div>
        <div>
          <dt>RPC method</dt>
          <dd>{result.method}</dd>
        </div>
        <div>
          <dt>Latest checked time</dt>
          <dd>{checkedLabel}</dd>
        </div>
        {#if result.classHash}
          <div class="wide">
            <dt>Class hash</dt>
            <dd>{result.classHash}</dd>
          </div>
        {/if}
      </dl>
    </section>
  {:else}
    <div class="address-reader-empty" aria-live="polite">
      <strong>Ready for a read-only check</strong>
      <span>Hasil alamat akan muncul di sini setelah tombol Check address dipilih.</span>
    </div>
  {/if}

  <ul class="address-reader-safety" aria-label="Read-only safety boundary">
    <li>No wallet connection</li>
    <li>No signature request</li>
    <li>No transaction</li>
    <li>Never enter a private key or seed phrase</li>
  </ul>
</article>
