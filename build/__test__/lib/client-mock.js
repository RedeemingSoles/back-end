'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeClientMock = exports.createClientMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _client = require('../../model/client');

var _client2 = _interopRequireDefault(_client);

var _accountMock = require('./account-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createClientMock = function createClientMock() {
  var resultMock = {};

  return (0, _accountMock.createAccountMock)().then(function (accountSetMock) {
    resultMock.accountSetMock = accountSetMock;
    return new _client2.default({
      organizationName: _faker2.default.company.companyName(),
      contactFirstName: _faker2.default.name.firstName(),
      contactLastName: _faker2.default.name.lastName(),
      title: _faker2.default.lorem.words(1),
      phoneNumber: _faker2.default.phone.phoneNumber(),
      mailingAddress: _faker2.default.address.streetAddress(),
      city: _faker2.default.address.city(),
      state: _faker2.default.address.state(),
      zipCode: _faker2.default.address.zipCode(),
      account: accountSetMock.account._id
    }).save();
  }).then(function (client) {
    resultMock.client = client;
    return resultMock;
  });
};

var removeClientMock = function removeClientMock() {
  return Promise.all([_client2.default.remove({}), (0, _accountMock.removeAccountMock)()]);
};

exports.createClientMock = createClientMock;
exports.removeClientMock = removeClientMock;