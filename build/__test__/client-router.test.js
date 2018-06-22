'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _server = require('../lib/server');

var _accountMock = require('./lib/account-mock');

var _clientMock = require('./lib/client-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT;

describe('CLIENT SCHEMA', function () {
  beforeAll(_server.startServer);
  afterEach(_clientMock.removeClientMock);
  afterAll(_server.stopServer);
  jest.setTimeout(10000);

  describe('POST /profile', function () {
    test('POST - should return a 200 status code and the newly created client-profile.', function () {
      var accountMock = null;
      return (0, _accountMock.createAccountMock)().then(function (accountSetMock) {
        accountMock = accountSetMock;
        return _superagent2.default.post(apiURL + '/profile').set('Authorization', 'Bearer ' + accountMock.token).send({
          organizationName: 'Home Movies',
          contactFirstName: 'John',
          contactLastName: 'McGuirk',
          title: 'Coach',
          phoneNumber: '(123) 456-7891',
          mailingAddress: '123 Denny Way',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98133',
          account: accountSetMock.account._id
        });
      }).then(function (response) {
        expect(response.status).toEqual(200);
        expect(response.body.account).toEqual(accountMock.account._id.toString());
        expect(response.body.organizationName).toEqual('Home Movies');
        expect(response.body.contactFirstName).toEqual('John');
        expect(response.body.contactLastName).toEqual('McGuirk');
        expect(response.body.title).toEqual('Coach');
        expect(response.body.phoneNumber).toEqual('(123) 456-7891');
        expect(response.body.mailingAddress).toEqual('123 Denny Way');
        expect(response.body.city).toEqual('Seattle');
        expect(response.body.state).toEqual('WA');
        expect(response.body.zipCode).toEqual('98133');
      });
    });
    test('POST - should return a 400 status code for missing required values.', function () {
      return (0, _accountMock.createAccountMock)().then(function (accountSetMock) {
        return _superagent2.default.post(apiURL + '/profile').set('Authorization', 'Bearer ' + accountSetMock.token).send({
          contactFirstName: 'Brendan'
        });
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(400);
      });
    });
  });

  describe('GET ROUTES', function () {
    describe('GET /profile', function () {
      test('GET - should return a 200 status code and the newly created client-profile.', function () {
        var clientMock = null;
        return (0, _clientMock.createClientMock)().then(function (clientSetMock) {
          clientMock = clientSetMock;
          return _superagent2.default.get(apiURL + '/profile/' + clientMock.client._id).set('Authorization', 'Bearer ' + clientMock.accountSetMock.token).then(function (response) {
            expect(response.status).toEqual(200);
          });
        });
      });
      test('GET - should return a 400 for no token being passed.', function () {
        var clientMock = null;
        return (0, _clientMock.createClientMock)().then(function (clientSetMock) {
          clientMock = clientSetMock;
          return _superagent2.default.get(apiURL + '/profile/' + clientMock.client._id).then(Promise.reject).catch(function (error) {
            expect(error.status).toEqual(400);
          });
        });
      });
      test('GET - should return a 401 for an invalid token.', function () {
        var clientMock = null;
        return (0, _clientMock.createClientMock)().then(function (clientSetMock) {
          clientMock = clientSetMock;
          return _superagent2.default.get(apiURL + '/profile/' + clientMock.client._id).set('Authorization', 'Bearer invalidToken').then(Promise.reject).catch(function (error) {
            expect(error.status).toEqual(401);
          });
        });
      });
      test('GET - should return a 404 for an invalid id', function () {
        var clientMock = null;
        return (0, _clientMock.createClientMock)().then(function (clientSetMock) {
          clientMock = clientSetMock;
          return _superagent2.default.get(apiURL + '/profile/badID').set('Authorization', 'Bearer ' + clientMock.accountSetMock.token).then(Promise.reject).catch(function (error) {
            expect(error.status).toEqual(404);
          });
        });
      });
    });
  });
});