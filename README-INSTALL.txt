GEORGE'S BLOOM & BROOM — WELCOME PAGE + THICK GROWING VINE
=============================================================

Includes BOTH approved changes in one update:
- New homepage: Meet George (left) + Areas I Work In map (right)
- Thicker flowering vine beneath the existing navigation, with pink blooms on
  mouse hover / keyboard focus and progressive green growth as visitors scroll

PRESERVED: existing company logo, navigation, garden map, lawnmower scrollbar,
gallery, Robert's confirmed review (and two unconfirmed placeholders), FAQs,
and the FormSubmit enquiry form. The existing script.js stays untouched.

IMPORTANT IMAGE NOTES
---------------------
The portrait is a TEMPORARY STOCK-STYLE SAMPLE IMAGE; it is not George himself.
The map is an ILLUSTRATION, not a verified boundary/road map and not a promise of
services everywhere shaded. Confirm areas covered and replace with accurate
geographic data before publication as an exact coverage map.
The sample Meet George text needs George's approval before representing his
own words or experience.

FASTEST INSTALL (RECOMMENDED WHEN YOU HAVE NOT UPLOADED THE PREVIOUS ZIP)
-----------------------------------------------------------------------
1. Open https://github.com/bolgsven/georges-bloom-and-broom
2. Back up the current index.html and styles.css, ideally on a new branch.
3. Upload the 2 images from assets/ to the EXISTING root assets/ directory.
   Do not delete other images. (Do NOT upload the containing assets folder as
   an additional nested folder.)
4. Replace the ROOT index.html with full-replacement/index.html.
5. Replace the ROOT styles.css with full-replacement/styles.css.
6. LEAVE script.js AND ALL OTHER FILES ALONE.
7. Commit and wait for GitHub Pages to publish. Open the site, then force-refresh.
8. Check the header on desktop/phone, both hero links, the enquiry form, Robert's
   review, interactive garden, and lawnmower scrollbar.

These full replacement files incorporate the previous agreed homepage code package
and the thicker vine. The latest connected GitHub check (26 Oct 2026) found:
  index.html SHA e4ce41811ea1529dca213cd03d2b5d19c47300d9
  styles.css SHA 4884d412022f881fe50c437456761385dec21e22
  script.js SHA 4e045d10b92f705801ab9d38a280c4591fc41e33 If the repository
has newer edits to index.html/styles.css, use SAFE INCREMENTAL INSTALL below to
avoid overwriting those newer changes.

SAFE INCREMENTAL INSTALL (RECOMMENDED WHEN SITE FILES HAVE CHANGED)
-----------------------------------------------------------------
1. Upload the same 2 JPGs into root assets/.
2. In root index.html replace only original
   <section aria-labelledby="hero-title" class="hero"> ... </section>
   with snippets/replacement-hero.html.
   Keep the <div class="service-strip"> after it unchanged.
   IF the new gb-welcome section already exists, skip this replacement.
3. In root index.html insert snippets/thick-vine-header.html IMMEDIATELY
   before the closing </header> for the main site header.
   Don't insert it twice. The existing menu and logo stay in place.
4. In root index.html insert snippets/thick-vine-script.html IMMEDIATELY
   before the final closing </body>.
5. In root styles.css append snippets/welcome-section.css IF the new welcome
   section CSS has not already been added; then append
   snippets/thick-vine-styles.css at the very bottom.
   Keep all existing CSS above.
6. Commit all files, and inspect on desktop and mobile.

Note: the safe incremental install modifies just index.html, styles.css, and
uploads 2 JPGs. The new vine does not need a new JS file and does not change
script.js; its small script is included in the HTML.

IF THE PREVIOUS MEET-GEORGE UPDATE IS ALREADY INSTALLED
----------------------------------------------------
Only do SAFE INCREMENTAL INSTALL steps 3 and 4, and append only
snippets/thick-vine-styles.css. Do not paste the old welcome CSS again.

FILES IN THIS ZIP
-----------------
full-replacement/index.html         Complete HTML with BOTH updates
full-replacement/styles.css         Complete CSS with BOTH updates
assets/meet-george-placeholder.jpg Stand-in photo
assets/service-area-illustration.jpg Concept service map
snippets/replacement-hero.html     New intro+map section
snippets/welcome-section.css       CSS for intro+map
snippets/thick-vine-header.html    New green leafy header vine
snippets/thick-vine-styles.css     CSS for thicker vine
snippets/thick-vine-script.html    Bloom-on-hover + grow-on-scroll script
preview.html                       Self-contained preview (NOT for GitHub)
previews/desktop-1440.png          Desktop screenshot
previews/mobile-390.png            Mobile screenshot

Suggested commit: "Add Meet George hero and thicker blooming navigation vine"
