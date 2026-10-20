# ============================================================
# BRIGHTLINGSEA ACADEMY — CLOUDFLARE PAGES DEPLOY CHECKLIST
# Reuse on every upload. Solo workflow: edit locally, guard, upload.
# ============================================================
#
# TWO STAGES (you chose: free domain now, .edu.gh later)
#   STAGE 1 (today, GHc 0): live on brightlingsea.pages.dev (free
#     Cloudflare subdomain, HTTPS included). Share it, use it fully.
#   STAGE 2 (later, ~GHc 100-250/yr via MoMo): buy
#     brightlingseaacademy.edu.gh from a Ghana registrar (school
#     letter/GES docs), attach as custom domain in the same Pages
#     project (5 min). The .pages.dev address keeps working as backup.
# Hosting (free): Cloudflare Pages. Email: unchanged Gmail.
#
# 1. BUILD THE CLEAN UPLOAD FOLDER (~41MB)
#    Copy the project to deploy/ then DELETE these (dev-only, ~1.2GB):
#      node_modules/  _checkpoints/  updates/  tools/
#      _harness_gallery.html  _audit_tmp.html
#    NEVER upload: backups, raw uploads, test harnesses, tooling.
#
# 2. RUN THE GUARDS (must both be green before any upload)
#      node tools/gallery-check.js        -> ALL CHECKS PASSED
#      python3 tools/contrast-audit.py    -> PASS (112/112, WCAG AA)
#    If either fails, fix locally and re-run. Do not upload red.
#
# 3. FIRST-TIME CLOUDFLARE SETUP — STAGE 1 (once, ~10 min)
#    a. Free account at cloudflare.com (email only, no card).
#    b. Dashboard -> Workers & Pages -> Create -> Pages -> Direct Upload.
#    c. Drag deploy/ in, name it brightlingsea, Deploy.
#    d. Open the assigned brightlingsea.pages.dev URL and test fully
#       (see launch-day checks below). THIS IS YOUR LIVE SITE.
#
# 4. STAGE 2 — ATTACH .edu.gh LATER (5 min, when purchased)
#    a. At your registrar, point the domain to Cloudflare (they give
#       you 2 nameservers; Cloudflare free plan).
#    b. Same Pages project -> Custom domains ->
#       add brightlingseaacademy.edu.gh -> Activate.
#       HTTPS certificate auto-issues in ~5 min. Do NOT add mail (MX)
#       records — Gmail stays untouched.
#
# 5. EVERY UPDATE AFTER THAT
#    a. Edit files locally.
#    b. Re-run both guards (step 2).
#    c. Same Pages project -> new deployment -> drag deploy/ again.
#    d. Hard-refresh (Ctrl+Shift+R) the live site and spot-check.
#
# 6. LAUNCH-DAY CHECKS (live URL, real phone on MTN data too)
#    [ ] Home hero loads, crest + photo visible
#    [ ] Every gallery filter shows photos; lightbox opens/closes
#    [ ] Contact wizard submits; details correct
#         (brightlingseaacademy@gmail.com / 0245868467 / AD-141-4268)
#    [ ] Dark-mode toggle works; no console errors
#    [ ] (Stage 2 only) Submit sitemap to Google Search Console:
#        https://brightlingseaacademy.edu.gh/sitemap.xml
#
# 7. DO NOT
#    - Add mail (MX) DNS records (Gmail stays untouched).
#    - Upload _checkpoints/, updates/, node_modules/, tools/.
#    - Add phone-photo uploads uncompressed (keep gallery lean so
#      free bandwidth stays free).
#
# Launch state: sitemap 24 live URLs (5 dead removed 2026-09-28);
# manifest shortcuts -> gallery/about/news/contact (all real pages).
