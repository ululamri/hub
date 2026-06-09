import { browser } from '$app/environment';
import { env as publicEnv } from '$env/dynamic/public';

export type StarknetRpcStatus = 'checking' | 'online' | 'offline' | 'unavailable';

export type StarknetRpcSnapshot = {
  status: StarknetRpcStatus;
  networkName: string;
  mode: 'Read-only RPC';
  endpointLabel: string;
  chainId?: string;
  chainIdLabel?: string;
  latestBlock?: number;
  syncing?: boolean;
  latencyMs?: number;
  checkedAt?: string;
  message: string;
};

const DEFAULT_NETWORK = publicEnv.PUBLIC_STARKNET_NETWORK || 'Starknet Sepolia';
const DEFAULT_RPC_URL =
  publicEnv.PUBLIC_STARKNET_RPC_URL || 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7';

type JsonRpcSuccess<T> = {
  jsonrpc: '2.0';
  id: string;
  result: T;
};

type JsonRpcFailure = {
  jsonrpc: '2.0';
  id: string;
  error: {
    code: number;
    message: string;
  };
};

function endpointLabel(nodeUrl: string) {
  try {
    const url = new URL(nodeUrl);
    const version = url.pathname.match(/\/rpc\/(v\d+_\d+)/)?.[1];
    return version ? `${url.hostname} · ${version}` : url.hostname;
  } catch {
    return 'Configured RPC endpoint';
  }
}

function decodeChainId(value: string) {
  if (!value.startsWith('0x')) return undefined;

  try {
    const hex = value.slice(2);
    const padded = hex.length % 2 === 0 ? hex : `0${hex}`;
    const chars = padded
      .match(/.{1,2}/g)
      ?.map((pair) => String.fromCharCode(Number.parseInt(pair, 16)))
      .join('')
      .replace(/\u0000/g, '')
      .trim();

    if (!chars) return undefined;
    if (/^[\x20-\x7E]+$/.test(chars)) return chars;
  } catch {
    return undefined;
  }

  return undefined;
}

function normalizeBlockNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && /^\d+$/.test(value)) return Number(value);
  if (typeof value === 'string' && /^0x[0-9a-f]+$/i.test(value)) return Number.parseInt(value, 16);
  return undefined;
}

function normalizeSyncing(value: unknown): boolean | undefined {
  if (typeof value === 'boolean') return value;
  if (value && typeof value === 'object') return true;
  return undefined;
}

function asMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return 'Belum bisa membaca data RPC Starknet saat ini.';
}

async function rpcCall<T>(nodeUrl: string, method: string): Promise<T> {
  const response = await fetch(nodeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: method,
      method,
      params: []
    })
  });

  if (!response.ok) {
    throw new Error(`RPC ${method} gagal dengan status ${response.status}.`);
  }

  const payload = (await response.json()) as JsonRpcSuccess<T> | JsonRpcFailure;
  if ('error' in payload) {
    throw new Error(payload.error.message || `RPC ${method} mengembalikan error.`);
  }

  return payload.result;
}

export async function readStarknetRpcStatus(): Promise<StarknetRpcSnapshot> {
  const nodeUrl = DEFAULT_RPC_URL;
  const startedAt = typeof performance !== 'undefined' ? performance.now() : Date.now();

  if (!browser) {
    return {
      status: 'unavailable',
      networkName: DEFAULT_NETWORK,
      mode: 'Read-only RPC',
      endpointLabel: endpointLabel(nodeUrl),
      message: 'Data RPC hanya dicek di browser agar build statis tetap aman.'
    };
  }

  try {
    const [chainResult, blockResult, syncingResult] = await Promise.allSettled([
      rpcCall<string>(nodeUrl, 'starknet_chainId'),
      rpcCall<number | string>(nodeUrl, 'starknet_blockNumber'),
      rpcCall<boolean | object>(nodeUrl, 'starknet_syncing')
    ]);

    const chainId = chainResult.status === 'fulfilled' ? String(chainResult.value) : undefined;
    const latestBlock =
      blockResult.status === 'fulfilled' ? normalizeBlockNumber(blockResult.value) : undefined;
    const syncing = syncingResult.status === 'fulfilled' ? normalizeSyncing(syncingResult.value) : undefined;

    if (!chainId && latestBlock === undefined) {
      const reason =
        chainResult.status === 'rejected'
          ? chainResult.reason
          : blockResult.status === 'rejected'
            ? blockResult.reason
            : undefined;
      throw new Error(asMessage(reason));
    }

    const finishedAt = typeof performance !== 'undefined' ? performance.now() : Date.now();

    return {
      status: 'online',
      networkName: DEFAULT_NETWORK,
      mode: 'Read-only RPC',
      endpointLabel: endpointLabel(nodeUrl),
      chainId,
      chainIdLabel: chainId ? decodeChainId(chainId) : undefined,
      latestBlock,
      syncing,
      latencyMs: Math.max(0, Math.round(finishedAt - startedAt)),
      checkedAt: new Date().toISOString(),
      message:
        latestBlock !== undefined
          ? 'Hub berhasil membaca data live Starknet lewat RPC publik tanpa wallet, signature, atau transaksi.'
          : 'Hub berhasil membaca chain Starknet lewat RPC publik tanpa wallet, signature, atau transaksi.'
    };
  } catch (error) {
    const finishedAt = typeof performance !== 'undefined' ? performance.now() : Date.now();

    return {
      status: 'offline',
      networkName: DEFAULT_NETWORK,
      mode: 'Read-only RPC',
      endpointLabel: endpointLabel(nodeUrl),
      latencyMs: Math.max(0, Math.round(finishedAt - startedAt)),
      checkedAt: new Date().toISOString(),
      message: asMessage(error)
    };
  }
}
