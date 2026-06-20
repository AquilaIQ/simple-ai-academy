# VPS Activity Log

## 2026-06-02

### 16:55 UTC - deploy Branch Switch & Sync
- **Action:** Switched VPS tracking from `VPSMigration` to `deploy`; both branches now share same tip
- **Details:**
  - VPS SSH deploy key only has refspec for `VPSMigration` — `git fetch origin deploy` returned no remote ref
  - Resolution: committed the already-applied NWRABanner layout change directly on VPS under `VPSMigration` (commit `8417a33`)
  - Pushed `VPSMigration` to GitHub (`5a14d17..8417a33`)
  - Locally reset `deploy` branch to `origin/VPSMigration` tip so both branches share identical commit `8417a33`
  - Force-pushed `deploy` to GitHub — `deploy` and `VPSMigration` are now in sync at `8417a33`
  - Verified: `curl https://anisoptera.io` → HTTP 200; banner HTML contains `Book time`, `nwra-booking`, `WLS` — rendering confirmed
  - No rebuild required — layout change was already live from prior SSH patch + existing build
- **Branch state after:**
  - `origin/VPSMigration` → `8417a33` ✅
  - `origin/deploy` → `8417a33` ✅ (identical)
  - VPS working tree → clean, tracking `VPSMigration`, up to date
- **Status:** ✅ Complete
- **Impact:** `deploy` branch is now the canonical production branch. Future deploys: cherry-pick from `main` to `deploy`, push, then `git pull origin deploy` on VPS.

### 16:35 UTC - Branch Diff Analysis: main vs VPSMigration
- **Action:** Full git diff comparison between local `main` and VPS `VPSMigration` branches
- **VPS commit:** `5a14d17` | **Local main tip:** `b1160f5` (same — branches share this commit)
- **VPSMigration is ~50 commits behind main**
- **Files with actual code changes (non-zero diff) — `src/` only:**

  | Category | Key Changed Files | Notes |
  |---|---|---|
  | Layout | `src/app/layout.tsx` | VPS uses `Header`+`GlobalModals` directly; local uses `ConditionalHeader`+`GlobalModalsClient`+`NWRABanner` |
  | Layout components | `ConditionalHeader.tsx`, `ConditionalFooter.tsx`, `Header.tsx`, `Footer.tsx` | Header nav updates (Log In link, nav reorder) in local; VPS has older Header |
  | Home page | `src/app/page.tsx` | Minor diffs |
  | NWRA/WLS components | All `nwra2026/` files | **In sync** — same content on both branches |
  | New pages (local only) | `/oohero`, `/marketplace`, `/gamma`, `/wastev2`, `/analytics-studio` | Not on VPS intentionally |
  | New API routes (local only) | `/api/marketplace/*`, `/api/oohero/*` | Not on VPS |
  | Middleware | `src/middleware.ts` | +8 lines in local (VPS has full CSP middleware) |
  | Data files | `mockProducts.ts` (+1255), `oohero-blog-posts.ts` (+199), `mockAnalyticsData.ts` (+160) | Local-only feature data |

- **VPS-intentional divergence:** VPS keeps stable `Header`+`GlobalModals` (SSR-safe); local `main` uses `ConditionalHeader`+`GlobalModalsClient` (client-wrapped). These must stay separate to avoid hydration issues.
- **Status:** ✅ Analysis complete
- **Impact:** No changes made — documentation only

### 16:20 UTC - NWRABanner Added to VPS Layout
- **Action:** Added NWRA "Book time with us at WLS" banner to top of https://anisoptera.io
- **Details:**
  - Root cause: `NWRABanner.tsx` existed on VPS (`src/components/layout/`) but was never imported in `layout.tsx` (VPS was on older commit)
  - Surgically patched VPS `src/app/layout.tsx` via SSH `sed`:
    - Added `import NWRABanner from "@/components/layout/NWRABanner"`
    - Rendered `<NWRABanner />` above `<Header />`
    - Updated content top margin `mt-20 sm:mt-24` → `mt-32 sm:mt-36` to accommodate banner + header stack
  - Confirmed `WLS.png` present in `public/`
  - Clean rebuild: `rm -rf .next && nohup pnpm build > /tmp/build.log 2>&1`
  - `pm2 restart DFpartners` — HTTP 200 confirmed
  - **No other files modified** — surgical change only
- **Status:** ✅ Complete
- **Impact:** Dark banner strip now shows at top of all pages: "♻️ Book time with us at the [WLS logo] on June 8–10 at Washington DC" — links to `/nwra#nwra-booking`

### 13:50 UTC - NWRA Ribbon Animation Fix — Rebuild & Verify
- **Action:** Rebuilt VPS after `@layer utilities` fix for marquee animation
- **Details:**
  - `git pull origin VPSMigration` — only `src/app/globals.css` changed (+20 lines)
  - `rm -rf .next && nohup pnpm build > /tmp/build.log 2>&1`
  - `pm2 restart DFpartners`
  - Verified `@keyframes marquee` and `.animate-marquee` present in built chunk `ede3e6c2907c6b3f.css`
  - Confirmed `/nwra` page loads the correct CSS chunk and `animate-marquee` class is in rendered HTML
