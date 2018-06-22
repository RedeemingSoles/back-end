'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeShoesRequestFormMock = exports.createShoesRequestFormMock = undefined;

var _clientMock = require('./client-mock');

var _shoesRequestForm = require('../../model/shoes-request-form');

var _shoesRequestForm2 = _interopRequireDefault(_shoesRequestForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createShoesRequestFormMock = function createShoesRequestFormMock() {
  var resultMock = {};

  return (0, _clientMock.createClientMock)().then(function (clientSetMock) {
    resultMock.clientSetMock = clientSetMock;
    return new _shoesRequestForm2.default({
      client: clientSetMock.client._id
    }).save();
  });
};

var removeShoesRequestFormMock = function removeShoesRequestFormMock() {
  return Promise.all([_shoesRequestForm2.default.remove({}), (0, _clientMock.removeClientMock)()]);
};

exports.createShoesRequestFormMock = createShoesRequestFormMock;
exports.removeShoesRequestFormMock = removeShoesRequestFormMock;