export function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function getStoredTheme() {
  return localStorage.getItem('theme') || 'light';
}
