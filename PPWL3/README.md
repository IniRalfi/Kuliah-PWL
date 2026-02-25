# ppwl3

# Praktikum 2 - Perbedaan Tailwind CSS v3 dan v4 (Tailwind Play)

## 1. Struktur Konfigurasi dan Jumlah File

### Tailwind CSS v3

Pada Tailwind CSS v3, struktur proyek **masih bergantung pada file konfigurasi terpisah**, yaitu:

- `index.html`
- `style.css`
- `tailwind.config.js`

File `tailwind.config.js` digunakan untuk:

- Mengatur theme (colors, spacing, font, dll)
- Menambahkan plugin
- Mengatur variant dan utility custom

Artinya, konfigurasi Tailwind v3 **tidak sepenuhnya inline** dan masih membutuhkan file tambahan.

### Tailwind CSS v4

Pada Tailwind CSS v4 (di Tailwind Play), konfigurasi bisa dilakukan **langsung di dalam CSS** menggunakan directive baru, sehingga hanya membutuhkan:

- `index.html`
- `style.css`

Tidak ada file `tailwind.config.js` terpisah karena:

- Theme dapat didefinisikan dengan `@theme`
- Utility custom dengan `@utility`
- Variant custom dengan `@variant`

---

## 2. Sistem Konfigurasi Baru Berbasis CSS Directive

Tailwind CSS v4 memperkenalkan pendekatan baru dengan directive modern seperti:

- `@theme`
- `@utility`
- `@variant`

Directive ini terlihat langsung di Tailwind Play v4 dan **tidak tersedia di v3** dengan cara yang sama.

### Dampak Perubahan:

- Konfigurasi lebih dekat dengan styling
- Tidak perlu bolak-balik antara CSS dan file config
- Lebih cocok untuk prototyping dan playground

Sebaliknya, Tailwind v3 masih:

- Bergantung pada JavaScript config
- Kurang fleksibel untuk eksperimen cepat

---

# Praktikum 4 – Box Model dan Background Color

Jika sebuah elemen diberi warna latar belakang menggunakan class Tailwind CSS seperti `bg-blue-600`, maka komponen box model yang terpengaruh adalah:

- **Content**
- **Padding**

Warna latar belakang tidak mempengaruhi **border**, **margin**, maupun **outline**.  
Background hanya mengisi area konten dan padding di dalam elemen.

# Praktikum 7 – Dark Mode Tailwind CSS

Dark mode diaktifkan menggunakan class `dark` pada tag `<html>` serta utility `dark:` dari Tailwind CSS.

Jika class `dark` tidak digunakan, dark mode dapat diuji melalui Chrome DevTools:
DevTools → Rendering → Emulated CSS media → prefers-color-scheme: dark.

Screenshot hasil pengujian dark mode:
https://drive.google.com/file/d/1ccFLwmteU4wJufGXuYz3HVLHTwUeUHju/view?usp=drive_link
