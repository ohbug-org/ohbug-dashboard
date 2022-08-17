import Router from 'next/router'
import NProgress from 'nprogress'

let timer: any
let state: 'loading' | 'stop'
const delay = 250

function load() {
  if (state === 'loading') {
    return
  }

  state = 'loading'

  timer = setTimeout(() => {
    NProgress.start()
  }, delay)
}

function stop() {
  state = 'stop'

  clearTimeout(timer)
  NProgress.done()
}

Router.events.on('routeChangeStart', load)
Router.events.on('routeChangeComplete', stop)
Router.events.on('routeChangeError', stop)

const TopProgressBar = () => null
export default TopProgressBar
