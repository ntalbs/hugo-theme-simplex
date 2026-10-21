# hugo-theme-simplex

Simple hugo theme.

## Structure

```text
simplex/
  + assets/
    + css
      - style.styl        # style
    + js
      - anchor.js         # add target to external links
      - index.js          # entry point js
      - mode.js           # mode(theme) control. Toggle light|dark
      - progressbar.js    # progress bar
      - shortcut.js       # shortcut
  + layouts
    + _default
      - list.html         # default listing page. Used for archive of specific year e.g. /2026
      - single.html       # for each post page
    + about
      - list.html         # /about page
    + archive
      - list.html         # /archive page
    + partials
      - adsense.html
      - footer.html
      - format-taag.html
      - giscus.html
      - header.html
      - mathjax.html
      - page-bottom.html
      - page-top.html
      - pager.html
      - progress.html
      - social.html
    + tags
      - list.html
    - 404.html
    - index.html
```

Memo: This template uses stylus for styling.  Whenever you edit
style.styl, you need to run `stylus` command to generate CSS file to
`assets` directory.

```
$ pwd
.../simplex/assets/css
$ stylus style.styl
  compiled style.css
```

Or you can use `-w` option of `stylus` command to watch and recompile
when `style.styl` is updaated.