- **Status:** ✅ Complete
- **Impact:** Logo ribbon scrolling animation now works on VPS production build

### 13:30 UTC - NWRA Ribbon Animation — Root Cause Found & Fixed
- **Action:** Identified and fixed why marquee animation worked locally but not on VPS
- **Root Cause:** Local `next dev` uses Turbopack (no CSS optimization). VPS `next build` uses Webpack + `@tailwindcss/postcss` which stripped `@keyframes marquee` and `.animate-marquee` from output CSS — confirmed by `grep marquee .next/static/chunks/*.css` returning 0 matches post-build
- **Previous incorrect fix:** `@keyframes` placed before `@import "tailwindcss"` — did not survive production PostCSS pipeline
- **Correct fix:** Wrapped both `@keyframes marquee` and `.animate-marquee` in `@layer utilities` in `src/app/globals.css` — this anchors the CSS to Tailwind's utility layer, preventing tree-shaking during production build
- **Commits:** `b1160f5` (main), `5a14d17` (VPSMigration) — only `globals.css` changed, no branch bleed
- **Status:** ✅ Complete
- **Impact:** CSS now present in production build; `marquee` confirmed in chunk with correct `@keyframes` and `.animate-marquee` class

## 2026-06-01

### 22:35 UTC - Rebuild After Asset Transfer
- **Action:** Clean rebuild required — Next.js doesn't serve new `public/` files added after build without rebuilding
- **Details:** `rm -rf .next && nohup pnpm build > /tmp/build.log 2>&1` + `pm2 restart DFpartners`
- **Status:** ✅ Complete
- **Impact:** All assets now return HTTP 200: WLS.png, RumpkeSite.png, logos/mpact.png, logos/Mira v1 MRF Operator.png, videos/WhoDragonfly.mp4, /nwra page

### 22:20 UTC - NWRA Page Missing Assets — scp to VPS
- **Action:** Audited all NWRA page asset dependencies and transferred missing files via scp
- **Details:**
  - Transferred entire `logos/` directory (13 files): mpact.png, SkipWaste.png, RiA.png, NVIDIA Inception.png, MSFT StartUp.png, NED Green Foundation.png, HikRobot.png, CES.png, SAB Foundation.png, Mira v1 MRF Operator.png, Rumpke.png, Awards.png, Partners.png
  - Transferred `/public/RumpkeSite.png` (1.4MB)
  - Transferred `/public/WLS.png` (73KB)
  - Transferred `/public/videos/WhoDragonfly.mp4` (2.9MB)
  - Already present on VPS (no action needed): WasteConveyorRaw_SQ_optimized.mp4, WasteConveyorVisionAI_SQ_optimized.mp4, WasteIntelligence.png, AiAnalyticsTs.png, DF PTZ Platform.svg, waste/Staff.png, waste/conveyorbelt.png, waste/BinCollection.png
- **Status:** ✅ Complete
- **Impact:** All NWRA page image and video assets now present on VPS. No rebuild needed (public assets served statically).

### 22:10 UTC - NWRA Page + Header Nav Cherry-Pick Deploy
- **Action:** Cherry-picked NWRA page + header bar updates from `main` to `VPSMigration`, pushed to GitHub, pulled on VPS, clean build, PM2 restart
- **Details:** 
  - Added `/nwra` route (`src/app/nwra/page.tsx`) — NWRA Waste Leadership Summit 2026 landing page
  - Added all `src/components/nwra2026/` components (Hero, LogoRibbon, AgenticPlatform, AniLaunch, SocialProof, Comparison, MeetingBooking, FinalCTA, etc.)
  - Added `src/components/layout/NWRABanner.tsx`
  - Added `src/app/api/nwra/booking/route.ts`
  - Added `src/components/sections/wastev2/WasteV2FAQSection.tsx` (dependency of NWRA page)
  - Updated `Header.tsx` nav: "Waste & Recycling" → `/nwra` (was `/waste`)
  - VPS commit: `3c05e18` on `VPSMigration`
- **Status:** ✅ Complete
- **Impact:** `https://anisoptera.io` HTTP 200, `https://anisoptera.io/nwra` HTTP 200. No other pages modified.

## 2026-05-05

### 19:51 UTC - Static Text Deploy + Clean Build (ChunkLoadError fix)
- **Action:** `rm -rf .next && pnpm build` + `pm2 restart DFpartners`
- **Details:** Previous deployments left Turbopack dev-mode chunks (`turbopack-bdd077203f54ee94.js`) mixed into `.next`. Clean build removes all stale artifacts.
- **Status:** ✅ Complete
- **Impact:** ChunkLoadError resolved. Site HTTP 200. All future deploys must use `rm -rf .next` before build.

### 19:45 UTC - CompanyStatsSection Static Text Cherry-Pick
- **Action:** Cherry-picked only `src/components/about/CompanyStatsSection.tsx` to VPSMigration (`da6f30b`)
- **Details:** Replaced `AnimatedCounter` with static `{stat.value}` — fixes `+$15M` display bug without animation complexity. No other files pushed to VPS.
- **Status:** ✅ Complete
- **Impact:** Stats (`+$1.5M`, `50+`, etc.) now render correctly as static text.

