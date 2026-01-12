# Copilot Instructions - Sonoran Desert Wine Experiences

## Architecture
Static marketing website (5 HTML pages) with CDN-loaded libraries—no build system. All pages duplicate `<head>` content including CSS variables and CDN links.

**Pages**: `index.html` (homepage + region map), `experiences.html` (booking), `pairing.html` (wine/food guide), `about.html` (terroir story), `wine-101.html` (training)

## Critical Conventions

### Navigation Updates
Navigation is duplicated across all 5 pages. When modifying nav structure, update ALL files:
```html
<nav class="fixed top-0 ... bg-white/95 backdrop-blur-md">
    <a href="index.html" class="nav-link">Wine Regions</a>
    <!-- same links in all pages -->
</nav>
```

### CSS Variables (copy to each page's `<style>` block)
```css
--desert-sandstone: #D4A574;  --wine-burgundy: #722F37;
--sage-green: #87A96B;        --terracotta: #B85450;
--cream: #F5F1E8;             --charcoal: #2C2C2C;
--golden-hour: #E6B17A;       --copper: #B87333;
```

### Typography
- `.font-display` → Playfair Display (headings only)
- `.font-accent` → Crimson Text (wine descriptions, quotes)
- Body defaults to Inter

### Card Patterns
All cards use `backdrop-filter: blur(10px)` with translucent backgrounds:
```html
<div class="wine-card rounded-2xl p-8"><!-- content --></div>
```
Available: `.wine-card`, `.experience-card`, `.training-card`, `.content-card`

## JavaScript Patterns (`main.js`)

### Adding New Features
1. Create `initFeatureName()` function
2. Call from DOMContentLoaded handler
3. Use `anime({ targets, ...props })` for animations

```javascript
// Pattern: all init functions follow this structure
function initNewFeature() {
    const element = document.getElementById('my-element');
    if (!element) return;  // Guard for pages without this element
    
    element.addEventListener('click', function() {
        anime({
            targets: this,
            scale: [1, 1.05, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
    });
}
```

### Scroll Animations
Add `.reveal-up` class to any element—`initScrollAnimations()` handles IntersectionObserver automatically.

### Page-Specific Functions
- `initWinePairing()` - for pairing.html (exposed via `window.SonoranWine.initWinePairing`)
- `initBookingCalendar()` - for experiences.html
- `initWine101()` - for wine-101.html (course player with localStorage progress)
- Call from page-specific `<script>` block after main.js loads:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    if (window.SonoranWine && window.SonoranWine.initWine101) {
        window.SonoranWine.initWine101();
    }
});
```

### Wine 101 Course Data
Course modules defined in `courseData` object in main.js. Each module has:
- `title`: Display name
- `slides[]`: Array of `{type: 'text'|'quiz', title, content/question, options, correct, explanation}`

Progress saved to `localStorage` key `wine101_progress`.

## Assets
Images in `resources/`: `hero-vineyard.jpg`, `desert-landscape.jpg`, `wine-bottles.jpg`, `wine-tasting.jpg`  
Reference as: `resources/filename.jpg`

## Content Domain
**AVAs**: Sonoita (1984, 5000ft, limestone), Willcox (2016, 4500ft, volcanic), Verde Valley (2021, 3500ft)  
**Varietals**: Tempranillo, Syrah, Grenache (reds); Viognier, Malvasia (whites)  
**Wineries**: Los Milics, Rune Wines, Dos Cabezas, Alcantara, Page Springs Cellars

## Development
- **No build**: Open HTML directly or use Live Server
- **Test all 5 pages** when modifying shared CSS/JS
- **Design docs**: `design.md` (visual), `interaction.md` (UX), `outline.md` (content)
