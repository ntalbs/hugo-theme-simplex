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
    nextPage()
  } else if (e.keyCode === 76 && !(e.ctrlKey || e.metaKey) /* l */ || (e.ctrlKey && e.keyCode === 70)) {
    prevPage()
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
    let a = document.querySelector('.article-nav .prev')
    if (!!a) window.location = a.href
  } else {
    let a = document.querySelector('.page-item+.active')
        .nextElementSibling
        .firstElementChild
    if (!!a.href) window.location = a.href
  }
}

function nextPage() {
  if (isPostPage(window.location.pathname)) {
    let a = document.querySelector('.article-nav .next')
    if (!!a) window.location = a.href
  } else {
    let a = document.querySelector('.page-item+.active')
        .previousElementSibling
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
