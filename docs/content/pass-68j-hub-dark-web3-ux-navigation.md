# Pass 68J — Hub Dark Web3 UX & Navigation Polish

Pass ini merapikan Karyra Hub sebagai guided Starknet ecosystem gateway yang hidup di bawah satu domain `/hub`.

## Fokus

- Tema default gelap dengan nuansa web3 yang tetap profesional.
- Navigasi jelas untuk Beranda, Resource, Misi, dan kembali ke Spark.
- Mobile bottom navigation agar Hub mudah dipakai dari perangkat kecil.
- CTA dan copy publik natural, action-oriented, dan tidak terasa seperti dashboard developer.
- Cakupan Starknet diperluas lewat produk: wallet safety, Starknet basics, guided ecosystem discovery, community activation, builder later, dan local public goods mapping.
- Strategi grant tetap tidak ditampilkan di UI publik.

## Cek

```bash
cd ~/hub
pnpm run audit:hub-ux
pnpm run audit:hub
pnpm run audit:hub-paths
pnpm run audit:hub-docker
pnpm run check
pnpm run build
PUBLIC_HUB_BASE_PATH=/hub pnpm run build
```
