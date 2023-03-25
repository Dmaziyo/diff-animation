import { setPatchKeyedChildren, setType } from './init.js'

export class Router {
  constructor(routes = []) {
    this.routes = routes
    this.currentHash = ''
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  getUrlPath(url) {
    return url.indexOf('#') >= 0 ? url.slice(url.indexOf('#') + 1) : '/case1'
  }

  refresh(event) {
    let newHash = ''

    if (event.newURL) {
      newHash = this.getUrlPath(event.newURL || '')
      this.currentHash = newHash
    } else {
      window.location.hash = '/case1'
      this.currentHash = '/case1'
    }
    this.matchCase()
  }

  matchCase() {
    let route = this.routes.find(route => {
      return route.path === this.currentHash
    })
    setPatchKeyedChildren(route.diff)
    setType(route.type)
    let resetBtn = document.getElementById('reset')
    resetBtn.click()
  }
}
