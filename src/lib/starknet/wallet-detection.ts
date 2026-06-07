export type StarknetWalletCandidate = {
  key: string;
  name: string;
  detected: boolean;
  note: string;
};

const candidates = [
  { key: 'starknet_argentX', name: 'Argent X', note: 'Wallet populer untuk Starknet.' },
  { key: 'starknet_braavos', name: 'Braavos', note: 'Wallet Starknet dengan mode keamanan bertahap.' },
  { key: 'starknet', name: 'Starknet wallet', note: 'Provider Starknet umum yang tersedia di browser.' }
];

export function detectStarknetWallets(): StarknetWalletCandidate[] {
  if (typeof window === 'undefined') return candidates.map((wallet) => ({ ...wallet, detected: false }));
  const unsafeWindow = window as unknown as Record<string, unknown>;
  return candidates.map((wallet) => ({
    ...wallet,
    detected: Boolean(unsafeWindow[wallet.key])
  }));
}

export function hasDetectedStarknetWallet(wallets: StarknetWalletCandidate[]) {
  return wallets.some((wallet) => wallet.detected);
}
