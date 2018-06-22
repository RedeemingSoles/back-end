'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _requestItemMock = require('./lib/request-item-mock');

var _requestItemMock2 = _interopRequireDefault(_requestItemMock);

var _server = require('../lib/server');

var _clientMock = require('./lib/client-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT;

describe('request-item-router.test.js', function () {
  beforeAll(_server.startServer);
  afterAll(_requestItemMock2.default);
  afterAll(_server.stopServer);
  jest.setTimeout(10000);

  describe('POST /request-item', function () {
    test('POST - should return a 200 status code and a request item.', function () {
      var clientMock = {};
      return (0, _clientMock.createClientMock)().then(function (clientSetMock) {
        clientMock = clientSetMock;
        return clientMock;
      }).then(function () {
        clientMock.token = clientMock.accountSetMock.token;
        return _superagent2.default.post(apiURL + '/request').set('Authorization', 'Bearer ' + clientMock.token).send({
          client: clientMock.client._id
        }).then(function (shoesRequestFormSetMock) {
          clientMock.shoesRequestForm = shoesRequestFormSetMock;
          return _superagent2.default.post(apiURL + '/request-item').set('Authorization', 'Bearer ' + clientMock.token).send({
            childName: 'testChildName',
            shoeType: 'basketball',
            age: 'youth',
            gender: 'female',
            shoeSize: 5,
            message: 'Inspirational message from coach.',
            shoesRequestForm: clientMock.shoesRequestForm.body._id
          }).then(function (response) {
            expect(response.status).toEqual(200);
          });
        });
      });
    });
  });
});