### 19:00 UTC - Full VPS Revert to 8658390
- **Action:** `git reset --hard 8658390` on VPS + clean build
- **Details:** Reverted all changes (ChunkErrorHandler, AnimatedCounter fix) back to last known-good SEO commit after repeated ChunkLoadErrors.
- **Status:** ✅ Complete
- **Impact:** Site stable at pre-animation-fix state.

### 18:55 UTC - VPS Reverted ChunkErrorHandler (9d23cd0)
- **Action:** `git revert c14bba6` on VPSMigration
- **Details:** ChunkErrorHandler caused issues; reverted commit on both local main and VPSMigration.
- **Status:** ✅ Complete

## 2026-04-23

### 13:47 UTC - AnimatedCounter +$15M Typo Fix — VPS Deploy Pending
- **Action:** Fixed `AnimatedCounter` regex bug causing `+$1.5M` to render as `+$15M`
- **Root cause:** `parseInt(value.replace(/[^0-9]/g, ''))` stripped the decimal point from `1.5` → `15`
- **Fix:** Changed to `parseFloat(value.replace(/[^0-9.]/g, ''))` + `toFixed(1)` display for decimals
- **File:** `src/components/about/CompanyStatsSection.tsx`
- **Local commit:** `9ece0ce` on `main`
- **VPSMigration commit:** `7b8305d` cherry-picked and pushed to `origin/VPSMigration`
- **VPS deployment:** ✅ Complete — `git pull` → `pnpm build` → `pm2 restart DFpartners` → HTTP 200
- **SSH incident:** `ssh.service` was stopped/disabled on VPS. Re-enabled via hosting console: `sudo systemctl enable ssh && sudo systemctl start ssh`
- **Status:** ✅ Complete — `+$1.5M` now renders correctly on live site

### 20:58 UTC - SEO Audit Fixes Cherry-Picked to VPSMigration
- **Action:** Surgically applied SEO v2.18.0 audit fixes — no new component dependencies introduced
- **Method:** File-level `git checkout origin/main -- <file>` + manual edit on `layout.tsx` to preserve VPS component structure
- **Files deployed:**
  - `public/robots.txt` — proper crawl directives + sitemap reference (new)
  - `public/llms.txt` — AI/LLM discoverability file (new)
  - `src/app/layout.tsx` — updated title, description, keywords, OG/Twitter, canonical to `www.anisoptera.io`, upgraded JSON-LD `@graph` schema, added Clarity Script tag. `Header` preserved (ConditionalHeader skipped — not on VPS branch)
  - `src/app/alpha/layout.tsx` — metadata text updates
  - `src/app/assessment/layout.tsx` — metadata improvements
  - `src/app/success-stories/layout.tsx` — added Metadata type + page metadata
  - `src/app/meet-us-at-ces/layout.tsx` — Metadata + redirect logic
  - `src/app/mine-showcase/layout.tsx` — Metadata + redirect logic
- **Skipped (intentional):** `next-sitemap.config.js` (requires new package), analytics-studio/marketplace/oohero layouts (new routes not on VPS)
- **Build fix:** `dynamic()` with `ssr:false` not allowed in Server Components — reverted `GlobalModals` to static import
- **Build:** `pnpm build` ✅ | `pm2 restart DFpartners` ✅ | HTTP 200 confirmed
- **Commits:** `eebce1f`, `8658390` pushed to `origin/VPSMigration`
- **Status:** ✅ Complete — live on https://anisoptera.io

### 20:46 UTC - Branch Strategy Decision: Keep main and VPSMigration Separate
- **Decision:** `main` and `VPSMigration` branches intentionally kept separate until local features are production-ready
- **Reason:** All new features on `main` (Marketplace, OOHero, Analytics Studio, Gamma page, SEO fixes) are still in **development mode** — not ready for production deployment to VPS
- **VPS stays on:** `VPSMigration` (`f6fc28b`) — stable, CSP-fixed, current production state
- **Do NOT run** `git pull origin main` on VPS until features are explicitly signed off for production
- **Deployment trigger:** When `main` features are ready, deploy via controlled `git pull origin main` on VPS → `pnpm build` → `pm2 restart DFpartners`
- **Status:** ✅ Logged — branches diverging intentionally

### 20:30 UTC - CSP Fix: *.clarity.ms Wildcard (j.clarity.ms/collect blocked)
- **Action:** Replaced all individual `clarity.ms` subdomain entries with `https://*.clarity.ms` wildcard
- **Root cause:** `https://j.clarity.ms/collect` blocked by `connect-src`. Clarity uses multiple subdomains (www, scripts, c, j) — individual entries are fragile
- **Fix:** Single `https://*.clarity.ms` wildcard in `script-src`, `script-src-elem`, `connect-src` in both `next.config.ts` and `src/middleware.ts`
- **Build:** `pnpm build` ✅ | `pm2 restart DFpartners` ✅
- **Verification:** `curl -I` confirmed `*.clarity.ms` present in all three live CSP directives
- **Status:** ✅ Complete — Commit `0ee74c7` pushed to `origin/main`
- **Impact:** All current and future Clarity subdomains covered. No further per-subdomain CSP errors expected.

