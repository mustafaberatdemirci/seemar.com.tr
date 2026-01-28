<div align="center">

# SEEMAR | Natural Stone & Marble Codebase

![Status](https://img.shields.io/badge/Status-Active-success)
![Stack](https://img.shields.io/badge/Stack-React_|_Vite_|_Tailwind-blue)
![License](https://img.shields.io/badge/License-Private-grey)

**[English](#english) | [Türkçe](#türkçe)**

</div>

---

<a name="english"></a>
## 🇬🇧 English Documentation

A premium, avant-garde web application designed for **Seemar**, a leading natural stone and marble supplier. This project utilizes modern web technologies to deliver a cinematic, high-performance user experience with full bilingual support.

### 🎨 Design Philosophy: "Intentional Minimalism"
This project rejects standard "bootstrapped" layouts in favor of:
- **Cinematic Visuals:** Full-screen imagery and immersive transitions.
- **Asymmetry & Whitespace:** Editorial-style layouts that prioritize content breathing room.
- **Micro-Interactions:** Subtle animations for a premium feel.
- **Typography:** Carefully curated font pairings (Serif display + Sans support) for luxury appeal.

### 🚀 Key Features
- **Bilingual Architecture:** Seamless TR/EN support with URL synchronization (e.g., `/tr/urunler` ↔ `/en/products`).
- **Dynamic Routing:** Centralized `routes.ts` module preventing circular dependencies and ensuring type-safe navigation.
- **Product Catalog:** Robust filtering and categorization system for Marbles, Travertines, Onyx, and more.
- **Performance:** Route-level code splitting (Lazy Loading) for optimal load times.
- **SEO Optimized:** Dynamic metadata, semantic HTML5, and structured data (JSON-LD).
- **Direct Interaction:** WhatsApp integration and detailed Quote Request forms.
- **Developer Tools:** Custom Node.js scripts for AI image generation (Google Imagen) and data verification.

### 🛠️ Technology Stack
- **Core:** React 18, TypeScript
- **Build Tool:** Vite (Super-fast HMR)
- **Styling:** Tailwind CSS (v4) with Custom Config
- **Routing:** React Router DOM (v6+)
- **State/Logic:** Context API (Language), React Hooks

### 💻 Getting Started
**Prerequisites:** Node.js (v18+)

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Setup (Optional):**
    If you plan to use the AI image generation scripts, create a `.env.local` file:
    ```env
    GEMINI_API_KEY=your_key_here
    ```
3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

### 📂 Project Structure
```
seemar/
├── components/          # React UI Components
│   └── ProductDetail.tsx
├── scripts/             # Developer Utilities
│   ├── generate_images.js  # AI Image Generator
│   └── verify_slugs.cjs    # Data Integriy Checker
├── public/              # Static Assets
├── constants.ts         # Data Source (Products, Projects)
├── routes.ts            # Routing Config
└── vite.config.ts       # Vite Config
```

### ⚠️ Important Notes
*   **API Security:** The `GEMINI_API_KEY` is completely removed from the frontend bundle (`vite.config.ts`) for security. It is only used server-side in the `scripts/` folder.
*   **Routing:** Always import `getPath` from `../routes` to avoid circular dependencies.

---

<br>

---

<a name="türkçe"></a>
## 🇹🇷 Türkçe Dokümantasyon

**Seemar** için tasarlanmış, önde gelen doğal taş ve mermer tedarikçisi, premium ve avangart bir web uygulaması. Bu proje, sinematik ve yüksek performanslı bir kullanıcı deneyimi sunmak için modern web teknolojilerini kullanır ve tam çift dil desteği sağlar.

### 🎨 Tasarım Felsefesi: "Bilinçli Minimalizm"
Standart "hazır kalıp" düzenleri reddediyoruz:
- **Sinematik Görseller:** Tam ekran görseller ve etkileyici geçişler.
- **Asimetri & Boşluk:** İçeriğin nefes almasını sağlayan editoryal tarzda düzenler.
- **Mikro-Etkileşimler:** Premium his için ince animasyonlar.
- **Tipografi:** Lüks algısı için özenle seçilmiş yazı tipi eşleştirmeleri.

### 🚀 Temel Özellikler
- **Çift Dil Mimarisi:** URL senkronizasyonu ile sorunsuz TR/EN desteği (örn: `/tr/urunler` ↔ `/en/products`).
- **Dinamik Yönlendirme:** Döngüsel bağımlılıkları önleyen ve tip güvenliği sağlayan merkezi `routes.ts` modülü.
- **Ürün Kataloğu:** Mermer, Traverten, Oniks vb. için güçlü filtreleme sistemi.
- **Performans:** Optimum yükleme süreleri için sayfa bazlı kod bölme (Lazy Loading).
- **SEO Uyumlu:** Dinamik meta veriler, semantik HTML5 ve yapılandırılmış veri (JSON-LD).
- **Doğrudan Etkileşim:** WhatsApp entegrasyonu ve detaylı Teklif İsteme formları.
- **Geliştirici Araçları:** AI görsel üretimi (Google Imagen) ve veri doğrulama için özel Node.js scriptleri.

### 🛠️ Teknoloji Yığını
- **Çekirdek:** React 18, TypeScript
- **Derleme:** Vite (Süper hızlı HMR)
- **Stil:** Tailwind CSS (v4) ve Özel Konfigürasyon
- **Yönlendirme:** React Router DOM (v6+)
- **Durum Yönetimi:** Context API (Dil), React Hooks

### 💻 Başlangıç
**Gereksinimler:** Node.js (v18+)

1.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```
2.  **Ortam Kurulumu (İsteğe Bağlı):**
    Eğer AI görsel üretim scriptlerini kullanacaksanız, `.env.local` dosyası oluşturun:
    ```env
    GEMINI_API_KEY=buraya_anahtarinizi_yazin
    ```
    *Not: Web sitesi bu anahtar olmadan da sorunsuz çalışır. Sadece geliştirici scriptleri için gereklidir.*
3.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```

### 📂 Proje Yapısı
```
seemar/
├── components/          # React Arayüz Bileşenleri
│   └── ProductDetail.tsx
├── scripts/             # Geliştirici Araçları
│   ├── generate_images.js  # Yapay Zeka Görsel Üreteci
│   └── verify_slugs.cjs    # Veri Tutarlılık Kontrolcüsü
├── public/              # Statik Dosyalar
├── constants.ts         # Veri Kaynağı (Ürünler, Projeler)
├── routes.ts            # Yönlendirme Ayarları
└── vite.config.ts       # Vite Konfigürasyonu
```

### ⚠️ Önemli Notlar
*   **API Güvenliği:** `GEMINI_API_KEY`, güvenlik nedeniyle frontend paketinden (`vite.config.ts`) tamamen kaldırılmıştır. Sadece `scripts/` klasöründeki sunucu tarafı işlemlerinde kullanılır.
*   **Yönlendirme:** Döngüsel bağımlılıkları önlemek için `getPath` fonksiyonunu her zaman `App.tsx` yerine `../routes` dosyasından içe aktarın.

---

**Seemar Natural Stone için geliştirilmiştir.**
*Telif Hakkı 2026. Tüm Hakları Saklıdır.*
