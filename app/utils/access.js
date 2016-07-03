export const Level = {
  guest: 1,
  user: 2
}

export function Access(store) {
  return (level) => {
    return (nextState, replace) => {
      const auth = store.getState().auth
      let verified, redirect

      switch(level) {
        case Level.guest:
          verified = (auth.level === Level.guest)
          redirect = '/'
          break;
        case Level.user:
          verified = (auth.level === Level.user)
          redirect = '/login'
          break;
        default:
          verified = false;
          redirect = '/login'
      }

      if(!verified) {
        replace(redirect)
      }
    }
  }
}