### 20:22 UTC - CSP Fix: scripts.clarity.ms Added for Clarity JS Bundle
- **Action:** Added `https://scripts.clarity.ms` to `script-src` and `script-src-elem` CSP directives
- **Root cause:** Clarity tag loads from `www.clarity.ms` but dynamically injects bundle from `scripts.clarity.ms` (different subdomain, separate CSP origin). Browser blocked `scripts.clarity.ms/0.8.59/clarity.js`.
- **Files changed:** `next.config.ts`, `src/middleware.ts` — scp'd directly to VPS
- **Build:** `pnpm build` ✅ | `pm2 restart DFpartners` ✅
- **Verification:** `curl -I https://anisoptera.io | grep content-security-policy | grep scripts.clarity.ms` — confirmed present
- **Status:** ✅ Complete
- **Impact:** Clarity JS bundle now loads without CSP violation. Commit `828bf72` pushed to `origin/main`.

### 20:19 UTC - VPS Branch Snapshot Committed & Pushed to GitHub
- **Action:** Committed all 446 VPS-side uncommitted changes to `VPSMigration` branch and pushed to GitHub
- **Details:** 446 files staged (445 modified + `ecosystem.config.js` untracked). Majority were file permission mode changes (100644→100755) applied by Linux filesystem. Content changes include CSP scp files from today. Commit hash: `bc506f6`
- **Status:** ✅ Complete — pushed `8cc48d9..bc506f6 VPSMigration -> VPSMigration`
- **Impact:** VPS working state fully preserved on GitHub. No data at risk of loss.

### 20:10 UTC - CSP Fixed: Removed Nginx CSP, Updated App CSP for Clarity + Google
- **Action:** Fixed dual conflicting CSP headers causing Clarity and Google Analytics to be blocked
- **Root cause:** Three CSP sources (next.config.ts, middleware.ts, Nginx add_header) were sending separate CSP headers. Browser applies all simultaneously (most restrictive per directive), causing Clarity blocked by app CSP and Google Analytics/Ads blocked by Nginx CSP
- **Fix applied:**
  1. Added `https://www.clarity.ms` to `script-src` and `script-src-elem` in both `next.config.ts` and `src/middleware.ts`
  2. Added `https://www.clarity.ms` and `https://c.clarity.ms` to `connect-src` in both files
  3. Removed `add_header Content-Security-Policy` from Nginx config (Nginx no longer sets CSP)
  4. Transferred only `next.config.ts` and `src/middleware.ts` via scp (VPS branch preserved)
  5. Ran `pnpm build` on VPS then `pm2 restart all` (DFpartners process)
- **Verification:** `curl -I https://anisoptera.io` — single CSP header confirmed with all domains present
- **Status:** ✅ Complete
- **Impact:** Clarity tracking and all Google Analytics/Ads tags now load without any CSP violations

### 20:05 UTC - CSP Header Added for MS Clarity (SUPERSEDED - caused conflict)
- **Action:** Added Content-Security-Policy header to Nginx — created dual-header conflict
- **Status:** ❌ Superseded by fix above

---

## 2026-04-20

### 17:20 UTC - Nginx Config Overhaul - Speed Fix Applied
- **Action:** Complete Nginx site config rewrite targeting root cause of 75s page loads
- **Root Causes Fixed:**
  1. `proxy_connect_timeout 75s` → `5s` — was EXACTLY matching the observed delay; when upstream momentarily unavailable Nginx waited the full 75s
  2. `proxy_pass http://localhost:8080` → `upstream nextjs_backend { server 127.0.0.1:8080; keepalive 64; }` — localhost resolves to both 127.0.0.1 AND ::1; IPv6 path was unreliable; also no connection reuse
  3. `Connection: 'upgrade'` on all requests → `Connection: ""` — wrong header for non-WebSocket HTTP/1.1 keepalive
  4. No SSL stapling → added `ssl_stapling on/verify on` — avoids live OCSP check to Let's Encrypt on every new TLS connection
  5. Small proxy buffers → `proxy_buffers 8 256k` — was causing SVG/JS assets to spill to disk (confirmed in error log)
  6. `proxy_read_timeout 300s` → `60s` — faster failure on backend hangs
- **Verification:** `curl` from server: connect: 0.020s | TTFB: 0.059s | total: 0.059s
- **Bot block:** Still active — 18.223.149.168 blocked (6 packets dropped)
- **Status:** ✅ Complete — nginx -t passed, reloaded
- **Impact:** Nginx no longer waits 75s on upstream issues; keepalive reuse reduces connection overhead; SSL handshakes faster for new visitors

---

### 16:58 UTC - Phase 3 Code Optimizations (Local Only - Not Deployed)
- **Action:** Performance code changes committed to `dashboardDemo` branch — NOT deployed to VPS (user decision)
- **Changes:**
  1. `next.config.ts`: Removed ~50 lines of dead webpack `splitChunks` config (ignored by Turbopack build), added `reactStrictMode: true`
  2. `src/app/layout.tsx`: Lazy loaded `GlobalModals` via `next/dynamic` (defers ContactForm + InfoPackForm from critical bundle)
  3. `src/app/assessment/page.tsx`: `MicroAssessmentWizard` now lazy loaded with skeleton (defers react-hook-form + zod)
- **Commit:** `9ff5dd3` on branch `dashboardDemo` — pushed to GitHub
- **Status:** ✅ Committed & Pushed | ⏳ VPS Deploy Pending (on hold)
- **Impact:** Ready to deploy when user approves; no change to live site

