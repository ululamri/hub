import { env as publicEnv } from '$env/dynamic/public';

const FALLBACK_NETWORK = 'Starknet Sepolia';
const FALLBACK_RPC_URL = 'https://starknet-sepolia-rpc.publicnode.com';

export const STARKNET_NETWORK_NAME = publicEnv.PUBLIC_STARKNET_NETWORK || FALLBACK_NETWORK;
export const STARKNET_RPC_URL = publicEnv.PUBLIC_STARKNET_RPC_URL || FALLBACK_RPC_URL;

function isPrivateHostname(hostname: string) {
  return (
    hostname === 'localhost' ||
    hostname === '::1' ||
    hostname.startsWith('127.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)
  );
}

export function starknetRpcEndpointLabel() {
  try {
    const url = new URL(STARKNET_RPC_URL);
    if (isPrivateHostname(url.hostname)) return 'Configured private RPC';

    const version = url.pathname.match(/\/rpc\/(v\d+_\d+)/)?.[1];
    return version ? `${url.hostname} · ${version}` : url.hostname;
  } catch {
    return 'Configured RPC endpoint';
  }
}
