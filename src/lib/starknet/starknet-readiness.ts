import { browser } from '$app/environment';
import { STARKNET_NETWORK_NAME, STARKNET_RPC_URL } from '$lib/starknet/starknet-rpc-config';

export type StarknetNetworkStatus = 'checking' | 'online' | 'offline' | 'unavailable';

export type StarknetNetworkSnapshot = {
  status: StarknetNetworkStatus;
  networkName: string;
  mode: 'Read-only';
  chainId?: string;
  latestBlock?: number;
  message: string;
  checkedAt?: string;
};

function normalizeBlockNumber(block: unknown): number | undefined {
  if (!block || typeof block !== 'object') return undefined;
  const maybe = block as Record<string, unknown>;
  const value = maybe.block_number ?? maybe.blockNumber ?? maybe.block;
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && /^\d+$/.test(value)) return Number(value);
  return undefined;
}

function asMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return 'Belum bisa membaca status jaringan saat ini.';
}

export async function readStarknetNetworkStatus(): Promise<StarknetNetworkSnapshot> {
  if (!browser) {
    return {
      status: 'unavailable',
      networkName: STARKNET_NETWORK_NAME,
      mode: 'Read-only',
      message: 'Status jaringan hanya dicek di browser.'
    };
  }

  const nodeUrl = STARKNET_RPC_URL;

  try {
    const starknet = await import('starknet');
    const RpcProvider = (starknet as unknown as { RpcProvider?: new (config: { nodeUrl: string }) => unknown }).RpcProvider;

    if (!RpcProvider) {
      return {
        status: 'unavailable',
        networkName: STARKNET_NETWORK_NAME,
        mode: 'Read-only',
        message: 'SDK Starknet belum siap dibaca di browser ini.'
      };
    }

    const provider = new RpcProvider({ nodeUrl }) as {
      getChainId?: () => Promise<unknown>;
      getBlock?: (blockIdentifier: string) => Promise<unknown>;
    };

    const [chainResult, blockResult] = await Promise.allSettled([
      provider.getChainId?.() ?? Promise.resolve(undefined),
      provider.getBlock?.('latest') ?? Promise.resolve(undefined)
    ]);

    const chainId = chainResult.status === 'fulfilled' && chainResult.value ? String(chainResult.value) : undefined;
    const latestBlock = blockResult.status === 'fulfilled' ? normalizeBlockNumber(blockResult.value) : undefined;

    return {
      status: 'online',
      networkName: STARKNET_NETWORK_NAME,
      mode: 'Read-only',
      chainId,
      latestBlock,
      checkedAt: new Date().toISOString(),
      message: 'Hub berhasil membaca status Starknet tanpa meminta wallet atau transaksi.'
    };
  } catch (error) {
    return {
      status: 'offline',
      networkName: STARKNET_NETWORK_NAME,
      mode: 'Read-only',
      message: asMessage(error),
      checkedAt: new Date().toISOString()
    };
  }
}
