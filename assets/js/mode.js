const sun  = '☀'
const moon = '☾'
const light = 'light'
const dark  = 'dark'

export function getMode () {
  let mode = localStorage.getItem('currentMode')
  return !mode ? light: mode;
}

function setMode (mode) {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem('currentMode', mode);
  let modeSwitch = document.getElementById('mode-switch');

  document.querySelector("#mode-switch>svg.icon-moon").style.display = (mode===light ? 'inline-block' : 'none');
  document.querySelector("#mode-switch>svg.icon-sun").style.display = (mode===dark ? 'inline-block' : 'none');
}

function changeGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) return;

  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: theme } } },
    'https://giscus.app'
  );
}

export function switchMode (mode) {
  if (mode === light) {
    setMode(light)
    changeGiscusTheme('light_protanopia');
  } else {
    setMode(dark)
    changeGiscusTheme('dark_protanopia');
  }
}
