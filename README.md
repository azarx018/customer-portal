# WiFiNet — Customer Portal (Phase 1)

Frontend customer portal WiFiNet. SvelteKit + TypeScript + Tailwind CSS.
Tahap ini **frontend-only** — semua data (paket, auth, payment, session) pakai mock service di `src/lib/mock/`, dirancang supaya gampang diganti ke API asli tanpa mengubah komponen/halaman.

## Menjalankan secara lokal

> Catatan: project ini dibuat di lingkungan tanpa akses internet, jadi
> `npm install` belum pernah dijalankan di sini. Jalankan langkah berikut
> di mesin lokal/server kamu yang punya akses ke npm registry.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build untuk produksi

```bash
npm run build
```

Hasil build statis ada di folder `build/` (adapter-static, mode SPA dengan `fallback: index.html`) — tinggal disajikan lewat Caddy/nginx sebagai static file di belakang `voucher.wifinet.com`.

## Struktur

```text
src/
  routes/           login, buy, buy/payment, buy/success, status
  lib/
    components/     UI, auth, packages, payment, session, nav, brand
    services/       titik ganti mock → API asli nanti
    mock/           implementasi mock saat ini
    stores/         auth, selectedPackage, appMode (captive vs application shell)
    types/          tipe data (nanti dipindah ke packages/shared-types di monorepo)
    utils/          format currency & countdown
```

## Mock credentials (development only)

```text
Voucher : ABC123XYZ
Member  : demo / demo123
```

Di halaman `/buy/payment`, order mock otomatis berstatus "paid" ±8 detik setelah dibuat — supaya alur beli → bayar → sukses bisa didemokan tanpa payment gateway asli.

## Yang belum ada di Phase 1 (menyusul di phase berikutnya)

- Koneksi ke backend API asli (`backend-api.wifinet.com`)
- Penangkapan MAC/IP device dari redirect MikroTik
- QRIS asli & webhook payment gateway
- Integrasi RouterOS API

Lihat dokumen rancangan arsitektur untuk detail lengkap tiap phase.
# customer-portal
