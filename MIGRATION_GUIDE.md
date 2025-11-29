# Migration Guide - Property Filtering System v7.0

This guide helps you migrate from the old monolithic filtering system (v6.0) to the new modular architecture (v7.0).

---

## 📋 Pre-Migration Checklist

- [ ] Backup current `properties/page.tsx`
- [ ] Review MISSION_REPORT.md for architecture changes
- [ ] Ensure all dependencies are installed
- [ ] Test in development environment first
- [ ] Notify users of potential downtime (optional, zero-downtime possible)

---

## 🔧 Step-by-Step Migration

### Step 1: Backup Current Implementation

```bash
cd client/src/app/(nondashboard)/properties
cp page.tsx page-backup-v6.0.tsx
echo "✅ Backup created: page-backup-v6.0.tsx"
```

### Step 2: Verify New Components Exist

Check that all new files were created:

```bash
# Check hook
ls -la ../../hooks/useSearchFilters.ts

# Check components
ls -la ../../components/search/HeroSearch.tsx
ls -la ../../components/search/SearchSidebar.tsx
ls -la ../../components/search/MobileFilterSheet.tsx
ls -la ../../components/search/ActiveFiltersBar.tsx

# If all files exist, you'll see output for each
```

**Expected output:**
```
-rw-r--r-- 1 user user  8432 Jan 15 10:30 useSearchFilters.ts
-rw-r--r-- 1 user user  5678 Jan 15 10:31 HeroSearch.tsx
-rw-r--r-- 1 user user 12456 Jan 15 10:32 SearchSidebar.tsx
-rw-r--r-- 1 user user  9234 Jan 15 10:33 MobileFilterSheet.tsx
-rw-r--r-- 1 user user  3456 Jan 15 10:34 ActiveFiltersBar.tsx
```

### Step 3: Replace Main Page Component

```bash
cd client/src/app/(nondashboard)/properties
cp page-new.tsx page.tsx
echo "✅ Main page replaced with v7.0"
```

### Step 4: Install Missing Dependencies (if any)

The new architecture uses these existing dependencies:
- `framer-motion` (already installed)
- `lucide-react` (already installed)
- `@radix-ui/*` (already installed via shadcn/ui)

**No new dependencies required!** ✅

### Step 5: Verify TypeScript Compilation

```bash
cd client
npm run build

# Expected: No TypeScript errors related to new components
# If you see errors, check the output below
```

**Common TypeScript errors and fixes:**

**Error 1:** `Cannot find module '@/hooks/useSearchFilters'`
```bash
# Fix: Verify the file exists and path is correct
ls -la src/hooks/useSearchFilters.ts
```

**Error 2:** `Type 'FilterState' is not assignable...`
```bash
# Fix: Regenerate Prisma types
cd ../server
npm run prisma:generate
cd ../client
```

**Error 3:** `Property 'communeIds' does not exist on type 'SearchFilters'`
```bash
# Fix: Update types/property-frontend.ts
# Add: communeIds: string[] to SearchFilters interface
```

### Step 6: Test in Development

```bash
cd client
npm run dev

# Open http://localhost:3000/properties in browser
```

**Test Checklist:**

- [ ] Page loads without errors
- [ ] Hero section displays (~250px height)
- [ ] Desktop sidebar is sticky (scroll to verify)
- [ ] Mobile bottom sheet opens (resize browser to <768px)
- [ ] Wilaya dropdown works
- [ ] Transaction toggle works (Acheter/Louer)
- [ ] Property type pills work
- [ ] Budget slider updates URL
- [ ] Active filters bar shows chips
- [ ] Chip removal works
- [ ] "Tout effacer" clears all filters
- [ ] Browser back/forward works
- [ ] Refresh preserves filters
- [ ] Property cards render correctly

### Step 7: Test URL Sharing

Copy URL with filters:
```
http://localhost:3000/properties?transaction=SALE&wilayaId=16&minPrice=3000000&maxPrice=6000000&propertyTypes=APARTMENT_F3,APARTMENT_F4
```

Paste in new browser tab → Verify filters are applied ✅

### Step 8: Mobile Testing

**Option A: Browser DevTools**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Test bottom sheet functionality

**Option B: Real Device**
1. Find local IP: `ifconfig | grep inet` (Linux/Mac) or `ipconfig` (Windows)
2. Open `http://YOUR_IP:3000/properties` on phone
3. Test bottom sheet with real swipe gestures

**Mobile Test Checklist:**

