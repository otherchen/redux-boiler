export default {
  get() {
    return localStorage.getItem('jwtToken')
  },

  set(token) {
    localStorage.setItem('jwtToken', token)
  },

  invalidate() {
    localStorage.removeItem('jwtToken');
  },

  decode(token) {
    return window.atob(token.split('.')[1])
  }
}
