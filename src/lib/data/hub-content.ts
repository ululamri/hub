export type ReadinessStage = 'baru-mulai' | 'setelah-core' | 'siap-praktik' | 'komunitas' | 'builder';
export type RiskLevel = 'Ramah pemula' | 'Perlu konteks' | 'Teknis';

export type HubResource = {
  title: string;
  description: string;
  category: string;
  risk: RiskLevel;
  stage: ReadinessStage;
  action: string;
  href: string;
};

export type HubCollection = {
  title: string;
  description: string;
  stage: ReadinessStage;
  items: string[];
};

export type HubMission = {
  title: string;
  description: string;
  steps: string[];
  outcome: string;
};

export type EcosystemArea = {
  title: string;
  description: string;
  focus: string;
};

export const readinessLabels: Record<ReadinessStage, string> = {
  'baru-mulai': 'Baru mulai',
  'setelah-core': 'Setelah Core Beginner',
  'siap-praktik': 'Siap praktik aman',
  komunitas: 'Siap belajar bersama',
  builder: 'Builder later'
};

export const hubResources: HubResource[] = [
  {
    title: 'Peta aman sebelum menyentuh wallet',
    description: 'Ringkasan praktis untuk memahami risiko wallet, seed phrase, dan tanda bahaya sebelum membuka aplikasi apa pun.',
    category: 'Wallet Safety',
    risk: 'Ramah pemula',
    stage: 'baru-mulai',
    action: 'Mulai dari peta aman',
    href: '/resources#wallet-safety'
  },
  {
    title: 'Starknet dalam bahasa sederhana',
    description: 'Penjelasan singkat tentang mengapa Starknet penting, apa yang berbeda, dan kapan pemula perlu memahaminya.',
    category: 'Starknet Basics',
    risk: 'Ramah pemula',
    stage: 'setelah-core',
    action: 'Pahami dasar Starknet',
    href: '/resources#starknet-basics'
  },
  {
    title: 'Resource explorer yang dipandu',
    description: 'Daftar rujukan awal yang tidak langsung mendorong transaksi, dengan label risiko dan konteks kesiapan.',
    category: 'Guided Resources',
    risk: 'Perlu konteks',
    stage: 'siap-praktik',
    action: 'Jelajahi resource',
    href: '/resources#guided-resources'
  },
  {
    title: 'Workshop lokal dan cohort',
    description: 'Ruang untuk menghubungkan pembelajar lokal, fasilitator, dan agenda belajar bertahap dari komunitas.',
    category: 'Community',
    risk: 'Ramah pemula',
    stage: 'komunitas',
    action: 'Lihat jalur komunitas',
    href: '/missions#belajar-bersama-komunitas'
  },
  {
    title: 'Builder later: Cairo, Scarb, dan Dojo',
    description: 'Gerbang lanjutan untuk peserta yang sudah siap masuk teknis setelah menyelesaikan fondasi pengguna.',
    category: 'Developer Later',
    risk: 'Teknis',
    stage: 'builder',
    action: 'Lihat jalur builder',
    href: '/resources#developer-later'
  },
  {
    title: 'Peta use case lokal',
    description: 'Ruang eksplorasi untuk menghubungkan masalah lokal, komunitas, dan peluang kontribusi public goods di ekosistem Starknet.',
    category: 'Local Use Cases',
    risk: 'Perlu konteks',
    stage: 'komunitas',
    action: 'Petakan use case',
    href: '/missions#petakan-use-case-lokal'
  }
];

