import { browserHistory } from 'react-router';

export const levels = {
  GUEST: 'guest',
  USER: 'user',
  ALL: 'all'
};

export const validators = {
  guest: user => !user,
  user: user => !!user,
  all: user => true
};

export const redirects = {
  guest: '/',
  user: '/auth'
}

export function access(level, user) {
  const verified = validators[level](user);
  const redirect = redirects[level];
  if(!verified) browserHistory.replace(redirect);
  return verified;
}
