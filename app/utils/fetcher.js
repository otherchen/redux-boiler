import fetch from 'isomorphic-fetch'
import _ from 'lodash'

// By default, this util is set up to recieve and respond with json.
// However, it can easily be tweaked to accomodate your needs. You can
// change the default options and how it handles responses from the server
// to be more dynamic (right now it just assumes the response is in json).

/*
  Example GET:
    fetcher.get('api.test.com/resources)
    .then(function(body) {
      //do anything with the result
    })
    .catch(function(err) {
      //handle server / http status errors
    })

  Example POST:
    fetcher.post('api.test.com/resources', {
      body: { data: "data" }
    })
    .then(function(body) {
      //do anything with the result
    })
    .catch(function(err) {
      //handle server / http status errors
    })
*/

function request(url, options) {

  // Set up options
  let defaultOpts = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if(options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }

  if(options.bearer && typeof options.bearer === 'string') {
    options.headers['Authorization'] = 'Bearer ' + options.bearer
  }

  options = _.merge({}, defaultOpts, options)

  // Perform fetch request
  return fetch(url, options)
  .then((response) => {
    return response.json()
    .then((body) => {
      return {
        response: response,
        body: body
      }
    })
    .catch((err) => {
      if(err) throw err;
    })
  })
  .then(({response, body}) => {
    if(response.ok) {
      return body
    } else {
      throw (body.error || response.statusText)
    }
  })
  .catch((err) => {
    return Promise.reject(err)
  })
}

let wrapper = {}
_.forEach(['get', 'post', 'put', 'delete'], function(method){
  wrapper[method] = (url, options) => {
    if(!options) options = {};
    options.method = method;
    return request(url, options)
  }
})

export default wrapper
