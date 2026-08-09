const light = 'light'
const dark  = 'dark'

export function getMode () {
  return localStorage.getItem('currentMode') || light;
}

export function switchMode (mode) {
  if (mode === light) {
    setMode(light)
  } else {
    setMode(dark)
  }
}

function setMode (mode) {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem('currentMode', mode);
  changeGiscusTheme(mode + '_protanopia');
}

function changeGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) return;

  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: theme } } },
    'https://giscus.app'
  );
}
