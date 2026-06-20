# VPS Testing Prompt for Agent — Phase 1: Decimal Point Only

## Objective
Verify the decimal point renders correctly in the About page stats (`$1.5M` not `$15M`).

## Test

**Action:** 
1. Open incognito window
2. Navigate to `https://anisoptera.io/about`
3. Scroll to "Company Stats" section
4. Check the first stat value

**Verify:**
- [ ] Stat displays: `+$1.5M` (decimal point present)
- [ ] NOT: `+$15M` (decimal point missing)

## Expected Result

**Current VPS Commit:** `8658390`

| Check | Expected | Result |
|---|---|---|
| Decimal point | `$1.5M` | ✅ or ❌ |

## Report

```
DECIMAL POINT TEST
Commit: [from VPS]
Result: ✅ Shows $1.5M OR ❌ Shows $15M
```

---

## Phase 2 (Later)
- Chunk errors
- Console errors
- Navigation
- Performance
- Mobile
