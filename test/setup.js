// @flow

import { jsdom } from 'jsdom';

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;

Object
  .keys(document.defaultView)
  .forEach(property => {
    if (typeof global[property] === 'undefined') {
      exposedProperties.push(property);
      global[property] = document.defaultView[property];
    }
  });

global.navigator = {
  userAgent: 'node.js'
};

// Configure node to skip imports of files with the following extensions
const skipExtensions = ['css', 'jpg', 'png', 'gif', 'eot', 'svg', 'ttf', 'woff', 'woff2', 'mp4', 'webm'];
const noop = () => null;
skipExtensions.forEach(ext => require.extensions[`.${ext}`] = noop);
