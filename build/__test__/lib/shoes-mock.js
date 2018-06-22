'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shoes = require('../../model/shoes');

var _shoes2 = _interopRequireDefault(_shoes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeShoesMock = function removeShoesMock() {
  return Promise.all([_shoes2.default.remove({})]);
};

exports.default = removeShoesMock;