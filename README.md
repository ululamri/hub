# Karyra Hub

Karyra Hub adalah guided Starknet ecosystem gateway untuk pengguna yang sudah melewati fondasi awal di Karyra Spark.

Hub dibangun sebagai repo terpisah agar pengembangan Spark, Spark API, dan Hub tetap modular:

- `spark` — public learning/readiness app
- `spark-api` — Rust/Axum backend
- `hub` — guided ecosystem gateway

## Prinsip produk

Hub bukan katalog link mentah. Hub harus membantu pengguna memahami kapan sebuah resource aman dibuka, resource mana yang perlu konteks, dan kapan mereka siap masuk jalur builder.

Cakupan produk:

- Wallet Safety
- Starknet Basics
- Guided Resources
- Community activation
- Developer Later: Cairo, Scarb, Starknet Foundry, Dojo
- Local Use Cases dan public goods mapping

## Development

```bash
pnpm install
pnpm run audit:hub
pnpm run check
pnpm run build
pnpm run dev
```

Strategi pendanaan dan dokumen pengajuan tidak ditampilkan di UI publik Hub. Jika nanti diperlukan, progress dan roadmap dapat dipublikasikan setelah ada keputusan resmi.
