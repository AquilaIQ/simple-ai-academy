# VPS DF Update — Caveman Summary

## HOW CONNECT TO VPS

```bash
ssh -p 2222 -i ~/.ssh/windsurf-vps-agent -o StrictHostKeyChecking=no root@187.124.236.215
```

- **IP:** 187.124.236.215
- **Port:** 2222
- **Key:** `~/.ssh/windsurf-vps-agent`

### Apps on VPS

| App | Domain | Port | PM2 Name | Path |
|-----|--------|------|----------|------|
| **DFpartners** | https://anisoptera.io | `8080` | `DFpartners` | `/home/manu/apps/DFpartners` |
| **biotech-hitl** | https://biotech.aquilaiq.com | `3002` | `biotech-hitl` | `/home/manu/apps/biotech-hitl` |
| **simple-ai-academy** | https://simpleai.academy | `3000` | `simple-ai-academy` | `/home/manu/apps/simple-ai-academy` |

All apps run as user `manu` via PM2.
- **Live URL (primary):** https://anisoptera.io

---

## FILES MANAGED

### Local Machine (DFpartners)
- **Path:** `/Users/manu/Documents/1. DragonFly/transcripts/LandingPage/dragonfly-partner-landing/`
- **Branch:** `main`
- **Key files changed this session:**
  - `src/components/about/CompanyStatsSection.tsx` — AnimatedCounter removed, static `{stat.value}`
  - `next.config.ts` — turbopack cache header + removed turbopack rules block
  - `src/components/modals/GlobalModalsClient.tsx` — client wrapper for GlobalModals (ssr:false)
  - `src/app/layout.tsx` — swapped between ConditionalHeader/GlobalModalsClient vs Header/GlobalModals

### VPS (DFpartners)
- **Path:** `/home/manu/apps/DFpartners`
- **Branch:** `VPSMigration` (SSH deploy key scoped to this branch only)
- **Current stable commit:** `8417a33` — "feat(layout): add NWRABanner to layout"
- **Note:** `deploy` branch mirrors `VPSMigration` exactly at `8417a33`. VPS cannot fetch `deploy` directly (key scope). Always push changes to both `VPSMigration` and `deploy` to keep them in sync.
- **Key VPS files:**
  - `next.config.ts` — CSP headers, cache headers
  - `src/middleware.ts` — CSP middleware
  - `ecosystem.config.js` — PM2 config

### GitHub (DFpartners)
- **Repo:** `github.com:AquilaIQ/DFpartners.git`
- **Three branches:**
  - `main` — full feature branch (includes experimental pages)
  - `deploy` — **NEW** clean production-parity branch (mirrors VPS exactly, used for VPS deploys going forward)
  - `VPSMigration` — legacy production branch (superseded by `deploy`)
- **deploy tip:** `7a71ee9` — matches VPS production state
- **VPSMigration tip:** `5a14d17` — deploy was forked from here

### GitHub (simple-ai-academy)
- **Repo:** `https://github.com/AquilaIQ/simple-ai-academy.git`
- **Branch:** `main`
- **VPS Path:** `/home/manu/apps/simple-ai-academy`
- **PM2 Name:** `simple-ai-academy`
- **Port:** `3000`
- **Domain:** https://simpleai.academy
- **SSL:** Let's Encrypt via Certbot (expires 2026-09-18, auto-renew)
- **Key VPS files:**
  - `next.config.mjs` — static export removed, SSR enabled
  - `package.json` — `"start": "next start -p 3000"`
  - `ecosystem.config.js` — PM2 config
  - `.env.local` — Supabase credentials
- **Nginx config:** `/etc/nginx/sites-enabled/simpleai.academy`
- **Deploy workflow:**
  ```bash
  ssh -p 2222 -i ~/.ssh/windsurf-vps-agent root@187.124.236.215
  cd /home/manu/apps/simple-ai-academy
  git pull origin main
  pnpm install
  rm -rf .next
  pnpm build
  pm2 restart simple-ai-academy
  curl -s -o /dev/null -w '%{http_code}' https://simpleai.academy
  ```

