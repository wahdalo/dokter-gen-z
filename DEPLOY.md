# Panduan Deployment ke Vercel

Panduan ini akan membantumu mengupload aplikasi Dokter Z (Frontend + Backend) ke Vercel dalam satu repository.

## 1. Persiapan
Pastikan struktur folder sudah seperti ini (sudah dikerjakan otomatis):
- `api/index.js` (Backend Serverless)
- `frontend/` (React App)
- `vercel.json` (Konfigurasi Routing)
- `package.json` (Script Build)

## 2. Push ke GitHub
1.  Buat repository baru di GitHub.
2.  Push semua kode ke repository tersebut.

## 3. Import ke Vercel
1.  Buka dashboard [Vercel](https://vercel.com).
2.  Klik **"Add New..."** -> **"Project"**.
3.  Pilih repository GitHub kamu.
4.  Pada halaman konfigurasi **"Configure Project"**:

    *   **Framework Preset**: Biarkan *Other* atau *Create React App* (Vercel biasanya auto-detect).
    *   **Root Directory**: Biarkan default (`./`).
    *   **Build Command**: Biarkan default (akan menggunakan script `build` di `package.json`: `cd frontend && npm install && npm run build`).
    *   **Output Directory**: Ubah menjadi `frontend/dist`.
        *   *Penting*: Karena hasil build React ada di folder `frontend/dist`, bukan `dist` di root.
    *   **Environment Variables**: Masukkan API Key kamu.
        *   Nama: `GEMINI_API_KEY`
        *   Value: (Copy dari file `.env` kamu)

5.  Klik **Deploy**.

## 4. Verifikasi
-   Vercel akan membuild frontend dan backend.
-   Jika sukses, buka URL yang diberikan Vercel.
-   Coba fitur chat. Backend akan berjalan via function `/api/chat`.
