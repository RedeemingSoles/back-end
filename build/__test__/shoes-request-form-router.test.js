'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _clientMock = require('./lib/client-mock');

var _server = require('../lib/server');

var _shoesRequestForm = require('../model/shoes-request-form');

var _shoesRequestForm2 = _interopRequireDefault(_shoesRequestForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT;

var removeRequestFormMock = function removeRequestFormMock() {
  return Promise.all([_shoesRequestForm2.default.remove({})]);
};

describe('shoes-request-form-router.test.js', function () {
  beforeAll(_server.startServer);
  afterEach(_clientMock.removeClientMock);
  afterEach(removeRequestFormMock);
  afterAll(_server.stopServer);
  jest.setTimeout(10000);

  describe('POST /request', function () {
    test('POST - should return a 200 and the newly added request form.', function () {
      var clientMock = {};
      return (0, _clientMock.createClientMock)().then(function (clientSetMock) {
        clientMock = clientSetMock;
        return clientMock;
      }).then(function () {
        var token = clientMock.accountSetMock.token;

        return _superagent2.default.post(apiURL + '/request').set('Authorization', 'Bearer ' + token).send({
          client: clientMock.client._id
        }).then(function (response) {
          expect(response.status).toEqual(200);
          expect(response.body.requestItems).toEqual([]);
        });
      });
    });
  });
});