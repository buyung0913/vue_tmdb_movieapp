
# 🎬 TMDB Vue Movie App

Aplikasi frontend berbasis Vue 3 untuk menampilkan daftar film dari The Movie Database (TMDB).  
Mendukung login TMDB, pencarian film, validasi form, dan sistem keamanan berbasis session_id.

![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen)
![Pinia](https://img.shields.io/badge/State-Pinia-yellow)
![Axios](https://img.shields.io/badge/HTTP-Axios-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Fitur Utama

- ✅ Login menggunakan akun TMDB
- ✅ Validasi form menggunakan vee-validate + yup
- ✅ Simpan session ID ke localStorage
- ✅ Logout dan redirect saat session expired
- ✅ Daftar film grid 3 kolom
- ✅ Pencarian film
- ✅ Pagination (1 2 3 4 5 ...)
- ✅ Axios + interceptor (401 handling)
- ✅ Rate limit login: blokir selama 30 detik setelah gagal 3 kali
- ✅ Toggle tampil/sembunyikan password

---

## 🔧 Instalasi & Setup

1. Clone project:

```bash
git clone https://github.com/username/tmdb-vue-app.git
cd tmdb-vue-app
```

2. Install dependencies:

```bash
npm install
```

3. Buat file .env di root:

```env
VUE_APP_API_KEY=your_tmdb_api_key
VUE_APP_BASE_URL=https://api.themoviedb.org/3
```

4. Jalankan server:

```bash
npm run serve
```

Buka di browser: http://localhost:8080

---

## 🛡️ Keamanan

- Session disimpan di localStorage (aman untuk TMDB)
- Axios Interceptor menghapus session dan redirect ke /login jika expired (401/403)
- Validasi email & password sebelum login
- Proteksi login brute-force: gagal 3x → tombol login disable 30 detik

---

## 📦 Struktur Folder

```
src/
├── components/        # Komponen UI (LoginForm, Navbar)
├── views/             # Halaman utama (LoginView, HomeView)
├── viewmodels/        # MVVM logic untuk login & daftar movie
├── services/          # Service TMDB API menggunakan Axios
├── stores/            # Auth store (Pinia)
├── plugins/           # Axios plugin global
├── router/            # Konfigurasi route
└── main.js            # Entry point aplikasi
```

---

## 🧪 Testing Manual

- Login menggunakan akun TMDB (buat akun di https://www.themoviedb.org/)
- Masukkan username + password → sukses → redirect ke halaman film
- Klik Logout → kembali ke login
- Coba salah 3x → tombol login disable 30 detik

---

## 📄 Lisensi

MIT License © 2025 — Dibuat oleh [Indramawan, Buyung]

---

## 📬 Kontak

📧 Email: indramawan.buyung0913@gmail.com