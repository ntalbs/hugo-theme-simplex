import { getMode, switchMode } from './mode.js';
import './anchor.js';
import './shortcut.js';
import './progressbar.js';

let modeSwitch = document.getElementById('mode-switch');

modeSwitch.addEventListener('click', (e) => {
  switchMode(getMode() === 'light' ? 'dark' : 'light')
});

switchMode(getMode(), false);
