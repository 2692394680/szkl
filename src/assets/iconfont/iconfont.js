/* eslint-disable */
!(function(e) {
  let t; let n; let o; let i; let d
  let c = '<svg><symbol id="icon-arrow-left-s-line" viewBox="0 0 1024 1024"><path d="M461.994667 512l211.2 211.2-60.330667 60.330667L341.333333 512l271.530667-271.530667 60.330667 60.330667-211.2 211.2z"  ></path></symbol></svg>'
  var l = (l = document.getElementsByTagName('script'))[l.length - 1].getAttribute('data-injectcss')
  const s = function(e, t) {
    t.parentNode.insertBefore(e, t)
  }
  if (l && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0
    try {
      document.write('<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>')
    } catch (e) {
      console && console.log(e)
    }
  }

  function a() {
    d || (d = !0, o())
  }

  function r() {
    try {
      i.documentElement.doScroll('left')
    } catch (e) {
      return void setTimeout(r, 50)
    }
    a()
  }

  t = function() {
    let e; let t = document.createElement('div')
    t.innerHTML = c, c = null, (t = t.getElementsByTagName('svg')[0]) && (t.setAttribute('aria-hidden', 'true'), t.style.position = 'absolute', t.style.width = 0, t.style.height = 0, t.style.overflow = 'hidden', t = t, (e = document.body).firstChild ? s(t, e.firstChild) : e.appendChild(t))
  }, document.addEventListener
    ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
      ? setTimeout(t, 0)
      : (n = function() {
        document.removeEventListener('DOMContentLoaded', n, !1), t()
      }, document.addEventListener('DOMContentLoaded', n, !1))
    : document.attachEvent && (o = t, i = e.document, d = !1, r(), i.onreadystatechange = function() {
      i.readyState == 'complete' && (i.onreadystatechange = null, a())
    })
}(window))
/* eslint-disable no-new */
