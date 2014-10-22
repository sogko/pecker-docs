'use strict';

var log = require('loglevel');
var utils = require('common/utils');

module.exports = function () {
  log.debug('block.js');
  log.debug('block.js utils()', utils());
  return 'VALUE RETURNED FROM blockblockblock';

};