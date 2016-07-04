export default {
  get() {
    return localStorage.getItem('token')
  },

  set(token) {
    localStorage.setItem('token', token)
  },

  invalidate() {
    localStorage.removeItem('token');
  },

  decode(token) {
    return window.atob(token.split('.')[1])
  }
}
