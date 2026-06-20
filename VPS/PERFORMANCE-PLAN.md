# anisoptera.io Performance Optimization Plan

**Diagnosed:** 2026-04-20  
**Baseline TCP Connect (external):** 75s  
**Baseline Ping RTT:** 102ms  
**VPS Self-Connect:** 51ms  

---

## Findings Summary

### Root Cause #1 — TCP SYN Delay (CRITICAL)
**Measured:** `time_connect: 75.108s` vs `ping: 102ms`  
**Diagnosis:** VPS provider (Mexico) is rate-limiting new TCP SYN packets from unknown external IPs at the network edge. ICMP passes freely; new TCP connections are queued/dropped until macOS's ~75s retry threshold forces a successful connection.  
**Evidence:** 0% packet loss on ping, clean iptables/nftables/UFW chains, conntrack table only 42/65536 used. The delay is not reproducible from within the VPS (51ms self-connect).

### Root Cause #2 — Active Bot Attack (HIGH)
**Measured:** IP `18.223.149.168` hammering 20+ req/s with PHP probe scans (`/phpinfo.php`, `/.env`, etc.)  
**Effect:** Saturated single Nginx worker connection slots, consumed the `tcp_max_syn_backlog=256` queue, caused legitimate SYN drops.  
**Status:** ✅ Blocked via `iptables -I INPUT -s 18.223.149.168 -j DROP`

### Root Cause #3 — Nginx Not Compressing JS/CSS (HIGH)
**Measured:** 427KB + 268KB + 219KB JS chunks served uncompressed  
**Diagnosis:** `gzip_types` was not configured in `nginx.conf` — gzip was `on` but with no MIME types defined, so no compression was applied to JS, CSS, or JSON.  
**Status:** ✅ Fixed — gzip now enabled for text/css, application/javascript, application/json, etc.

### Root Cause #4 — Low TCP Backlog (MEDIUM)
**Measured:** `tcp_max_syn_backlog=256` with bot generating 20+ req/s  
**Effect:** Queue filled in ~12 seconds, causing SYN drops for legitimate users  
**Status:** ✅ Fixed — increased to 65536

### Additional Issues Found
- `worker_connections` was 768 (now 4096)
- No `multi_accept` or `epoll` (now enabled)
- `ssl_protocols` included deprecated TLSv1/1.1 (now removed from main config)
- No `limit_conn` per-IP connection cap (now set: 20 per IP)
- Application bundles: Recharts (630KB unminified) loaded on ALL pages, not just analytics
- Framer Motion (678KB unminified) loaded on ALL pages

---

## Optimization Phases

### Phase 1 — DONE (Server Hardening)
All applied on 2026-04-20:

| Fix | Before | After |
|-----|--------|-------|
| Bot IP blocked | 20+ req/s probe attack | ✅ Blocked |
| `tcp_max_syn_backlog` | 256 | 65536 |
| `net.core.somaxconn` | 4096 | 65536 |
| Nginx `worker_connections` | 768 | 4096 |
| Nginx `multi_accept` | off | on |
| Nginx `gzip_types` | none | JS, CSS, JSON, SVG, XML |
| Nginx `limit_conn` | none | 20 per IP |
| `ssl_protocols` | TLSv1/1.1/1.2/1.3 | TLSv1.2/TLSv1.3 only |

---

### Phase 2 — Cloudflare (HIGHEST IMPACT, ~1 hour effort)

**Expected impact:** TCP connect 75s → <50ms for all users worldwide

**Steps:**
1. Sign up for Cloudflare free tier at cloudflare.com
2. Add domain `anisoptera.io` to Cloudflare
3. Update nameservers at domain registrar to Cloudflare's NS
4. In Cloudflare dashboard:
   - Set SSL/TLS mode to **Full (Strict)**
   - Enable **Auto Minify** for JS, CSS, HTML
   - Enable **Brotli compression**
   - Enable **HTTP/3 (QUIC)**
   - Cache level: **Standard**
   - Browser Cache TTL: **4 hours**