export const hubCollections: HubCollection[] = [
  {
    title: 'Baru selesai Core Beginner',
    description: 'Tiga resource ringan untuk mengubah pemahaman dasar menjadi langkah eksplorasi yang aman.',
    stage: 'setelah-core',
    items: ['Starknet dalam bahasa sederhana', 'Peta aman sebelum menyentuh wallet', 'Resource explorer yang dipandu']
  },
  {
    title: 'Siap coba tanpa aset nyata',
    description: 'Kumpulan latihan dan rujukan yang tetap aman karena tidak menuntut aset, seed phrase, atau transaksi bernilai.',
    stage: 'siap-praktik',
    items: ['Resource explorer yang dipandu', 'Workshop lokal dan cohort', 'Peta aman sebelum menyentuh wallet']
  },
  {
    title: 'Untuk fasilitator lokal',
    description: 'Materi kurasi untuk workshop, cohort, dan sesi pendampingan komunitas agar tidak mulai dari jargon teknis.',
    stage: 'komunitas',
    items: ['Workshop lokal dan cohort', 'Peta use case lokal', 'Starknet dalam bahasa sederhana']
  },
  {
    title: 'Builder later track',
    description: 'Jalur lanjutan dari pengguna siap menjadi kontributor teknis: Cairo, Scarb, Starknet Foundry, Dojo, dan app patterns.',
    stage: 'builder',
    items: ['Builder later: Cairo, Scarb, dan Dojo', 'Peta use case lokal', 'Resource explorer yang dipandu']
  }
];

export const hubMissions: HubMission[] = [
  {
    title: 'Baca 3 resource ramah pemula',
    description: 'Misi pembuka untuk membuat Hub terasa dipandu, bukan katalog link mentah.',
    steps: ['Mulai dari peta aman', 'Baca dasar Starknet', 'Simpan satu resource untuk dipelajari lagi'],
    outcome: 'Pengguna tahu resource mana yang aman dibuka lebih dulu.'
  },
  {
    title: 'Belajar bersama komunitas',
    description: 'Misi untuk fasilitator lokal yang ingin membawa Spark ke workshop atau cohort kecil.',
    steps: ['Pilih satu topik dasar', 'Catat pertanyaan umum peserta', 'Arahkan peserta ke Core dan Lab sebelum Hub penuh'],
    outcome: 'Komunitas punya alur aktivasi yang tidak menakutkan untuk pemula.'
  },
  {
    title: 'Petakan use case lokal',
    description: 'Misi untuk mengumpulkan ide lokal yang bisa berkembang menjadi eksperimen Starknet saat komunitas sudah siap.',
    steps: ['Tulis masalah lokal', 'Tentukan siapa yang terbantu', 'Pilih apakah butuh edukasi, komunitas, atau builder support'],
    outcome: 'Spark menjadi jembatan dari edukasi menuju kontribusi public goods.'
  },
  {
    title: 'Builder later readiness',
    description: 'Misi lanjutan untuk peserta yang sudah kuat di sisi pengguna dan ingin masuk jalur teknis.',
    steps: ['Pahami konsep wallet dan transaksi', 'Baca pengantar Cairo', 'Pilih eksperimen testnet tanpa nilai finansial'],
    outcome: 'Peserta teknis masuk Starknet dengan konteks keamanan dan kebutuhan lokal.'
  }
];

export const ecosystemAreas: EcosystemArea[] = [
  {
    title: 'Edukasi pengguna lokal',
    description: 'Menerjemahkan konsep Starknet ke jalur belajar bertahap untuk pemula Indonesia.',
    focus: 'Core, Lab, glossary, dan resource ramah pemula.'
  },
  {
    title: 'Keamanan wallet dan anti-scam',
    description: 'Membantu pengguna mengenali risiko sebelum bersentuhan dengan wallet, signature, atau aplikasi onchain.',
    focus: 'Wallet Safety, simulasi phishing, DM scam, dan approve palsu.'
  },
  {
    title: 'Aktivasi komunitas',
    description: 'Mengubah Spark dari aplikasi belajar menjadi alur workshop, cohort, fasilitator, dan diskusi lokal.',
    focus: 'Workshop kit, cohort flow, dan misi komunitas.'
  },
  {
    title: 'Jalur builder later',
    description: 'Membuka jalan dari pengguna siap menuju kontributor teknis tanpa memaksa pemula langsung masuk kode.',
    focus: 'Cairo, Scarb, Starknet Foundry, Dojo, dan eksperimen testnet.'
  },
  {
    title: 'Use case dan public goods lokal',
    description: 'Memetakan masalah nyata di komunitas lokal yang bisa menjadi kontribusi open ecosystem di masa depan.',
    focus: 'Pemetaan masalah, kebutuhan komunitas, dan eksperimen kecil.'
  }
];
