class Router {
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
    }
  }
}
