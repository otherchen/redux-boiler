import { jsdom } from 'jsdom';
const exposedProperties = ['window', 'navigator', 'document'];

/* set up in-javascript implementation of the DOM for testing */

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
