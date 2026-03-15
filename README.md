# 🦌 DeerFlow — AI Araştırma Asistanı

> Çok ajanlı yapay zeka destekli araştırma ve analiz platformu. Türkçe arayüz ve Türkçe AI yanıtları ile.

---

## 🚀 Özellikler

| Özellik | Açıklama |
|---------|----------|
| 🔍 **Derin Araştırma** | Web'de çok açılı, sistematik araştırma |
| 📊 **Veri Analizi** | Excel/CSV dosyalarından otomatik analiz |
| 🎨 **Görsel Oluşturma** | AI ile görsel üretimi |
| 🎬 **Video Oluşturma** | Metin tabanlı video üretimi |
| 🎙️ **Podcast Üretimi** | İçerikten 2 sunuculu podcast oluşturma |
| 📑 **Sunum (PPT)** | Otomatik PowerPoint sunum oluşturma |
| 📈 **Grafik Görselleştirme** | 26 farklı grafik türü ile veri görselleştirme |
| 💼 **Danışmanlık Raporu** | Profesyonel analiz ve strateji raporları |
| 🐙 **GitHub Analizi** | Repository derinlemesine araştırma |
| 🎯 **Yetenek Oluşturucu** | Kendi özel yeteneklerini oluştur |
| 🇹🇷 **Türkçe Destek** | Arayüz ve AI yanıtları tamamen Türkçe |

## 📋 Gereksinimler