### Route Archiving (Jun 2, 2026)
The following `main` routes were prefixed with `_` to disable Next.js routing (files preserved):
- `analytics-studio` → `_analytics-studio`
- `gamma` → `_gamma`
- `marketplace` → `_marketplace`
- `oohero` → `_oohero`
- `mine-showcase` → `_mine-showcase`
- `showcase` → `_showcase`

**Rule:** Any page not on VPS must be prefixed with `_` on `main` before merging to `deploy`.

---

## DEPLOY WORKFLOW (CORRECT WAY — updated Jun 2, 2026)

### ⚡ Quick Reference — Going Forward

1. **Commit to `main`** → cherry-pick file(s) to `deploy`
2. **Dual push** — `git push origin deploy && git push origin deploy:VPSMigration`
   _(VPS SSH key is scoped to `VPSMigration` only — must push both to stay in sync)_
3. **On VPS** — `git pull origin VPSMigration` → `rm -rf .next` → rebuild → `pm2 restart DFpartners`

> **Use `deploy` branch going forward. `VPSMigration` is legacy.**

```bash
# 1. LOCAL: commit to main, cherry-pick to deploy (AND VPSMigration — SSH key scope)
git stash
git checkout deploy
git checkout main -- <file>
git commit -m "fix: description"
git push origin deploy
git push origin deploy:VPSMigration   # keep VPSMigration in sync (VPS SSH key)
git checkout main && git stash pop

# 2. VPS: pull VPSMigration + clean build (ALWAYS rm -rf .next first)
ssh -p 2222 -i ~/.ssh/windsurf-vps-agent root@187.124.236.215
cd /home/manu/apps/DFpartners
git pull origin VPSMigration
rm -rf .next
nohup pnpm build > /tmp/build.log 2>&1 &

# 3. Check build done
tail -5 /tmp/build.log
ls .next/BUILD_ID

# 4. Restart
su - manu -c 'pm2 restart DFpartners'
curl -s -o /dev/null -w '%{http_code}' https://anisoptera.io
```

### REVERT COMMAND (one-liner emergency)
```bash
git reset --hard 8658390 && rm -rf .next && nohup pnpm build > /tmp/build.log 2>&1 &
```

---

## WHAT HAS BEEN DONE

| Date | What | Result |
|---|---|---|
| Apr 17 | 502 fix — upgraded Node 18→20, pnpm reinstall | ✅ |
| Apr 17 | Vimeo CSP fix, internal route blocks | ✅ |
| Apr 20 | Blank page — pnpm blocked `unrs-resolver` build scripts | ✅ |
| Apr 20 | Performance audit — Nginx rewrite, bot block, gzip, TCP tuning | ✅ |
| Apr 23 | CSP fix — Clarity wildcard `*.clarity.ms`, removed Nginx CSP conflict | ✅ |
| Apr 23 | SEO audit cherry-picked to VPSMigration (robots.txt, llms.txt, metadata) | ✅ |
| May 5 | AnimatedCounter `+$15M` bug — replaced with static text on VPSMigration | ✅ |
| May 5 | Removed `turbopack:{}` block from next.config.ts | ✅ |
| May 5 | Added `must-revalidate` cache header for turbopack runtime chunk | ⚠️ didn't fix error |
| May 5 | Multiple reverts back to `8658390` | ✅ stable |
| May 20 | `/waste` ChunkLoadError — killed orphan root PM2, clean build, Nginx no-cache turbopack patch | ✅ |
| May 20 | Default use case `retail` → `waste` — cherry-pick `d48b50f`, VPS reset to origin, clean build | ✅ |

---

## THE ERROR (SOLVED — May 20)

```
GET /_next/static/chunks/2a38210570c625a1.js  404
ChunkLoadError: Failed to load chunk from module 14728
  at turbopack-bdd077203f54ee94.js:1:5952
```