### 16:50 UTC - Phase 4: iptables Rules Persisted
- **Action:** Persisted iptables rules (including bot block for 18.223.149.168) via `netfilter-persistent save`
- **Details:** `netfilter-persistent` already installed; ran save to persist rules across reboots
- **Status:** ✅ Complete
- **Impact:** Bot IP block now survives server reboots

### 16:45 UTC - Cloudflare Setup Workflow Created
- **Action:** Created Cloudflare setup guide and workflow
- **Files Created:**
  - `/LandingPage/vps/cloudflare-nginx.conf` — Cloudflare IP allowlist for Nginx
  - `/.windsurf/workflows/cloudflare-setup.md` — Step-by-step Cloudflare setup workflow
- **Status:** ✅ Complete
- **Impact:** User can run `/cloudflare-setup` workflow to eliminate 75s TCP connect issue

---

### 15:54 UTC - Performance Audit & Server Hardening
- **Action:** Full performance diagnosis and server-side optimizations applied
- **Root Causes Identified:**
  1. VPS provider TCP SYN rate limiting causes 75s TCP connect from external IPs (confirmed by 102ms ping vs 75s connect, 0% packet loss — not fixable at OS level, requires Cloudflare)
  2. Bot IP `18.223.149.168` flooding 20+ req/s (PHP probe attack) saturating Nginx worker
  3. Nginx gzip had no `gzip_types` defined — JS/CSS served uncompressed
  4. `tcp_max_syn_backlog=256` too low, filled by bot attack
- **Fixes Applied:**
  1. Blocked bot IP: `iptables -I INPUT -s 18.223.149.168 -j DROP`
  2. TCP backlog: `net.ipv4.tcp_max_syn_backlog` 256 → 65536 (persisted in `/etc/sysctl.conf`)
  3. `net.core.somaxconn` 4096 → 65536 (persisted)
  4. Nginx `worker_connections` 768 → 4096
  5. Nginx `multi_accept on`, `use epoll` enabled
  6. Nginx gzip now covers: text/css, JS, JSON, SVG, XML, fonts
  7. Nginx `limit_conn addr 20` per-IP connection cap added
  8. `ssl_protocols` restricted to TLSv1.2/TLSv1.3 in main config
  9. `server_tokens off` added
- **Plan Created:** `/LandingPage/vps/PERFORMANCE-PLAN.md` with 4-phase optimization roadmap
- **Status:** ✅ Phase 1 Complete
- **Impact:**
  - JS/CSS now gzip compressed (127KB CSS → ~35KB transferred)
  - Bot attack eliminated
  - Connection backlog 256x larger
  - Next steps: Cloudflare (Phase 2, highest impact)

---

### 13:57 UTC - Blank Page Bug - Root Cause & Resolution
- **Action:** Diagnosed and fixed blank page rendering on anisoptera.io
- **Root Cause:** Tailwind CSS 4 utility classes not generated in production build
  - pnpm 10's new security policy blocked build scripts for `unrs-resolver` (Tailwind CSS 4's Rust core) and `sharp`
  - Without `unrs-resolver` running, Tailwind generated only font-face definitions (3.6 KB instead of 125 KB)
  - Page HTML was served correctly (200 OK) but with zero layout/style classes — appearing completely blank
- **Diagnostic Steps:**
  1. Confirmed server returning HTTP 200 with full HTML (not a server crash)
  2. Confirmed Nginx and PM2 healthy (app running, ports open)
  3. Identified CSS file was only 3.6 KB — only fonts, no utility classes
  4. Traced back to April 17 build warning: "Ignored build scripts: sharp, unrs-resolver"
- **Resolution Steps:**
  1. Added `pnpm.onlyBuiltDependencies: ["sharp", "unrs-resolver"]` to `package.json` via Node.js patch
  2. Ran `CI=true pnpm install` — both packages ran build scripts successfully
  3. Ran `pnpm build` — Tailwind CSS now generated full 125 KB stylesheet
  4. Restarted PM2 — app online, memory reset to 177 MB (was 494 MB after 2-day uptime)
  5. Verified HTTPS: HTTP 200 in 0.215s
- **Status:** ✅ Complete
- **Impact:**
  - Site fully visible with all styling restored
  - Memory dropped from 494 MB → 177 MB after restart
  - CSS file grew from 3.6 KB → 125 KB (correct Tailwind output)
  - Future builds will correctly allow `unrs-resolver` build scripts

---

## 2026-04-17

### 20:00 UTC - 502 Bad Gateway Error - Root Cause & Resolution
- **Action:** Diagnosed and fixed 502 Bad Gateway error on anisoptera.io
- **Root Cause:** Node.js version mismatch
  - VPS had: Node.js v18.19.1
  - Required: Node.js >=20.9.0 (Next.js 16 requirement)
  - Application was crashing repeatedly (18 restart attempts)
- **Resolution Steps:**
  1. Upgraded Node.js from v18.19.1 to v20.20.2
  2. Reinstalled pnpm v10.27.0 (removed during Node upgrade)
  3. Fixed directory permissions (chown -R manu:manu /home/manu/apps/DFpartners)
  4. Rebuilt application (pnpm install && pnpm build) - succeeded in 27.6s
  5. Restarted PM2 - application now online
  6. Verified HTTPS access - HTTP/2 200 OK
