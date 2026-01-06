# Cara Mengganti Screenshot Project

## Langkah-langkah untuk menambahkan screenshot asli:

### 1. Siapkan Gambar Screenshot
- Buat folder `public/screenshots` di root project
- Simpan screenshot dengan nama yang deskriptif, contoh:
  - `ticket-booking-1.png`
  - `ticket-booking-2.png`
  - `ecommerce-mobile-1.png`
  - dll.

### 2. Update Path Screenshot di App.tsx
Ganti URL placeholder dengan path gambar asli di array `projects`:

```javascript
// Contoh untuk Ticket Booking System
screenshots: [
  '/screenshots/ticket-booking-1.png',
  '/screenshots/ticket-booking-2.png',
  '/screenshots/ticket-booking-3.png'
],

// Contoh untuk Mobile E-Commerce
screenshots: [
  '/screenshots/ecommerce-mobile-1.png',
  '/screenshots/ecommerce-mobile-2.png',
  '/screenshots/ecommerce-mobile-3.png'
],
```

### 3. Rekomendasi Ukuran Gambar
- **Desktop Apps**: 1200x800px atau 1920x1080px
- **Mobile Apps**: 400x800px atau 375x812px
- **Web Apps**: 1440x900px atau 1920x1080px

### 4. Format yang Disarankan
- PNG untuk screenshot dengan UI yang tajam
- JPG untuk gambar dengan banyak warna/gradasi
- WebP untuk optimasi ukuran file

### 5. Tips Screenshot yang Profesional
- Gunakan data dummy yang realistis
- Pastikan UI terlihat lengkap dan rapi
- Hindari informasi sensitif atau personal
- Gunakan konsistensi dalam style dan tema
- Ambil screenshot dari fitur-fitur utama aplikasi

### 6. Struktur Folder yang Disarankan
```
public/
├── screenshots/
│   ├── ticket-booking/
│   │   ├── dashboard.png
│   │   ├── booking-form.png
│   │   └── payment.png
│   ├── ecommerce-mobile/
│   │   ├── home-screen.png
│   │   ├── product-detail.png
│   │   └── checkout.png
│   └── ...
```

### 7. Update GitHub dan Live URLs
Jangan lupa untuk mengganti placeholder URLs dengan link asli:
```javascript
githubUrl: 'https://github.com/username/actual-repo',
liveUrl: 'https://your-actual-demo.com'
```