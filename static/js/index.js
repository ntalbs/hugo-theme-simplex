(function () {
  'use strict'

  let modeSwitch = document.getElementById('mode-switch')

  modeSwitch.addEventListener('click', (e) => {
    switchMode(getMode() === 'light' ? 'dark' : 'light')
  })

  switchMode(getMode(), false)

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

  let h1 = document.querySelector('h1')
  if (h1) {
    initProgress(h1)
  }

  document.querySelector('[data-toggle=collapse]').addEventListener('click', (e) => {
    let button = e.target
    button.classList.toggle('rotated')
    let targetId = button.getAttribute('data-target')
    let target = document.getElementById(targetId.substring(1)) // remove '#'
    target.classList.toggle('collapsed')
  })

  function minHeight () {
    let wh = window.innerHeight
    let hh = offsetHeight(document.querySelector('header'))
    let fh = offsetHeight(document.querySelector('footer'))
    let minHeight = wh - hh - fh - 20 // 20 for adjustment
    return minHeight + 'px'
  }

  // shortcut:
  // down: j or C-n
  // up:   k or C-p
  // prev page: h or C-b
  // next page: l or C-f
  // slash: search this site
  document.addEventListener('keydown', e => {
    if (e.srcElement.id === 'search') {
      if (e.keyCode === 13 /* Enter */ ) {
        search(e.srcElement.value.trim())
        e.srcElement.value = ''
      }
      return
    }

    if (e.keyCode === 74 /* j */ || (e.ctrlKey && e.keyCode === 78 /* C-n */)) {
      window.scrollBy(0, 100)
    } else if (e.keyCode === 75 /* k */ || (e.ctrlKey && e.keyCode === 80 /* C-p */)) {
      window.scrollBy(0, -100)
    } else if (e.keyCode === 72 && !(e.ctrlKey || e.metaKey) /* h */ || (e.ctrlKey && e.keyCode === 66)) {
      prevPage()
    } else if (e.keyCode === 76 && !(e.ctrlKey || e.metaKey) /* l */ || (e.ctrlKey && e.keyCode === 70)) {
      nextPage()
    } else if (e.keyCode === 191) { // '/'
      window.scrollTo(0,0)
      e.preventDefault()
      document.getElementById('search').focus();
    }
  })

  function isPostPage(path) {
    return /^\/\d{4}\//.test(path)
  }

  function prevPage() {
    if (isPostPage(window.location.pathname)) {
      let a = document.querySelector('.previous')
      if (!!a) window.location = a.href
    } else {
      let a = document.querySelector('.page-item+.active')
          .previousElementSibling
          .firstElementChild
      if (!!a.href) window.location = a.href
    }
  }

  function nextPage() {
    if (isPostPage(window.location.pathname)) {
      let a = document.querySelector('.next')
      if (!!a) window.location = a.href
    } else {
      let a = document.querySelector('.page-item+.active')
          .nextElementSibling
          .firstElementChild
      if (!!a.href) window.location = a.href
    }
  }

  function search(keyword) {
    if (keyword === '') {
      return
    }
    window.open(`https://www.google.com/search?q=${keyword}+site%3Antalbs.github.io`, '_blank')
  }

  // Add target="_blank" for the links to outside of the site
  [...document.querySelectorAll('a')]
    .filter(link => link.hostname != window.location.hostname)
    .forEach(link => link.target = '_blank')

  // footnote
  document.querySelectorAll('.footnote-ref a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      let id = e.target.getAttribute('href').substr(1)
      let footnote = document.getElementById(id)
      footnote.scrollIntoView({block: 'end'})
    })
  })

  document.querySelector('main').style.minHeight = minHeight()
}())