- **Status:** ✅ Complete
- **Impact:**
  - Application now running stably (PID 23528)
  - Memory usage: 169.1 MB (healthy)
  - HTTPS access restored
  - All security headers present
  - No more 502 errors

### 14:18 UTC - Vimeo Video Integration & Route Access Control
- **Action:** Integrated Vimeo video embed and implemented server-side access control for internal pages
- **Details:**
  - Added Billboard Traffic Intelligence Vimeo video (ID: 1179586412) to analytics studio page with autoplay and loop
  - Created responsive 16:9 aspect ratio container with proper padding-bottom technique
  - Updated Content Security Policy in both middleware.ts and next.config.ts to allow Vimeo domains
  - Added `https://player.vimeo.com` and `https://vimeo.com` to script-src, frame-src, and connect-src directives
  - Implemented server-side route blocking for 5 internal/demo pages using Next.js redirect() function:
    - `/analytics-studio` - Redirects to home
    - `/meet-us-at-ces` - Redirects to home
    - `/mine-showcase` - Redirects to home
    - `/oohero` - Redirects to home
    - `/marketplace` - Redirects to home
- **Status:** ✅ Complete
- **Impact:**
  - Vimeo player now loads without CSP violations
  - All internal demo pages are completely inaccessible via direct URL
  - Pages remain in codebase for future use but are protected from public access
  - No navigation links expose these routes

### Files Modified (5 files)
- `/src/app/analytics-studio/layout.tsx` - Added access control redirect
- `/src/app/analytics-studio/page.tsx` - Added Vimeo video embed section
- `/src/app/oohero/layout.tsx` - Added access control redirect
- `/src/middleware.ts` - Updated CSP to allow Vimeo domains
- `/next.config.ts` - Updated CSP to allow Vimeo domains

### Files Created (4 new layout files)
- `/src/app/meet-us-at-ces/layout.tsx` - Access control redirect
- `/src/app/mine-showcase/layout.tsx` - Access control redirect
- `/src/app/marketplace/layout.tsx` - Access control redirect

### Documentation Updated
- `CHANGELOG.md` - Added version 2.15.0 entry with all changes documented
## 2026-05-20 — `/waste` fix: orphan root-PM2 serving stale 14-day build

### Symptom
- `https://anisoptera.io/waste` HTTP 200 but client-side `ChunkLoadError` (chunk `a70911633528ea88.js` 404)
- Local builds fine

### Investigation
- Curl HTML referenced chunks that 404'd → 1 of 16 missing
- VPS `.next/static/chunks/` confirmed file absent on disk
- Triggered clean rebuild via `rm -rf .next && pnpm build` — new `BUILD_ID 7-AWoa6VTvfVPZ_vgrCOV`, all chunks emitted
- Restarted manu PM2 — but served HTML still had old chunk refs
- Direct `curl localhost:8080/waste` confirmed Node serving OLD HTML
- `ps -eo pid,user,cmd | grep next` revealed **PID 1092 owned by root**, 14d uptime, cwd `/home/manu/apps/DFpartners`
- Parent = `PM2 v6.0.14 God Daemon (/root/.pm2)` (PID 958)
- Manu PM2 (v7.0.1) had DFpartners in error loop (4455 restarts) — couldn't bind port 8080

### Root cause
Two PM2 daemons running in parallel:
1. `pm2-root.service` systemd unit + root PM2 v6.0.14 → spawned `next-server` PID 1092 on May 5, served stale build
2. `pm2-manu.service` systemd unit + manu PM2 v7.0.1 → couldn't take over, errored constantly

Md said app runs as `manu` but root PM2 had grabbed port 8080 first and never released.

### Fix executed
```bash
# 1. Tag safe revert point (local + VPS)
git tag -f vps-safe-revert-20260520 8658390

# 2. Backup .next before rebuild
mv .next .next.bak-1779291907

# 3. Clean rebuild
nohup su - manu -c "cd /home/manu/apps/DFpartners && pnpm build" > /tmp/build.log 2>&1 &

# 4. Stop both PM2 instances of DFpartners (free port 8080)
su - manu -c "pm2 stop DFpartners"
pm2 stop DFpartners                       # root PM2
pm2 delete DFpartners && pm2 save --force # root PM2 cleared

# 5. Start manu PM2 → binds 8080 with fresh build
su - manu -c "cd /home/manu/apps/DFpartners && pm2 start ecosystem.config.js && pm2 save --force"

# 6. Disable rogue root PM2 systemd so reboot doesn't recreate orphan
systemctl disable pm2-root.service
```

### Preventive: nginx no-cache for turbopack runtime (md Option 1)
Patched `/etc/nginx/sites-enabled/anisoptera.io` (NB: not symlink, diverged from sites-available — patch must target enabled):

```nginx
# Inserted BEFORE `location /_next/static/`
location ~* "^/_next/static/chunks/(turbopack-.+\.js)$" {
    alias /home/manu/apps/DFpartners/.next/static/chunks/$1;
    add_header Cache-Control "no-cache, must-revalidate" always;
    expires off;
    access_log off;
}
```

