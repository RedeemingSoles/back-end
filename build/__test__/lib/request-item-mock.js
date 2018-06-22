'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeRequestItemMock = exports.createRequestItemMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _shoesRequestFormMock = require('./shoes-request-form-mock');

var _requestItem = require('../../model/request-item');

var _requestItem2 = _interopRequireDefault(_requestItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRequestItemMock = function createRequestItemMock() {
  var resultMock = {};

  return (0, _shoesRequestFormMock.createShoesRequestFormMock)().then(function (shoesRequestFormSetMock) {
    resultMock.shoesRequestFormSetMock = shoesRequestFormSetMock;
    return new _requestItem2.default({
      childName: _faker2.default.name.firstName(),
      shoeType: _faker2.default.lorem.word(),
      age: 'youth',
      gender: 'female',
      shoeSize: _faker2.default.random.number(16),
      message: _faker2.default.lorem.words(30),
      shoesRequestForm: shoesRequestFormSetMock.shoesRequestForm._id
    }).save();
  });
};

var removeRequestItemMock = function removeRequestItemMock() {
  return Promise.all([_requestItem2.default.remove({}), (0, _shoesRequestFormMock.removeShoesRequestFormMock)()]);
};

exports.createRequestItemMock = createRequestItemMock;
exports.removeRequestItemMock = removeRequestItemMock;