- [ ] Hero is compact (~200px)
- [ ] "Filtres (X)" button shows badge if filters active
- [ ] Bottom sheet opens on tap
- [ ] Swipe down closes sheet
- [ ] All filters are accessible
- [ ] "Voir les résultats" button is sticky
- [ ] Results update after closing sheet

### Step 9: Performance Testing

**Option A: Lighthouse (Chrome DevTools)**
1. Open DevTools → Lighthouse tab
2. Select "Performance" + "Desktop"
3. Click "Analyze page load"

**Target Metrics:**
- Performance score: ≥ 90
- Time to Interactive: < 3s
- Total Blocking Time: < 200ms

**Option B: React DevTools Profiler**
1. Install React DevTools extension
2. Open Profiler tab
3. Start recording
4. Change filters (wilaya, budget, etc.)
5. Stop recording
6. Verify: No excessive re-renders (should be 1-2 per filter change)

### Step 10: Rollback Plan (if needed)

If you encounter critical issues:

```bash
cd client/src/app/(nondashboard)/properties

# Restore backup
cp page-backup-v6.0.tsx page.tsx

# Restart dev server
npm run dev

echo "✅ Rolled back to v6.0"
```

---

## 🔍 Troubleshooting

### Issue 1: "useSearchParams is not defined"

**Cause:** Missing Next.js import  
**Fix:** Add to imports in useSearchFilters.ts:
```typescript
import { useSearchParams, useRouter } from 'next/navigation'
```

---

### Issue 2: Sidebar not sticky

**Cause:** CSS specificity issue  
**Fix:** Verify in SearchSidebar.tsx:
```tsx
<aside className="sticky top-20 ...">
```

Check that `top-20` is correct (navbar height + 20px)

---

### Issue 3: URL params not updating

**Cause:** `router.push` not called  
**Fix:** Verify in useSearchFilters.ts:
```typescript
router.push(`/properties?${queryString}`, { scroll: false })
```

Check browser Network tab → No redirect = not calling router.push

---

### Issue 4: Filters not triggering API call

**Cause:** `useEffect` dependency missing  
**Fix:** Verify in page.tsx:
```typescript
useEffect(() => {
  triggerSearch(searchParams)
}, [filters, triggerSearch]) // Must include 'filters'
```

---

### Issue 5: Mobile sheet not opening

**Cause:** Sheet component not imported correctly  
**Fix:** Verify import path:
```typescript
import { Sheet, SheetContent, ... } from '@/components/ui/sheet'
```

Check that `components/ui/sheet.tsx` exists (should be from shadcn/ui)

---

### Issue 6: Commune dropdown empty

**Cause:** API call skipped  
**Fix:** Verify in SearchSidebar.tsx:
```typescript
const { data: communesData } = useGetCommunesByWilayaQuery(
  { wilayaId: filters.wilayaId },
  { skip: !filters.wilayaId } // Only fetch if wilaya selected
)
```

Check browser Network tab → Should see API call to `/api/communes?wilayaId=XX`

---

### Issue 7: TypeScript error "Property 'communeIds' does not exist"

**Cause:** Old SearchFilters type doesn't have `communeIds: string[]`  
**Fix:** Update `types/property-frontend.ts`:
```typescript
export interface SearchFilters {
  // ... existing fields
  communeIds: string[] // ADD THIS LINE
}
```

---

### Issue 8: Active filters bar not showing

**Cause:** `activeFiltersCount` is 0  
**Fix:** Verify in useSearchFilters.ts:
```typescript
const activeFiltersCount = useMemo(() => {
  let count = 0
  if (filters.transaction) count++
  if (filters.wilayaId) count++
  // ... count all non-empty filters
  return count
}, [filters])
```

Debug: Add `console.log('Active filters:', activeFiltersCount)` in ActiveFiltersBar.tsx

---

## 🧪 Automated Testing (Optional)

### Unit Tests (Jest + React Testing Library)

Create `__tests__/useSearchFilters.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react'
import { useSearchFilters } from '@/hooks/useSearchFilters'

describe('useSearchFilters', () => {
  it('should update wilaya filter', () => {
    const { result } = renderHook(() => useSearchFilters())
    
    act(() => {
      result.current.updateFilter('wilayaId', '16')
    })
    
    expect(result.current.filters.wilayaId).toBe('16')
  })
  
  it('should clear incompatible filters on property type change', () => {
    const { result } = renderHook(() => useSearchFilters())
    
    // Set apartment filters
    act(() => {
      result.current.updateFilters({
        propertyTypes: ['APARTMENT_F3'],
        minRooms: 3,
        minBedrooms: 2,
      })
    })
    
    // Switch to terrain (should clear rooms/bedrooms)
    act(() => {
      result.current.updateFilter('propertyTypes', ['TERRAIN'])
    })
    
    expect(result.current.filters.minRooms).toBeUndefined()
    expect(result.current.filters.minBedrooms).toBeUndefined()
  })
})
```

