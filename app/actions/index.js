import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function registerUser(user) {
  type: REGISTER_USER,
  user
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    message
  }
}

export function register(user, dispatch) {
  return fetch('/api/register', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    return {
      status: response.status,
      body: json
    }
  })
  .then(({ status, body }) => {
    if(status >= 400) {
      // dispatch error action
      dispatch(loginFailure('failed to login'))
      console.log("bodyerror", body);
      return Promise.reject({ _error: body.error })
    } else {
      // dispatch login action
      dispatch(setUser(body.token))
      browserHistory.push('/')
      // store user in store & save token
    }
  })
  .catch((msg) => {
    return Promise.reject({ _error: msg.error })
  })
}

export function login(user, dispatch) {
  // dispatch starting login action
  return fetch('/api/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then((response) => {
    console.log(response);
    return response.json()
    .then((json) => {
      return {
        status: response.status,
        body: json
      }
    });
  })
  .then(({ status, body }) => {
    console.log("status:", status, "body:", body)
    if(status >= 400) {
      // dispatch error action
      dispatch(loginFailure('failed to login'))
      console.log("bodyerror", body);
      return Promise.reject({ _error: body.error })
    } else {
      // dispatch login action
      dispatch(setUser(body.token))
      browserHistory.push('/')
      // store user in store & save token
    }
  })
}

const _decodeToken = (token) => {
  return window.atob(token.split('.')[1]);
};

export const setUser = (token) => {
  console.log(" after login set user!");
  return (dispatch, getState) => {
    console.log("token-----", token);
    var user = JSON.parse(_decodeToken(token));
    localStorage.setItem('token', token);

    console.log("token", token);
    // dispatch(receiveLogin({ user, token }));
    // dispatch action to set user & token in redux state
    dispatch(loginSuccess(user));
    console.log("user!!", user);
  };
};

function logoutSuccess() {
  console.log("inside logout success")
  return {
    type: LOGOUT_SUCCESS
  }
}

export const logout = () => {
  console.log("logout called!")
  return (dispatch, getState) => {
    console.log("removing local storage token")
    localStorage.removeItem('token');
    console.log("local storage token:", localStorage.getItem('token'))
    dispatch(logoutSuccess())
    console.log("about to push browser Hsitory!")
    browserHistory.push('/login')
  }
}