- Docker & Docker Compose
- Gemini API Key ([Google AI Studio](https://aistudio.google.com/apikey))
- Tavily API Key ([Tavily](https://tavily.com)) — web araştırması için
- Min. 2GB RAM (sunucu)

## 🛠️ Kurulum

### Coolify ile Deployment (Önerilen)

1. **GitHub reposunu Coolify'a bağla:**
   ```
   https://github.com/hiktan44/deer-flow.git
   ```

2. **Build Pack:** `Docker Compose` seç

3. **Environment Variables** ekle:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   TAVILY_API_KEY=your_tavily_api_key
   JINA_API_KEY=              # Opsiyonel
   GITHUB_TOKEN=              # Opsiyonel
   BETTER_AUTH_SECRET=defaultsecret123456789012345678901234567890
   BETTER_AUTH_BASE_URL=http://localhost:2026
   ```

4. **Domain:** Sadece `nginx` servisi için domain oluştur (diğer servisler internal)

5. **Deploy** butonuna bas

### Lokal Geliştirme

```bash
# Repoyu klonla
git clone https://github.com/hiktan44/deer-flow.git
cd deer-flow

# Backend
cd backend
cp ../config.example.yaml ../config.yaml  # Düzenle: API key'leri ekle
uv sync
uv run langgraph dev

# Yeni terminal — Gateway
cd backend
uv run uvicorn src.gateway.app:app --host 0.0.0.0 --port 8001

# Yeni terminal — Frontend
cd frontend
pnpm install
pnpm dev
```

Tarayıcıda: `http://localhost:3000`

## 🏗️ Mimari

```
┌──────────────────────────────────────────────────┐
│                    Kullanıcı                      │
│                   (Tarayıcı)                      │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│              nginx (Reverse Proxy)                │
│              Port 80 — Yönlendirme                │
├───────────────┬──────────────┬────────────────────┤
│  /            │  /api/*      │  /api/langgraph/*  │
│  ↓            │  ↓           │  ↓                 │
│  Frontend     │  Gateway     │  LangGraph         │
│  (Next.js)    │  (FastAPI)   │  (Agent Runtime)   │
│  :3000        │  :8001       │  :2024             │
└───────────────┴──────────────┴────────────────────┘
```

### Servisler

| Servis | Teknoloji | Port | Açıklama |
|--------|-----------|------|----------|
| **nginx** | Nginx Alpine | 80 | Reverse proxy, CORS, yönlendirme |
| **frontend** | Next.js 15 | 3000 | Kullanıcı arayüzü (React) |
| **gateway** | FastAPI (Python) | 8001 | API gateway, model yönetimi, bellek |
| **langgraph** | LangGraph API | 2024 | Ajan çalışma ortamı |

## 🎯 Kullanılabilir Yetenekler (18 adet)

### Araştırma & Analiz
- `deep-research` — Web'de derinlemesine araştırma
- `github-deep-research` — GitHub repository analizi
- `consulting-analysis` — Profesyonel danışmanlık raporu
- `data-analysis` — Excel/CSV veri analizi

### İçerik Üretimi
- `image-generation` — AI görsel oluşturma
- `video-generation` — Video üretimi
- `podcast-generation` — Podcast ses dosyası
- `ppt-generation` — PowerPoint sunum
- `chart-visualization` — Veri grafikleri

### Tasarım & Geliştirme
- `frontend-design` — Web arayüz tasarımı
- `web-design-guidelines` — UI/UX denetimi
- `vercel-deploy-claimable` — Vercel'e deploy

### Sistem
- `bootstrap` — AI kişiliği oluşturma
- `find-skills` — Yetenek keşfetme
- `skill-creator` — Yeni yetenek oluşturma
- `surprise-me` — Sürpriz yaratıcı deneyim
- `claude-to-deerflow` — DeerFlow API entegrasyonu
- `turkish-saas-assistant` — Türkçe SaaS asistanı

## ⚙️ Konfigürasyon

### `config.production.yaml`

```yaml
models:
  - name: gemini-3.1-pro-preview
    model: gemini-3.1-pro-preview
    google_api_key: $GEMINI_API_KEY

tools:
  - web_search (Tavily)
  - web_fetch (Jina AI)
  - image_search (DuckDuckGo)
  - file operations (read/write/ls)
  - bash execution

sandbox: LocalSandboxProvider
checkpointer: SQLite
memory: enabled (max 100 facts)
```

## 🔧 Environment Variables

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| `GEMINI_API_KEY` | ✅ | Google Gemini API anahtarı |
| `TAVILY_API_KEY` | ✅ | Web araştırma API anahtarı |
| `JINA_API_KEY` | ❌ | Web içerik çekme (opsiyonel) |
| `GITHUB_TOKEN` | ❌ | GitHub araştırma (opsiyonel) |
| `BETTER_AUTH_SECRET` | ✅ | Oturum güvenlik anahtarı |
| `BETTER_AUTH_BASE_URL` | ✅ | Auth base URL |

## 🐛 Sorun Giderme

### "Bad Gateway" hatası
- nginx servisi için domain tanımlandığından emin ol
- Diğer servisler (frontend, gateway, langgraph) için domain **tanımlama**

### "ChatGoogleGenerativeAIError"
- `GEMINI_API_KEY`'in geçerli olduğunu kontrol et
- [Google AI Studio](https://aistudio.google.com/apikey)'dan yeni key oluştur

### "Thread not found"
- Tarayıcı localStorage'ını temizle (F12 → Application → Clear)
- Yeni bir sohbet başlat

### Coolify'da deployment başarısız
- `Docker Compose` build pack seçildiğinden emin ol
- Environment variables'ın **Production** bölümünde olduğunu kontrol et
- Redeploy sırasında **Force Rebuild** işaretle

## 📁 Proje Yapısı

```
deer-flow/
├── backend/
│   ├── src/
│   │   ├── agents/          # AI ajanları (lead_agent, vb.)
│   │   ├── gateway/         # FastAPI gateway
│   │   ├── community/       # Araçlar (tavily, jina, vb.)
│   │   └── sandbox/         # Dosya/bash operasyonları
│   └── Dockerfile.production
├── frontend/
│   ├── src/
│   │   ├── core/i18n/       # Türkçe dahil çoklu dil desteği
│   │   └── components/      # React bileşenleri
│   └── Dockerfile
├── docker/nginx/
│   ├── nginx.conf           # Reverse proxy konfigürasyonu
│   └── Dockerfile
├── skills/                  # 18 hazır yetenek
│   ├── public/              # Varsayılan yetenekler
│   └── custom/              # Özel yetenekler
├── config.production.yaml   # Production model konfigürasyonu
├── config.example.yaml      # Örnek konfigürasyon
├── docker-compose.yaml      # Coolify deployment
├── .env.example             # Örnek environment variables
└── README.md                # Bu dosya
```

## 🔒 Güvenlik

- API key'ler `.env` dosyasında — **asla commit'leme**
- CORS: nginx seviyesinde merkezi yönetim
- Rate limiting: API katmanında
- Auth: BetterAuth ile oturum yönetimi

## 📝 Lisans

MIT License

## 🤝 Katkıda Bulunma

1. Fork et
2. Feature branch oluştur (`git checkout -b feature/amazing`)
3. Commit at (`git commit -m 'feat: amazing feature'`)
4. Push et (`git push origin feature/amazing`)
5. Pull Request aç

---

**Geliştirici:** [@hiktan44](https://github.com/hiktan44)
**Platform:** [Coolify Self-Hosted](https://coolify.io)
