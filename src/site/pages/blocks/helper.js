'use strict';

var log = require('loglevel');

module.exports = function () {
  log.debug('helper.js');
  return 'VALUE RETURNED FROM HELPER';
};