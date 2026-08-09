const light = 'light'
const dark  = 'dark'

export function getMode () {
  return localStorage.getItem('mode') || light;
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
  localStorage.setItem('mode', mode);
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

let modeSwitch = document.getElementById('mode-switch');

modeSwitch.addEventListener('click', (e) => {
  switchMode(getMode() === 'light' ? 'dark' : 'light')
});
