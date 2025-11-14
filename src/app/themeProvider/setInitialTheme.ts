// app/themeProvider/setInitialTheme.ts
export function getThemeScriptTag() {
  return `
    (function() {
      try {
        var theme = document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1];
        if (!theme) {
          theme = 'dark';
          document.cookie = 'theme=dark; path=/; max-age=31536000';
        }
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.add(theme);
      } catch(e) {}
    })();
  `;
}