5. Add page rules or cache rules to cache `/_next/static/*` for 1 year (immutable)
6. Enable **Bot Fight Mode** (free) to replace the iptables block long-term
7. Update Nginx site config to only accept connections from Cloudflare IP ranges (optional hardening)

**Why this fixes the 75s issue:**  
Users connect to Cloudflare's edge node (nearest to them — likely <10ms in Mexico, <30ms in North America). Cloudflare maintains a persistent, pre-warmed connection to the VPS. Users never experience the VPS provider's SYN rate limiting.

---

### Phase 3 — Application Bundle Optimization (MEDIUM, ~4 hours effort)

**Problem:** Recharts and Framer Motion are loaded on the home page even though they're only used in analytics/assessment pages.

**Current production bundle breakdown (VPS):**
```
f18b4e279c47566f.js   427 KB  (likely Recharts + dependencies)
443642aae915f3cd.js   268 KB  (likely Framer Motion)
d9708e21a9271735.js   219 KB  (Next.js runtime + React)
c101305364939133.js   116 KB  (app code chunk)
2a38210570c625a1.js   115 KB  (app code chunk)
4e5f9244156437de.css  125 KB  (Tailwind CSS)
Total static:         2.7 MB  (uncompressed)
```

**Fix 1: Lazy load Recharts**
Recharts is only used in the analytics-studio page. Wrap with `dynamic()`:
```tsx
// In any component using Recharts
const BarChart = dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false });
```

**Fix 2: Lazy load heavy modal components**
Assessment wizard (25+ questions) loads upfront. Use `dynamic()`:
```tsx
const AssessmentWizard = dynamic(() => import('@/components/AssessmentWizard'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
```

**Fix 3: Audit Framer Motion usage**
Replace simple animations with CSS transitions where possible. For complex animations, use the lighter `motion` import:
```tsx
// Instead of full framer-motion, use the lighter version
import { motion } from 'motion/react'; // lighter alternative
```

**Estimated savings after optimization:**
- Recharts removed from homepage: ~300KB JS removed from initial load
- Lazy modals: ~150KB deferred
- Net result: Initial JS payload drops from ~1.3MB → ~850KB (gzipped: ~250KB)

---

### Phase 4 — Persistent Bot Protection (LOW, ~30 min)

Current iptables block will reset on reboot. Make it permanent:

```bash
# Install iptables-persistent
apt install iptables-persistent
netfilter-persistent save
```

Also add fail2ban HTTP scanning jail:
```bash
# /etc/fail2ban/jail.d/nginx-scanners.conf
[nginx-scan-block]
enabled = true
port = http,https
filter = nginx-scan-block
logpath = /var/log/nginx/access.log
maxretry = 5
findtime = 60
bantime = 86400
```

---

## Expected Performance After All Phases

| Metric | Before | After Phase 1 | After Phase 2 | After Phase 3 |
|--------|--------|----------------|----------------|----------------|
| TCP Connect | 75s | ~75s | **<50ms** | <50ms |
| TTFB | 75.3s | ~75s | **<200ms** | <200ms |
| Initial JS payload | 1.3MB | 1.3MB | 1.3MB (cached) | **~850KB** |
| Gzip JS size | ~1.3MB | **~400KB** | ~400KB | **~250KB** |
| Bot protection | none | iptables block | **Cloudflare WAF** | Cloudflare WAF |
| CDN | none | none | **Global edge** | Global edge |

---

## Quick Reference — Monitoring

```bash
# Check Nginx error log for new bot attacks
ssh vps-dragonfly "tail -f /var/log/nginx/error.log | grep limiting"

# Check PM2 memory
ssh vps-dragonfly "pm2 status"

# Test gzip on a chunk
curl -sI -H "Accept-Encoding: gzip" https://anisoptera.io/_next/static/chunks/443642aae915f3cd.js | grep content-encoding

# Test connect time
curl -w "connect: %{time_connect}s | total: %{time_total}s\n" -o /dev/null -s https://anisoptera.io
```
