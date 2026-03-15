#!/bin/bash

# Vercel Deployment Script — Authenticated Deploy
# VERCEL_API_KEY ile doğrudan kullanıcının hesabına deploy eder
# Usage: ./deploy.sh [project-path]

set -e

# Authenticated API veya fallback claimable
VERCEL_API_KEY="${VERCEL_API_KEY:-}"
DEPLOY_ENDPOINT="https://claude-skills-deploy.vercel.com/api/deploy"

# Detect framework from package.json
detect_framework() {
    local pkg_json="$1"

    if [ ! -f "$pkg_json" ]; then
        echo "null"
        return
    fi

    local content=$(cat "$pkg_json")

    has_dep() {
        echo "$content" | grep -q "\"$1\""
    }

    if has_dep "blitz"; then echo "blitzjs"; return; fi
    if has_dep "next"; then echo "nextjs"; return; fi
    if has_dep "gatsby"; then echo "gatsby"; return; fi
    if has_dep "@remix-run/"; then echo "remix"; return; fi
    if has_dep "@react-router/"; then echo "react-router"; return; fi
    if has_dep "astro"; then echo "astro"; return; fi
    if has_dep "@sveltejs/kit"; then echo "sveltekit-1"; return; fi
    if has_dep "svelte"; then echo "svelte"; return; fi
    if has_dep "nuxt"; then echo "nuxtjs"; return; fi
    if has_dep "vitepress"; then echo "vitepress"; return; fi
    if has_dep "@solidjs/start"; then echo "solidstart-1"; return; fi
    if has_dep "@docusaurus/core"; then echo "docusaurus-2"; return; fi
    if has_dep "@angular/core"; then echo "angular"; return; fi
    if has_dep "react-scripts"; then echo "create-react-app"; return; fi
    if has_dep "@nestjs/core"; then echo "nestjs"; return; fi
    if has_dep "hono"; then echo "hono"; return; fi
    if has_dep "fastify"; then echo "fastify"; return; fi
    if has_dep "express"; then echo "express"; return; fi
    if has_dep "vite"; then echo "vite"; return; fi
    if has_dep "parcel"; then echo "parcel"; return; fi

    echo "null"
}

# Parse arguments
INPUT_PATH="${1:-.}"

# Create temp directory
TEMP_DIR=$(mktemp -d)
TARBALL="$TEMP_DIR/project.tgz"
CLEANUP_TEMP=true

cleanup() {
    if [ "$CLEANUP_TEMP" = true ]; then
        rm -rf "$TEMP_DIR"
    fi
}
trap cleanup EXIT

echo "Preparing deployment..." >&2

# Package project
FRAMEWORK="null"

if [ -f "$INPUT_PATH" ] && [[ "$INPUT_PATH" == *.tgz ]]; then
    echo "Using provided tarball..." >&2
    TARBALL="$INPUT_PATH"
    CLEANUP_TEMP=false
elif [ -d "$INPUT_PATH" ]; then
    PROJECT_PATH=$(cd "$INPUT_PATH" && pwd)
    FRAMEWORK=$(detect_framework "$PROJECT_PATH/package.json")

    if [ ! -f "$PROJECT_PATH/package.json" ]; then
        HTML_FILES=$(find "$PROJECT_PATH" -maxdepth 1 -name "*.html" -type f)
        HTML_COUNT=$(echo "$HTML_FILES" | grep -c . || echo 0)
        if [ "$HTML_COUNT" -eq 1 ]; then
            HTML_FILE=$(echo "$HTML_FILES" | head -1)
            BASENAME=$(basename "$HTML_FILE")
            if [ "$BASENAME" != "index.html" ]; then
                echo "Renaming $BASENAME to index.html..." >&2
                mv "$HTML_FILE" "$PROJECT_PATH/index.html"
            fi
        fi
    fi

    echo "Creating deployment package..." >&2
    tar -czf "$TARBALL" -C "$PROJECT_PATH" --exclude='node_modules' --exclude='.git' .
else
    echo "Error: Input must be a directory or a .tgz file" >&2
    exit 1
fi

if [ "$FRAMEWORK" != "null" ]; then
    echo "Detected framework: $FRAMEWORK" >&2
fi

echo "Deploying..." >&2

# ── Authenticated Deploy (VERCEL_API_KEY varsa) ───────────────────────
if [ -n "$VERCEL_API_KEY" ]; then
    echo "🔐 Authenticated deploy (your Vercel account)..." >&2

    # Vercel API v13 ile deploy
    RESPONSE=$(curl -s -X POST "https://api.vercel.com/v13/deployments" \
        -H "Authorization: Bearer $VERCEL_API_KEY" \
        -H "Content-Type: application/octet-stream" \
        --data-binary @"$TARBALL")

    # Eğer hata varsa, claimable fallback
    if echo "$RESPONSE" | grep -q '"error"'; then
        echo "⚠️ Authenticated deploy failed, falling back to claimable..." >&2

        # Claimable endpoint fallback
        RESPONSE=$(curl -s -X POST "$DEPLOY_ENDPOINT" -F "file=@$TARBALL" -F "framework=$FRAMEWORK")

        if echo "$RESPONSE" | grep -q '"error"'; then
            ERROR_MSG=$(echo "$RESPONSE" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
            echo "Error: $ERROR_MSG" >&2
            exit 1
        fi
    else
        # Authenticated deploy başarılı — URL oluştur
        DEPLOY_URL=$(echo "$RESPONSE" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
        DEPLOY_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

        if [ -n "$DEPLOY_URL" ]; then
            PREVIEW_URL="https://$DEPLOY_URL"
            echo "" >&2
            echo "✅ Deployment successful! (Your Vercel Account)" >&2
            echo "" >&2
            echo "Preview URL: $PREVIEW_URL" >&2
            echo "Deployment ID: $DEPLOY_ID" >&2
            echo "" >&2
            echo "⚠️ IMPORTANT: Linki YENİ SEKMEDE aç, mevcut sayfayı kapatma!" >&2
            echo "" >&2
            echo "{\"previewUrl\": \"$PREVIEW_URL\", \"deploymentId\": \"$DEPLOY_ID\", \"authenticated\": true}"
            exit 0
        fi
    fi
fi

# ── Claimable Deploy (VERCEL_API_KEY yoksa) ───────────────────────────
RESPONSE=$(curl -s -X POST "$DEPLOY_ENDPOINT" -F "file=@$TARBALL" -F "framework=$FRAMEWORK")

if echo "$RESPONSE" | grep -q '"error"'; then
    ERROR_MSG=$(echo "$RESPONSE" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
    echo "Error: $ERROR_MSG" >&2
    exit 1
fi

PREVIEW_URL=$(echo "$RESPONSE" | grep -o '"previewUrl":"[^"]*"' | cut -d'"' -f4)
CLAIM_URL=$(echo "$RESPONSE" | grep -o '"claimUrl":"[^"]*"' | cut -d'"' -f4)

if [ -z "$PREVIEW_URL" ]; then
    echo "Error: Could not extract preview URL from response" >&2
    echo "$RESPONSE" >&2
    exit 1
fi

echo "" >&2
echo "✅ Deployment successful!" >&2
echo "" >&2
echo "Preview URL: $PREVIEW_URL" >&2
echo "Claim URL:   $CLAIM_URL" >&2
echo "" >&2
echo "⚠️ IMPORTANT: Linki YENİ SEKMEDE aç, mevcut sayfayı kapatma!" >&2
echo "" >&2

echo "$RESPONSE"
