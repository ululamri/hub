import { browser } from '$app/environment';
import { STARKNET_NETWORK_NAME, STARKNET_RPC_URL } from '$lib/starknet/starknet-rpc-config';

export type StarknetAddressReaderStatus = 'success' | 'invalid' | 'rpc-unavailable' | 'unavailable';
export type StarknetAddressPresence = 'deployed' | 'not-deployed';

export type StarknetAddressSnapshot = {
  status: StarknetAddressReaderStatus;
  networkName: string;
  method: 'starknet_getClassHashAt';
  addressChecked: string;
  normalizedAddress?: string;
  presence?: StarknetAddressPresence;
  classHash?: string;
  checkedAt: string;
  message: string;
};

function errorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return String(error ?? 'Unknown RPC error');
}

function errorCode(error: unknown, depth = 0): number | undefined {
  if (!error || typeof error !== 'object' || depth > 3) return undefined;

  const candidate = error as Record<string, unknown>;
  if (typeof candidate.code === 'number') return candidate.code;
  if (typeof candidate.code === 'string' && /^\d+$/.test(candidate.code)) return Number(candidate.code);

  return (
    errorCode(candidate.error, depth + 1) ??
    errorCode(candidate.baseError, depth + 1) ??
    errorCode(candidate.cause, depth + 1)
  );
}

function isContractNotFound(error: unknown) {
  const message = errorMessage(error).toLowerCase();
  return (
    errorCode(error) === 20 ||
    message.includes('contract not found') ||
    message.includes('contract_not_found') ||
    message.includes('requested contract address')
  );
}

function snapshot(
  status: StarknetAddressReaderStatus,
  addressChecked: string,
  message: string,
  details: Partial<Pick<StarknetAddressSnapshot, 'normalizedAddress' | 'presence' | 'classHash'>> = {}
): StarknetAddressSnapshot {
  return {
    status,
    networkName: STARKNET_NETWORK_NAME,
    method: 'starknet_getClassHashAt',
    addressChecked,
    checkedAt: new Date().toISOString(),
    message,
    ...details
  };
}

export async function readStarknetSepoliaAddress(address: string): Promise<StarknetAddressSnapshot> {
  const addressChecked = address.trim();

  if (!addressChecked) {
    return snapshot('invalid', addressChecked, 'Masukkan alamat Starknet Sepolia terlebih dahulu.');
  }

  if (!browser) {
    return snapshot('unavailable', addressChecked, 'Pemeriksaan alamat hanya tersedia di browser.');
  }

  let starknet: typeof import('starknet');

  try {
    starknet = await import('starknet');
  } catch {
    return snapshot('unavailable', addressChecked, 'SDK Starknet belum siap dibaca di browser ini.');
  }

  let normalizedAddress: string;

  try {
    normalizedAddress = starknet.validateAndParseAddress(addressChecked);
  } catch {
    return snapshot(
      'invalid',
      addressChecked,
      'Alamat tidak valid. Gunakan alamat Starknet heksadesimal yang diawali 0x.'
    );
  }

  try {
    const provider = new starknet.RpcProvider({ nodeUrl: STARKNET_RPC_URL });
    const classHash = await provider.getClassHashAt(normalizedAddress, 'latest');

    return snapshot(
      'success',
      addressChecked,
      'Alamat ini memiliki account atau contract yang sudah terdeploy di Starknet Sepolia.',
      { normalizedAddress, presence: 'deployed', classHash }
    );
  } catch (error) {
    if (isContractNotFound(error)) {
      return snapshot(
        'success',
        addressChecked,
        'Alamat valid, tetapi belum ada account atau contract yang terdeploy pada alamat ini.',
        { normalizedAddress, presence: 'not-deployed' }
      );
    }

    return snapshot(
      'rpc-unavailable',
      addressChecked,
      'RPC Starknet Sepolia belum dapat membaca alamat ini. Coba lagi beberapa saat.',
      { normalizedAddress }
    );
  }
}