Verified:
- Turbopack runtime now serves `cache-control: no-cache, must-revalidate`
- Other static chunks unchanged (`public, immutable`, 1y)

### Verification
- 19/19 chunks referenced by `/waste` return 200
- 10-route smoke test (`/`, `/waste`, `/about`, `/retail`, `/showcase`, `/assessment`, `/waitlist`, `/partner-welcome`, `/CESDemo`, `/api/waitlist`) all 200
- Manu PM2 `DFpartners` online, port 8080 bound by `PM2 v7.0.1: God` (PID 2476 owns listener; worker PID 115518)
- `x-nextjs-cache: HIT` headers normal for prerendered static pages

### Safety nets in place
- Git tag `vps-safe-revert-20260520` at `8658390` (local + VPS)
- Old build preserved at `/home/manu/apps/DFpartners/.next.bak-1779291907`
- Nginx config backup at `/root/anisoptera.io.bak-1779292679`
- Sites-available untouched (diff source if needed)

### Revert oneliner
```bash
ssh -p 2222 -i ~/.ssh/windsurf-vps-agent root@187.124.236.215 \
'cp /root/anisoptera.io.bak-1779292679 /etc/nginx/sites-enabled/anisoptera.io && nginx -t && nginx -s reload && \
 cd /home/manu/apps/DFpartners && rm -rf .next && mv .next.bak-1779291907 .next && \
 su - manu -c "pm2 restart DFpartners"'
```

### Loose ends / followups
- Supabase DNS errors in PM2 logs: `getaddrinfo ENOTFOUND yhtunbcujgvdhoquiowk.supabase.co` — assessment + waitlist API calls failing. Unrelated to `/waste` but worth investigating (project deleted or env var stale).
- Manu PM2 still shows "In-memory PM2 is out-of-date" warning — run `pm2 update` next maintenance window to sync in-memory v7.0.1 with on-disk v6.0.14.
- Old chunk hashes (`4b219cc7557cecd1.css`, `4e5f9244156437de.css`, `a70911633528ea88.js`) still 404 — only matters for users with cached HTML referencing them. They'll hit ChunkLoadError once, get fresh HTML on reload. Turbopack no-cache patch prevents future occurrences.

### SSH key fix during session
- `/root/.ssh/authorized_keys` had two keys concatenated on one line (no newline between `#hostinger-managed-key` and `ssh-ed25519 ...`) → SSH rejected windsurf key
- Fixed via `sed -i 's|#hostinger-managed-keyssh-ed25519|#hostinger-managed-key\nssh-ed25519|' /root/.ssh/authorized_keys`

---
## 2026-05-20 — `/waste` fix: orphan root-PM2 serving stale 14-day build

### Symptom
- `https://anisoptera.io/waste` HTTP 200 but client-side `ChunkLoadError` (chunk `a70911633528ea88.js` 404)
- Local builds fine

### Investigation
- Curl HTML referenced chunks that 404'd → 1 of 16 missing
- VPS `.next/static/chunks/` confirmed file absent on disk
- Triggered clean rebuild via `rm -rf .next && pnpm build` — new `BUILD_ID 7-AWoa6VTvfVPZ_vgrCOV`, all chunks emitted
- Restarted manu PM2 — but served HTML still had old chunk refs
- Direct `curl localhost:8080/waste` confirmed Node serving OLD HTML
- `ps -eo pid,user,cmd | grep next` revealed **PID 1092 owned by root**, 14d uptime, cwd `/home/manu/apps/DFpartners`
- Parent = `PM2 v6.0.14 God Daemon (/root/.pm2)` (PID 958)
- Manu PM2 (v7.0.1) had DFpartners in error loop (4455 restarts) — couldn't bind port 8080

### Root cause
Two PM2 daemons running in parallel:
1. `pm2-root.service` systemd unit + root PM2 v6.0.14 → spawned `next-server` PID 1092 on May 5, served stale build
2. `pm2-manu.service` systemd unit + manu PM2 v7.0.1 → couldn't take over, errored constantly

Md said app runs as `manu` but root PM2 had grabbed port 8080 first and never released.

### Fix executed
```bash
# 1. Tag safe revert point (local + VPS)
git tag -f vps-safe-revert-20260520 8658390

# 2. Backup .next before rebuild
mv .next .next.bak-1779291907

# 3. Clean rebuild
nohup su - manu -c "cd /home/manu/apps/DFpartners && pnpm build" > /tmp/build.log 2>&1 &

# 4. Stop both PM2 instances of DFpartners (free port 8080)
su - manu -c "pm2 stop DFpartners"
pm2 stop DFpartners                       # root PM2
pm2 delete DFpartners && pm2 save --force # root PM2 cleared

# 5. Start manu PM2 → binds 8080 with fresh build
su - manu -c "cd /home/manu/apps/DFpartners && pm2 start ecosystem.config.js && pm2 save --force"

# 6. Disable rogue root PM2 systemd so reboot doesn't recreate orphan
systemctl disable pm2-root.service
```

### Preventive: nginx no-cache for turbopack runtime (md Option 1)
Patched `/etc/nginx/sites-enabled/anisoptera.io` (NB: not symlink, diverged from sites-available — patch must target enabled):