Run tests:
```bash
npm run test
```

---

### E2E Tests (Playwright)

Create `e2e/properties-filters.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test('should filter properties by wilaya', async ({ page }) => {
  await page.goto('http://localhost:3000/properties')
  
  // Select wilaya
  await page.click('[data-testid="wilaya-select"]')
  await page.click('text=16 - Alger')
  
  // Verify URL updated
  await expect(page).toHaveURL(/wilayaId=16/)
  
  // Verify active filter chip appears
  await expect(page.locator('text=Wilaya: 16 - Alger')).toBeVisible()
})

test('should open mobile filter sheet', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE
  await page.goto('http://localhost:3000/properties')
  
  // Click filter button
  await page.click('text=Filtres')
  
  // Verify sheet is open
  await expect(page.locator('[role="dialog"]')).toBeVisible()
  
  // Verify can select transaction
  await page.click('text=Louer')
  
  // Close sheet
  await page.click('text=Voir les résultats')
  
  // Verify URL updated
  await expect(page).toHaveURL(/transaction=RENT/)
})
```

Run tests:
```bash
npx playwright test
```

---

## 📊 Post-Migration Validation

After deploying to production, monitor these metrics:

### Analytics (Google Analytics / Mixpanel)

**Track:**
- Bounce rate on /properties page (target: < 30%)
- Time on page (target: > 2 minutes)
- Scroll depth (target: > 50% see results)
- Filter usage (which filters are most used?)
- Conversion funnel: Search → Detail → Contact (target: > 5%)

**Event tracking examples:**
```typescript
// In useSearchFilters.ts
const updateFilter = useCallback((key, value) => {
  // ... existing code
  
  // Track filter usage
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'filter_change', {
      filter_name: key,
      filter_value: value,
    })
  }
}, [filters, router])
```

---

### Performance (Vercel Analytics / New Relic)

**Monitor:**
- Page load time (target: < 2s)
- Time to Interactive (target: < 3s)
- API response time (target: < 500ms)
- Error rate (target: < 1%)

**Alerts:**
- If error rate > 5%: Investigate immediately
- If page load > 4s: Check bundle size, API latency
- If API timeout > 2%: Investigate backend bottleneck

---

### User Feedback (Hotjar / UserTesting)

**Collect:**
- Heatmaps (where do users click?)
- Session recordings (how do users interact with filters?)
- Surveys ("How easy was it to find properties?" 1-5 scale)

**Target NPS (Net Promoter Score):** > 50

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All tests pass (unit + E2E)
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] Performance score ≥ 90 (Lighthouse)
- [ ] Accessibility score ≥ 90 (Lighthouse)
- [ ] Mobile tested on real device
- [ ] URL sharing tested
- [ ] Browser back/forward tested
- [ ] Edge cases tested (no filters, all filters, etc.)

### Deployment

```bash
# Build production bundle
cd client
npm run build

# Expected output: No errors, bundle size < 500KB

# Deploy to Vercel (or your platform)
vercel --prod

# Or if using custom deployment:
# npm run export && rsync -avz out/ user@server:/var/www/rentalg/
```

### Post-Deployment

- [ ] Smoke test on production URL
- [ ] Monitor error tracking (Sentry/Bugsnag)
- [ ] Monitor analytics (first 24 hours)
- [ ] Check server logs for API errors
- [ ] Verify CDN cache is working (images, JS, CSS)

---

## 📞 Support

If you encounter issues during migration:

1. **Check MISSION_REPORT.md** - Known issues section
2. **Search this guide** - Use Ctrl+F to search troubleshooting
3. **Review git diff** - Compare old vs new code:
   ```bash
   git diff page-backup-v6.0.tsx page.tsx
   ```
4. **Check browser console** - Look for error messages
5. **Check Network tab** - Verify API calls are working

---

## 🎉 Success Indicators

You've successfully migrated when:

✅ Page loads without errors  
✅ All filters work correctly  
✅ URL params update on filter change  
✅ Browser back/forward works  
✅ Mobile bottom sheet works  
✅ Desktop sidebar is sticky  
✅ Active filters bar shows chips  
✅ Performance score ≥ 90  
✅ No regressions in existing features  
✅ Users report improved UX (if feedback available)  

**Congratulations! You're now running RentAlg Filtering System v7.0 🚀**

---

**Last Updated:** 2024  
**Version:** 1.0  
**Author:** AI Agent (GitHub Copilot)
