// font-loader.js
// Handles removal of font loading overlay once custom @font-face fonts are ready.
// Provides timeout fallback so site is usable even if fonts fail.

(function() {
  const LOADER_ID = 'font-loader';
  const BODY_LOADING_CLASS = 'fonts-loading';
  const loaderEl = document.getElementById(LOADER_ID);
  const REMOVE_DELAY_MS = 3500; // fallback timeout
  let removed = false;

  function removeLoader(reason) {
    if (removed) return;
    removed = true;
    document.body.classList.remove(BODY_LOADING_CLASS);
    if (loaderEl) loaderEl.remove();
    if (reason) {
      // Debug message (could be commented out in production)
      console.log('[FontLoader] Loader removed:', reason);
    }
  }

  // If FontFaceSet API supported, wait for fonts
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      removeLoader('fonts.ready resolved');
    }).catch(() => {
      removeLoader('fonts.ready error');
    });
  } else {
    // API unsupported, remove immediately
    removeLoader('FontFaceSet unsupported');
  }

  // Fallback timeout: ensure loader does not persist indefinitely
  setTimeout(() => removeLoader('timeout fallback'), REMOVE_DELAY_MS);

  // Safety: if window load fires earlier (fonts cached), remove promptly
  window.addEventListener('load', () => {
    // If fonts already loaded and loader still visible, remove.
    if (document.fonts && document.fonts.status === 'loaded') {
      removeLoader('window.load + fonts status loaded');
    }
  });
})();
