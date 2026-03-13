# DeerFlow — Coolify Deployment Rehberi

## Ön Gereksinimler

- Coolify sunucunuzda **Docker** ve **Docker Compose** kurulu olmalı
- Git repository'si GitHub'a push edilmiş olmalı

---

## Coolify'da Deploy Adımları

### 1. Yeni Proje Oluşturun
Coolify Dashboard → **New Project** → İsim verin (örn: "DeerFlow")

### 2. Yeni Resource Ekleyin
**Add New Resource** → **Docker Compose** seçin

### 3. GitHub Repository'sini Bağlayın
- Repository: `https://github.com/hiktan44/deer-flow` (veya sizin repo URL'iniz)
- Branch: `main`
- Docker Compose Location: `docker-compose.coolify.yaml`

### 4. Environment Variables Tanımlayın
Coolify Dashboard → **Environment Variables** bölümünde ekleyin:

```env
# ZORUNLU
GEMINI_API_KEY=AIzaSyD2mDKhKY9Fu6O_SwFxJXxwsKqA1cfdyBc
TAVILY_API_KEY=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
GITHUB_TOKEN=nfp_Sk8pHNspwAwuNg4NkzgnvL3yfVpBGuKL7f97

# OTOMATİK (deploy script oluşturur, ama manuel de girebilirsiniz)
BETTER_AUTH_SECRET=<random-hex-token>
PORT=2026
```

> **BETTER_AUTH_SECRET** oluşturmak için: `python3 -c 'import secrets; print(secrets.token_hex(32))'`

### 5. Domain Yapılandırması
Coolify → **Settings** → **Domains**:
- nginx servisine domain atayın (örn: `deerflow.seymata.com`)
- Port: `2026`
- SSL: Otomatik (Let's Encrypt)

### 6. Deploy
**Deploy** butonuna basın — Coolify otomatik build + start yapacak.

---

## Health Check

nginx servisi `/health` endpoint'ini gateway'e proxy'ler:
```
GET https://your-domain.com/health
→ 200 OK {"status": "ok"}
```

## Servis Yapısı

| Servis | Port | İşlev |
|--------|------|-------|
| nginx | 2026 | Reverse proxy + CORS |
| frontend | 3000 | Next.js UI |
| gateway | 8001 | FastAPI Gateway API |
| langgraph | 2024 | LangGraph Agent Server |

## Volumes

| Volume | Kullanım |
|--------|----------|
| `deer-flow-data` | Agent hafızası, memory.json, checkpoints |
| `langgraph-api-data` | LangGraph API verileri |

## Troubleshooting

**Build başarısız olursa:**
- Coolify Logs → ilgili servisin loglarını kontrol edin
- `config.yaml` ve `.env` dosyalarının repo'da olduğundan emin olun

**Health check başarısız olursa:**
- Gateway servisinin başlatılmasını bekleyin (start_period: 30s)
- `GEMINI_API_KEY` doğru mu kontrol edin
