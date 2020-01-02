
function getFromStorage() {
  try{
    return localStorage.getItem('theme');
  }
  catch(e) {
    return new URL(location.href).searchParams.get('theme');
  }
}
function setToStorage(name: string) {
  try{
    localStorage.setItem('theme', name);
  }
  catch(e) {
    const url = new URL(location.href);
    url.searchParams.set('theme', name);
    location.href = url.href;
  }
}
export function loadTheme(name: string) {
  const themeLoaderEl = document.getElementById('theme-loader') as HTMLLinkElement;
  if (themeLoaderEl) {
    themeLoaderEl.href=`themes/${name}_theme.css`;
  }
}
export function changeTheme(theme: string) {
  setToStorage(theme);
  loadTheme(theme);
}
export function loadDefaultTheme() {
  const savedTheme = getFromStorage();
  if (savedTheme) {
    loadTheme(savedTheme);
  }
}
