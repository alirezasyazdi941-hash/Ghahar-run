# Alireza Yazdi · GHAHAR (flat build for GitHub Pages)

All files live in ONE flat folder — upload them directly to the repo root (include `.nojekyll`), then enable Pages.
Works at `https://<user>.github.io/<repo>/` (relative paths only).

Isolation: all CSS is scoped to `#ghahar`/`.gh-*`; JS is a closed IIFE; localStorage keys use `ay.ghahar:`;
the service worker is scoped to its own folder and only touches caches named `ay-ghahar-*`; fonts are self-hosted;
CSP allows only same-origin assets plus https API calls.

Translation engine: Settings → API endpoint (https). POST `{text,sourceLang,targetLang,tone}` →
`{"data":{"primaryTranslation":"..."}}` or `{"translation":"..."}`. Keep the Gemini key on your server, never in the browser.
