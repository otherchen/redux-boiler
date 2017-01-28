import { SubmissionError } from 'redux-form';
import { serverError } from 'redux/modules/error';
import { browserHistory } from 'react-router';
import { logoutSuccess } from 'redux/modules/user';
import fetch from 'isomorphic-fetch';
import Token from 'utils/token';
import _ from 'lodash';

/*
  This is a wrapper object around the fetch api.
  It allows us to handle errors and redirects in one place.

  Example GET:

    const body = await fetcher.get('api.test.com/resources', dispatch);

  Example POST:

    const body = await fetcher.post('api.test.com/submit', dispatch, {
      body: { data: 'data' },
      form: true,
    });
*/

function request(url, dispatch, options) {
  let  defaultOpts = {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Token.get()
    }
  };

  if(options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }

  if(options.bearer && typeof options.bearer === 'string') {
    options.headers['Authorization'] = 'Bearer ' + options.bearer;
  }

  options = _.merge({}, defaultOpts, options);

  return fetch(url, options)
  .then((response) => {
    return response.text()
    .then((text) => {
      let body;
      try {
        body = JSON.parse(text);
      } catch (e) {
        body = text;
      }
      return {
        response: response,
        body: body
      };
    })
  })
  .then(({response, body}) => {
    if(response.ok) {
      return body;
    } else {
      if(response.status === 401) dispatch(logoutSuccess());
      const error = body.error || 'An unexpected error has occured';
      throw options.form ? new SubmissionError({ _error: error }) : dispatch(serverError(error));
    }
  });
}

let wrapper = {};
_.forEach(['get', 'post', 'put', 'delete'], (method) => {
  wrapper[method] = (url, dispatch, options) => {
    if(!options) { options = {}; }
    options.method = method;
    return request(url, dispatch, options);
  };
});

export default wrapper;
