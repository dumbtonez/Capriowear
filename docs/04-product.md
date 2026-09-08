# 04 · Product

What Capriowear is, who the site is for, and what it has to do. Read this before writing or changing any copy.

---

## The business

**Capriowear** is the activewear and teamwear division of **Caprio Sports**, a manufacturer in **Sialkot, Pakistan**. It is a direct factory, not an agent or trading house — that distinction is a core selling point and appears in the copy repeatedly.

**What it sells:** custom OEM, ODM and private-label manufacturing of activewear and teamwear. Design and development through to packed, shipped goods.

**Tone:** premium, editorial, performance. Confident and specific. Not chatty, not salesy.

## Who the site is for

B2B buyers, in three shapes:

1. **Emerging brands** — founders launching an activewear line. Care about low MOQ, sampling speed, and whether their designs are safe.
2. **Established brands and teamwear suppliers** — care about capacity, consistency, certifications, and lead times.
3. **Sourcing agents and procurement** — care about compliance paperwork, audits, duty treatment, and shipping terms.

Every section should answer a buyer question. The site's job is to get a qualified buyer to **request a sample** — the primary CTA everywhere.

## The offer, in facts

These are the claims the site makes. Anything marked ⚠️ is unconfirmed and must not go live unverified.

| Fact | Detail |
|---|---|
| Product range | Activewear: leggings, sports bras, shorts, hoodies, joggers and track pants, tracksuits, base layers. Teamwear: soccer, basketball, football uniforms, fight wear |
| MOQ | From 50 pieces per style for new brands ⚠️; from 500 for custom fabrics and specs; prototypes from 1 to 10 |
| Services | Custom manufacturing, fabrics and materials, printing and branding, quality and compliance, logistics and fulfilment |
| Sampling | 10 to 14 days |
| Quality | Multi-stage AQL 2.5 inspection, third-party inspection welcome |
| IP | NDA signed before any tech pack is received |
| Certifications | ISO 9001, ISO 45001, ISO 14001, CE, BSCI, no-child-labour monitoring (IMAC) ⚠️ |
| Memberships | PSGMEA, PRGMEA, WFSGI, SCCI ⚠️ |
| Shipping | 20+ countries. DDP to US, UK, EU, Canada, Australia. GSP+ 0% EU duty ⚠️ |
| Terms | FOB, CIF or DDP |

## Open questions ⚠️

These need the owner's confirmation before launch. Each is also marked `// VERIFY` at the point of use in `content/home.ts`.

| # | Question | Current state |
|---|---|---|
| 1 | Hero eyebrow wording | Wireframe renders "BASED IN SIALKOT, PAKISTAN"; the copy doc says "MADE IN SIALKOT, PAKISTAN". Using the wireframe version, since the copy doc says the design wins where they differ |
| ~~2~~ | ~~Founded 2000 or 2009?~~ | **Resolved 2026-09-08.** 2009 confirmed. "Since 2000" (homepage stats) and "25+ years" (Services intro paragraph) both corrected sitewide to reflect 2009 -- see `docs/05-plan.md`'s decision log |
| 3 | Facility size | Wireframe says 75,000 sq ft; copy doc says 50,000 sq ft |
| ~~4~~ | ~~Which client logos may be shown~~ | **Resolved 2026-08-24.** Permission confirmed for all 8: MyProtein, Gymreapers, Youngla, GymBeam, Evolution Athletics, RISE, WOLFpak, Capo. Real artwork now live in the client logos section, `public/logos/` |
| 5 | Which certifications are current | The badge list needs confirming against live certificates |
| ~~6~~ | ~~Nav structure~~ | **Resolved 2026-08-22.** The real Figma nav (node 316:1331) settles this: four plain links (Activewear, Teamwear & Uniforms, Services, Our Factory), no mega menu, logo only, no text brand. Neither the wireframe's four nor the copy doc's six-plus-mega-menu guess was quite right; the actual design wins now that it exists. Built in `content/home.ts` and [components/Header.tsx](../components/Header.tsx) |
| 7 | Bulk production lead time | FAQ answer still reads "[X] days" |
| 8 | Trust strip tile wording | Wireframe tiles (Product Development, Private Label, Low MOQ, Worldwide Shipping) differ from the copy doc's four (Low MOQ, Private Label, Trusted Since 2009, Worldwide Shipping) |

## Copy rules

- **No en dashes or em dashes (– —).** Use commas, colons, periods, or "to" for ranges. This is absolute.
- All copy lives in typed files in `/content`. Never write copy directly into a component.
- Primary CTA label is **"Request a Sample"** everywhere.
- Numbers and claims must be traceable to the table above. No invented specifics.

## Sources of truth

| For | File |
|---|---|
| Copy | `docs/source/Capriowear-Homepage-Content-FINAL.md` |
| Layout | `docs/source/wireframe-desktop.png`, `docs/source/wireframe-mobile.png` |
| Live copy in the build | `content/home.ts` |

Where wireframe and copy doc disagree, the copy doc's own instruction is that **the design wins** — with the known exceptions listed in its "DESIGN FILE UPDATES" section. Question 6 above is the one place this project deliberately went the other way, and it is flagged for confirmation.

## Page inventory

| Page | Status |
|---|---|
| Homepage | Phase 2 in progress — nav built (2026-08-22), remaining 13 sections not started |
| `/styleguide` | Built. Internal QA only, not public-facing |
| Activewear, and its 7 category pages | Not started |
| Teamwear & Uniforms, and its 4 category pages | Not started |
| Capabilities, plus 5 sub-pages | Not started |
| Our Factory, plus 4 sub-pages | Not started |
| Catalog | Not started |
| Contact / Request a Sample | Not started |

Links to unbuilt pages already exist in the nav and in the content file. They will 404 until those pages are built, which is expected at this stage.