### What it means
- `turbopack-bdd077203f54ee94.js` is the Turbopack runtime
- Its content hash is **STABLE** across builds (boilerplate doesn't change)
- Browser caches it as `immutable` (1 year, set in next.config.ts headers)
- After any new deploy, old cached runtime references chunk hashes from OLD build
- Those old chunks are deleted → 404 → app crashes

### Call stack chain
```
turbopack-bdd077203f54ee94.js (cached, stale)
  → d9708e21a9271735.js (old build's React bundle)
    → lazy loads 2a38210570c625a1.js (DELETED in new build) → 404
```

### Key fact
**This error happens after EVERY deployment** because `turbopack-bdd077203f54ee94.js` never changes its hash. Hard refresh doesn't help — `immutable` prevents revalidation. Only full cache clear helps temporarily.

---

## WHAT WAS ATTEMPTED (all failed or reverted)

| Attempt | What | Why failed |
|---|---|---|
| ChunkErrorHandler component | Separate `'use client'` component that reloads on error | Caused its own build errors, reverted |
| Remove `turbopack:{}` from next.config.ts | Thought it forced Turbopack in prod | `--turbopack` is in build script anyway |
| Cache header `must-revalidate` on turbopack-*.js | next.config.ts headers rule | Next.js header pattern `turbopack-:hash.js` may not match correctly |
| Hard resets to `8658390` | Multiple times | Works but loses all changes |
| `nohup` build to survive SSH drop | Background build | SSH drops caused confusion about build state |
| Static text for CompanyStatsSection | Removed animation entirely | Deployed but chunk error still occurs independently |

---

## THREE OPTIONS TO FIX (NOT YET IMPLEMENTED)

### Option 1 — Nginx no-cache (fastest, no redeploy)
```nginx
# Add to /etc/nginx/sites-available/anisoptera
location ~* "/_next/static/chunks/turbopack-.*\.js$" {
    add_header Cache-Control "no-cache, must-revalidate";
}
```
```bash
nginx -t && nginx -s reload
```

### Option 2 — Remove `--turbopack` from build (cleanest)
```json
# package.json
"build": "next build"   # remove --turbopack
```
Webpack runtime changes hash every build → browser always fetches fresh → no stale chunk refs.

### Option 3 — ChunkLoadError in existing ErrorBoundary (safety net)
Modify `src/components/ui/ErrorBoundary.tsx`:
- Detect if error is `ChunkLoadError`
- Check `sessionStorage` flag (prevent reload loop)
- If not yet reloaded → `window.location.reload()`
Standard Vercel-recommended pattern.

---

## CURRENT VPS STATE

- **Commit:** `d48b50f` — "Change default use case from retail to waste & recycling"
- **Branch:** `VPSMigration` synced with origin
- **App:** Running, HTTP 200
- **Animation:** Static text (AnimatedCounter removed)
- **Default use case tab:** Waste & Recycling
- **Build:** Clean (`rm -rf .next` before build)
- **Chunk error:** Mitigated — Nginx no-cache on `turbopack-*.js` applied May 20

---

## IMPORTANT NOTES

- **NEVER** `git pull origin main` on VPS — branches diverged intentionally, main has unfinished features
- **ALWAYS** `rm -rf .next` before building on VPS
- **ALWAYS** use `nohup pnpm build > /tmp/build.log 2>&1 &` — SSH drops kill foreground builds
- **CHECK** build with `tail -5 /tmp/build.log && ls .next/BUILD_ID`
- **Activity log:** `/Users/manu/Documents/1. DragonFly/transcripts/LandingPage/vps/ACTIVITY-LOG.md`

### Public Assets Deployment (Jun 1, 2026 Learning)
**Critical:** Next.js only serves `public/` files that existed at build time. New assets added via `scp` after build will return 404 until rebuild.

**Workflow when adding new images/videos:**
1. `scp` new files to `/home/manu/apps/DFpartners/public/` on VPS
2. **ALWAYS rebuild** — `rm -rf .next && nohup pnpm build > /tmp/build.log 2>&1 &`
3. Restart PM2 — `su - manu -c 'pm2 restart DFpartners'`
4. Verify with `curl -o /dev/null -w '%{http_code}' https://anisoptera.io/path/to/asset`

**Why:** Next.js generates a static file manifest at build time. Files added afterward are on disk but not in the manifest, so Nginx/Next.js won't serve them. Rebuild regenerates the manifest.
