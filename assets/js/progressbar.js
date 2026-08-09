function randomColor () {
  let colors = [
    '#003366',
    '#660033', '#089378', '#0898b3', '#1A5276'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

function offsetTop (elm) {
  return elm ? elm.getBoundingClientRect().top + elm.ownerDocument.defaultView.pageYOffset : 0
}

function offsetHeight (elm) {
  return elm ? elm.offsetHeight : 0
}

function initProgress (h1) {
  let threshold0 = offsetHeight(document.querySelector('nav'))
  let threshold1 = offsetTop(h1) + offsetHeight(h1)
  let postContent = document.querySelector('.post-content')

  if (!postContent) return

  let ph = offsetHeight(postContent)   // post height
  let wh = window.innerHeight          // window height
  let color = randomColor()

  document.addEventListener('scroll', () => {
    let top = offsetTop(postContent)
    let y = document.defaultView.pageYOffset
    let base = Math.max(5, top + ph - wh)
    let progress = Math.min(100, y / base * 100)

    let bar = document.querySelector('#bar')
    bar.style.width = progress + '%'
    bar.style.backgroundColor = color

    if (y <= threshold0) {
      document.querySelector('#progress').style.height = '0'
    } else if (y <= threshold1) {
      document.querySelector('#progress').style.height = '8px'
    } else {
      document.querySelector('#progress').style.height = '36px'
    }
  })
}

function minHeight () {
  let wh = window.innerHeight
  let hh = offsetHeight(document.querySelector('header'))
  let fh = offsetHeight(document.querySelector('footer'))
  let minHeight = wh - hh - fh - 20 // 20 for adjustment
  return minHeight + 'px'
}

document.querySelector('main').style.minHeight = minHeight()

let h1 = document.querySelector('h1')
if (h1) {
  initProgress(h1)
}
