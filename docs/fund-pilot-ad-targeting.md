# Fund Pilot — Ad Targeting & SEO Keywords

**Client:** Tracy / Fund Pilot, LLC  
**Site:** https://myfundpilot.com  
**Funnel:** https://getfundpilot.com (Perspective)  
**Status:** Queued for Friday Meta Business Manager launch track  
**Last updated:** 2026-08-22

---

## Tracy's Keyword List (folded in)

| Keyword | Site metadata | Ad targeting | Notes |
|---------|---------------|--------------|-------|
| SBA | ✅ title, description, H1 | Primary interest | Already in live `<title>` |
| small business loan | ✅ title | Primary interest | "Small Business Loan Navigators" |
| SBA 7(a) | ✅ title, hero, schema | Primary interest | Core product positioning |
| franchises | ⏳ add to meta keywords | Interest / audience | Franchise acquisition buyers |
| working capital | ⏳ add to meta description | Interest / audience | Cash-flow use case |
| business acquisition financing | ⏳ add to meta description | Interest / audience | M&A / buyout angle |
| entrepreneur | ⏳ add to meta keywords | Interest / audience | Broad founder audience |
| financing | ✅ description (partial) | Broad match | Reinforce in OG/Twitter desc |

---

## Site Metadata Pass (myfundpilot.com)

**Current live metadata** (verified 2026-08-22):

- **Title:** `Fund Pilot | SBA 7(a) Small Business Loan Navigators`
- **Description:** Mentions SBA 7(a), small business borrowers, government guaranteed financing, $350K–$5M range
- **Missing:** explicit `<meta name="keywords">` tag; franchises, working capital, business acquisition financing, entrepreneur

**Proposed additions** (apply in Fund Pilot Astro repo when available):

```html
<meta name="keywords" content="SBA, small business loan, SBA 7(a), franchises, working capital, business acquisition financing, entrepreneur, financing, SBA lending, government guaranteed loans">
```

**Description expansion** (keep under ~160 chars for SERP):

> Fund Pilot connects entrepreneurs and small business owners — including franchise buyers — with SBA 7(a) financing for working capital, acquisitions, and growth. Loans from $350K to $5M.

---

## Meta Ads — Audience & Interest Targeting

### Core interests (Facebook / Instagram)

- Small business
- Small business administration
- SBA loan
- Entrepreneurship
- Franchise
- Business acquisition
- Working capital
- Commercial lending

### Keyword themes for ad copy

1. **SBA 7(a) specialist** — "Government guaranteed financing, lenders compete for your deal"
2. **Franchise financing** — "Fund your franchise with SBA 7(a)"
3. **Acquisition / buyout** — "Business acquisition financing from $350K to $5M"
4. **Working capital** — "Working capital for growing businesses"
5. **Entrepreneur** — "Built for entrepreneurs who need real capital"

### UTM convention

```
?utm_source=meta&utm_medium=paid&utm_campaign={campaign}&utm_content={ad_set}
```

### Pixel / conversion events

- **Primary:** Lead (prequal form submit on `/get-prequalified`)
- **Secondary:** PageView, InitiateCheckout (if Stripe prequal payment enabled)
- **Landing:** getfundpilot.com funnel → myfundpilot.com/get-prequalified

---

## Campaign Structure (Friday launch track)

| Campaign | Objective | Audience | Landing |
|----------|-----------|----------|---------|
| SBA 7(a) — Broad | Leads | SBA + small business loan interests, US 25–65 | getfundpilot.com |
| Franchise buyers | Leads | Franchise + business acquisition interests | getfundpilot.com |
| Working capital | Leads | Entrepreneur + working capital interests | getfundpilot.com |
| Retargeting | Leads | Site visitors 7/30 day | myfundpilot.com/get-prequalified |

---

## Meta Business Manager Setup Checklist

- [ ] Business Manager account linked to Fund Pilot Facebook page
- [ ] Instagram @myfundpilot connected
- [ ] Ad account created / payment method on file (Tracy's card — verify in Stripe)
- [ ] Meta Pixel installed on myfundpilot.com (advertising cookie category)
- [ ] Conversion API (optional, post-launch)
- [ ] Ad creatives approved by Tracy
- [ ] getfundpilot.com funnel UTM params wired

---

## Related Accounts

| Service | Account | Notes |
|---------|---------|-------|
| Facebook | profile.php?id=61555053346183 | Page linked in site footer |
| Instagram | @myfundpilot | Linked in site footer |
| Stripe | RMVS customer (Tracy subscription) | Verify default PM before launch |
| Google Workspace | Fund Pilot domain | Sep 1 $4.20 billing |
| 1Password | Fund Pilot — Shared with Tracy | FB/IG/Grasshopper credentials |
