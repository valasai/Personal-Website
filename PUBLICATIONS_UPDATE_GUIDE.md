# Publications Update Guide

## ⚠️ CRITICAL: Remove Fake Publications

The current `publications.html` file contains **placeholder/fake publications** that must be replaced with your actual research publications.

## How to Update Publications

### Step 1: Gather Your Real Publications

From your Google Scholar profile (https://scholar.google.com/citations?user=036018090270) or CV, collect:

1. **Title**
2. **Authors** (in correct order)
3. **Journal/Venue name**
4. **Year**
5. **Volume, Issue, Pages**
6. **DOI** (Digital Object Identifier)
7. **PDF link** (if freely available)
8. **Categories** (e.g., journal, energy-modeling, renewable, policy)

### Step 2: Publication Link Priority

For each publication, add links in this priority order:

#### Option 1: Free PDF + DOI (BEST)
```html
<div class="publication-links">
    <a href="https://doi.org/10.1016/j.rser.2017.05.084" class="publication-link" target="_blank">
        <i class="fas fa-link"></i> DOI
    </a>
    <a href="https://example.com/paper.pdf" class="publication-link" target="_blank">
        <i class="fas fa-file-pdf"></i> Free PDF
    </a>
</div>
```

#### Option 2: Journal URL + DOI
```html
<div class="publication-links">
    <a href="https://doi.org/10.1016/j.rser.2017.05.084" class="publication-link" target="_blank">
        <i class="fas fa-link"></i> DOI
    </a>
    <a href="https://www.sciencedirect.com/science/article/pii/..." class="publication-link" target="_blank">
        <i class="fas fa-external-link-alt"></i> Journal
    </a>
</div>
```

#### Option 3: Google Scholar + DOI
```html
<div class="publication-links">
    <a href="https://doi.org/10.1016/j.rser.2017.05.084" class="publication-link" target="_blank">
        <i class="fas fa-link"></i> DOI
    </a>
    <a href="https://scholar.google.com/scholar?q=..." class="publication-link" target="_blank">
        <i class="fas fa-graduation-cap"></i> Google Scholar
    </a>
</div>
```

#### Option 4: DOI Only (MINIMUM)
```html
<div class="publication-links">
    <a href="https://doi.org/10.1016/j.rser.2017.05.084" class="publication-link" target="_blank">
        <i class="fas fa-link"></i> DOI
    </a>
</div>
```

### Step 3: Complete Publication Template

```html
<div class="publication-item" data-category="journal renewable policy" data-year="2017">
    <div class="publication-header">
        <h3 class="publication-title">Overcoming electricity crisis in Pakistan: A review of sustainable electricity options</h3>
        <div class="publication-type journal">Journal Article</div>
    </div>
    <div class="publication-authors">Valasai, G.D., Uqaili, M.A., Memon, H.U.R., Samoo, S.R., Mirjat, N.H., Harijan, K.</div>
    <div class="publication-venue">Renewable and Sustainable Energy Reviews, 72, 734-745</div>
    <div class="publication-abstract">
        This paper reviews sustainable electricity options for Pakistan to overcome the current energy crisis. It analyzes renewable energy potential, policy frameworks, and implementation strategies.
    </div>
    <div class="publication-links">
        <a href="https://doi.org/10.1016/j.rser.2017.05.084" class="publication-link" target="_blank">
            <i class="fas fa-link"></i> DOI
        </a>
        <a href="https://www.sciencedirect.com/science/article/pii/S1364032117306561" class="publication-link" target="_blank">
            <i class="fas fa-external-link-alt"></i> Journal
        </a>
    </div>
</div>
```

### Step 4: Data Attributes

Set the correct `data-category` for filtering:

- **Publication Type**: `journal`, `conference`, `book`
- **Topic**: `renewable`, `policy`, `modeling`, `energy`, `hydrogen`, `bioenergy`
- **Year**: `2025`, `2024`, `2023`, etc.

Example: `data-category="journal renewable policy" data-year="2017"`

### Step 5: Year Organization

Group publications by year in descending order (newest first):
- 2025
- 2024
- 2023
- 2019
- 2018
- 2017

## Example: Real Publication from Your Google Scholar

Based on your Google Scholar profile, here's how a real publication should look:

```html
<div class="year-section">
    <h2 class="year-header">2017</h2>
    
    <div class="publication-item" data-category="journal renewable policy" data-year="2017">
        <div class="publication-header">
            <h3 class="publication-title">Overcoming electricity crisis in Pakistan: A review of sustainable electricity options</h3>
            <div class="publication-type journal">Journal Article</div>
        </div>
        <div class="publication-authors">Valasai, G.D., Uqaili, M.A., Memon, H.U.R., Samoo, S.R., Mirjat, N.H., Harijan, K.</div>
        <div class="publication-venue">Renewable and Sustainable Energy Reviews, 72, 734-745</div>
        <div class="publication-meta">
            <span class="citation-count"><i class="fas fa-quote-right"></i> 250 citations</span>
        </div>
        <div class="publication-abstract">
            This paper reviews sustainable electricity options for Pakistan, analyzing renewable energy potential and policy frameworks to overcome the energy crisis.
        </div>
        <div class="publication-links">
            <a href="https://doi.org/10.1016/j.rser.2017.05.084" class="publication-link" target="_blank">
                <i class="fas fa-link"></i> DOI
            </a>
            <a href="https://www.sciencedirect.com/science/article/pii/S1364032117306561" class="publication-link" target="_blank">
                <i class="fas fa-external-link-alt"></i> Journal
            </a>
        </div>
    </div>
</div>
```

## ⚠️ Critical Reminders

1. **Remove ALL fake/placeholder publications**
2. **Use ONLY your real publications from Google Scholar or CV**
3. **Include proper DOI links for all publications**
4. **Verify all author names and publication details**
5. **Double-check publication years**
6. **Test all links to ensure they work**

## Where to Find Your Publications

1. **Google Scholar**: https://scholar.google.com/citations?user=036018090270
2. **ResearchGate**: https://www.researchgate.net/profile/Gordhan-Valasai
3. **ORCID**: https://orcid.org/0000-0002-0476-4927
4. **Your CV**: Use your most recent CV as the authoritative source

## Need Help?

If you need assistance updating the publications:
1. Export your publications from Google Scholar
2. Send the list with DOIs
3. I can format them properly in the HTML

## Verification Checklist

Before publishing:
- [ ] All fake publications removed
- [ ] All publications verified against Google Scholar
- [ ] All DOI links working
- [ ] All author names correct
- [ ] All publication years correct
- [ ] All links open in new tabs (target="_blank")
- [ ] All abstracts accurate
- [ ] Data categories correct for filtering
