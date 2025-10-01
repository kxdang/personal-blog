# Restaurant Guide

## Adding a New Restaurant

### 1. Upload Images to Cloudinary

**Batch Upload (Easiest):**

- Select all images → Upload
- In Advanced: Set folder to `restaurant-name`
- Keep original names (IMG_1234, etc.) - no renaming needed!

### 2. Add Restaurant Data

**Option A: MDX File (Recommended for Long Reviews)**

Create `/data/restaurants/restaurant-name.mdx`:

```mdx
---
id: restaurant-name
name: Restaurant Name
cuisine: Italian
location: New York, NY
rating: 4.5
ratings:
  food: 4.5
  service: 4.5
  atmosphere: 4.0
  value: 4.5
priceRange: $$$
visitDate: 2025-01-15
vibe: Elegant & Cozy
mustTry:
  - Truffle Pasta
  - Tiramisu
photos: auto # or a number like 10
wouldReturn: true
tags:
  - italian
  - date-night
excerpt: A cozy Italian gem with authentic flavors
---

## Atmosphere

Write your review naturally here using Markdown. No need for JSON escaping!

## The Food

Describe the dishes, flavors, presentation...

## Service

Share your service experience...

## Favorite Memory

"That moment when the chef came out to explain the dish..."

## Final Thoughts

Your overall impressions and recommendations.
```

**Option B: JavaScript Data (Quick Reference Only)**

Only use `/data/restaurantsData.js` for restaurants without detailed reviews. For full reviews, use MDX files.

### 3. Build

```bash
pnpm build
```

## Key Points

✅ **What Works:**

- Any image naming (IMG*\*\*\*\*, DSC*\*\*\*\*, etc.)
- Batch upload all at once
- Automatic image optimization (WebP, compression, etc.)

❌ **Common Mistakes:**

- Mismatched folder names (must be exact match)
- Using spaces/capitals (use `le-bernardin`, not `Le Bernardin`)

## Complete Example

```javascript
{
  id: 'nobu',
  name: 'Nobu',
  cuisine: 'Japanese Fusion',
  location: 'New York, NY',
  rating: 4.8,
  priceRange: '$$$$',
  visitDate: '2025-01-20',
  vibe: 'Trendy & Sophisticated',
  mustTry: ['Black Cod Miso', 'Yellowtail Jalapeño'],
  photos: 'auto',  // Gets ALL images from 'nobu' folder
  review: {
    atmosphere: 'Modern Japanese elegance...',
    food: 'The black cod melts in your mouth...',
    service: 'Impeccable...',
  },
  wouldReturn: true,
  tags: ['japanese', 'fusion'],
}
```

## Image Optimizations Applied

All images automatically get:

- `f_auto` - WebP/AVIF for modern browsers
- `q_auto:eco` - Smart compression
- `c_limit,w_2000` - Responsive sizing
- `dpr_auto` - Retina display support
