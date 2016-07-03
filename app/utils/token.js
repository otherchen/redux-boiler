export default {
  get() {
    return localStorage.getItem('token')
  },

  set(token) {
    localStorage.setItem('token', token)
  },

  decode(token) {
    // @todo: use jsonwebtoken to decode instead of window.atob()
    return window.atob(token.split('.')[1])
  },

  verify(token) {
    // @todo: use jsonwebtoken to verify if token is expired
    return true
  }
}
