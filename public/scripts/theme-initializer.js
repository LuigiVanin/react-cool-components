// public/scripts/theme-initializer.js
// (Keep this file simple, no imports/exports needed for inline script)

(function() {
  function getInitialTheme() {
    try {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        return savedTheme;
      }

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch (e) {
      // Fallback if localStorage or matchMedia is unavailable
      return 'light';
    }
  }

  const theme = getInitialTheme();

  // Apply class to <html> element
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    // Optional: Ensure 'dark' is removed if switching from a cached dark state
     document.documentElement.classList.remove('dark');
  }

  // Optional: Persist the determined theme if it wasn't explicitly saved
  // This helps if the user relied only on prefers-color-scheme initially
  try {
    if (!window.localStorage.getItem('theme')) {
      window.localStorage.setItem('theme', theme);
    }
  } catch (e) {}
})();