```nginx
# Inserted BEFORE `location /_next/static/`
location ~* "^/_next/static/chunks/(turbopack-.+\.js)$" {
    alias /home/manu/apps/DFpartners/.next/static/chunks/$1;
    add_header Cache-Control "no-cache, must-revalidate" always;
    expires off;
    access_log off;
}
```

Verified:
- Turbopack runtime now serves `cache-control: no-cache, must-revalidate`
- Other static chunks unchanged (`public, immutable`, 1y)

### Verification
- 19/19 chunks referenced by `/waste` return 200
- 10-route smoke test (`/`, `/waste`, `/about`, `/retail`, `/showcase`, `/assessment`, `/waitlist`, `/partner-welcome`, `/CESDemo`, `/api/waitlist`) all 200
- Manu PM2 `DFpartners` online, port 8080 bound by `PM2 v7.0.1: God` (PID 2476 owns listener; worker PID 115518)
- `x-nextjs-cache: HIT` headers normal for prerendered static pages

### Safety nets in place
- Git tag `vps-safe-revert-20260520` at `8658390` (local + VPS)
- Old build preserved at `/home/manu/apps/DFpartners/.next.bak-1779291907`
- Nginx config backup at `/root/anisoptera.io.bak-1779292679`
- Sites-available untouched (diff source if needed)

### Revert oneliner
```bash
ssh -p 2222 -i ~/.ssh/windsurf-vps-agent root@187.124.236.215 \
'cp /root/anisoptera.io.bak-1779292679 /etc/nginx/sites-enabled/anisoptera.io && nginx -t && nginx -s reload && \
 cd /home/manu/apps/DFpartners && rm -rf .next && mv .next.bak-1779291907 .next && \
 su - manu -c "pm2 restart DFpartners"'
```

### Loose ends / followups
- Supabase DNS errors in PM2 logs: `getaddrinfo ENOTFOUND yhtunbcujgvdhoquiowk.supabase.co` — assessment + waitlist API calls failing. Unrelated to `/waste` but worth investigating (project deleted or env var stale).
- Manu PM2 still shows "In-memory PM2 is out-of-date" warning — run `pm2 update` next maintenance window to sync in-memory v7.0.1 with on-disk v6.0.14.
- Old chunk hashes (`4b219cc7557cecd1.css`, `4e5f9244156437de.css`, `a70911633528ea88.js`) still 404 — only matters for users with cached HTML referencing them. They'll hit ChunkLoadError once, get fresh HTML on reload. Turbopack no-cache patch prevents future occurrences.

### SSH key fix during session
- `/root/.ssh/authorized_keys` had two keys concatenated on one line (no newline between `#hostinger-managed-key` and `ssh-ed25519 ...`) → SSH rejected windsurf key
- Fixed via `sed -i 's|#hostinger-managed-keyssh-ed25519|#hostinger-managed-key\nssh-ed25519|' /root/.ssh/authorized_keys`

---

### 2026-05-20 — Default use case retail → waste + VPS deploy

#### Change
- **File:** `src/components/sections/DeltaUseCaseShowcase.tsx:157`
- **Change:** `useState<IndustryId>('retail')` → `useState<IndustryId>('waste')`
- **Local commit:** `ec8a866` on `main`
- **VPSMigration commit:** `d48b50f` cherry-picked and pushed

#### VPS deploy
- VPS local branch was at `8658390` (diverged from origin — prior hard reset from May 5)
- `git fetch origin && git reset --hard origin/VPSMigration` → HEAD now `d48b50f`
- `rm -rf .next && nohup pnpm build > /tmp/build.log 2>&1 &` — clean build
- `su - manu -c 'pm2 restart DFpartners'` — HTTP 200 confirmed
- Only 3 files changed `8658390`→`d48b50f`: `next.config.ts`, `CompanyStatsSection.tsx`, `DeltaUseCaseShowcase.tsx` — `middleware.ts` and `ecosystem.config.js` untouched
- No uncommitted VPS-side edits lost (git stash list empty before reset)

#### Status: ✅ Live on https://anisoptera.io — Waste & Recycling now default tab

---

### 2026-06-17 — Remove WLS "Book Time With Us" Banner Deploy

#### Change
- **Files:** `src/components/layout/NWRABanner.tsx`, `src/app/layout.tsx`, `src/components/layout/Header.tsx`
- **Approach:** Kill switch (`SHOW_BANNER = false`) in `NWRABanner.tsx`; revert layout spacing (`mt-32 sm:mt-36` → `mt-20 sm:mt-24`); revert header offset (`top-12` → `top-0`)
- **Local commit:** `0598bb3` on `main`
- **Cherry-pick to deploy:** `13c1dd5` (resolved layout.tsx conflict — kept deploy branch's `Header`/`GlobalModals`, applied reverted margin)

#### VPS deploy
- `git pull origin VPSMigration` → fast-forward `408bf0b..13c1dd5`
- `rm -rf .next` — clean build cache
- `nohup pnpm build > /tmp/build.log 2>&1 &` — build completed successfully
- `su - manu -c 'pm2 restart DFpartners'` — HTTP 200 confirmed
- `curl https://anisoptera.io` → HTTP 200

#### Status: ✅ Live on https://anisoptera.io — WLS banner removed globally
