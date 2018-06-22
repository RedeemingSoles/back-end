'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _shoesMock = require('./lib/shoes-mock');

var _shoesMock2 = _interopRequireDefault(_shoesMock);

var _server = require('../lib/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT;

describe('shoes-router.test.js', function () {
  beforeAll(_server.startServer);
  afterEach(_shoesMock2.default);
  afterAll(_server.stopServer);
  jest.setTimeout(10000);

  describe('POST /shoes', function () {
    test('POST - should return a 200 status code and a new Shoes.', function () {
      return _superagent2.default.post(apiURL + '/shoes').send({
        shoeType: 'basketball',
        age: 'youth',
        gender: 'female',
        shoeSize: 7,
        donor: 'testShoeDistributor'
      }).then(function (response) {
        expect(response.status).toEqual(200);
        expect(response.body.shoeType).toEqual('basketball');
        expect(response.body.age).toEqual('youth');
        expect(response.body.gender).toEqual('female');
        expect(response.body.shoeSize).toEqual(7);
        expect(response.body.donor).toEqual('testShoeDistributor');
      });
    });
    test('POST - should return a 400 status code for missing required fields.', function () {
      return _superagent2.default.post(apiURL + '/shoes').send({
        age: 'youth',
        gender: 'female',
        shoeSize: 8,
        donor: 'testShoeDistributor'
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(400);
      });
    });
  });

  describe('GET /shoes', function () {
    test('GET - should return a 200 status code and a matched pair of shoes.', function () {
      return _superagent2.default.post(apiURL + '/shoes').send({
        shoeType: 'running-shoes',
        age: 'youth',
        gender: 'male',
        shoeSize: 8,
        donor: 'testShoeDistributor'
      }).then(function () {
        return _superagent2.default.post(apiURL + '/shoes').send({
          shoeType: 'running-shoes',
          age: 'youth',
          gender: 'male',
          shoeSize: 11,
          donor: 'testRunningShoeDistributor'
        }).then(function (postedRunningShoes) {
          return _superagent2.default.get(apiURL + '/shoes/?shoeType=' + postedRunningShoes.body.shoeType + '&age=' + postedRunningShoes.body.age + '&gender=' + postedRunningShoes.body.gender + '&shoeSize=' + postedRunningShoes.body.shoeSize).then(function (response) {
            expect(response.status).toEqual(200);
            expect(response.body.shoeType).toEqual('running-shoes');
            expect(response.body.age).toEqual('youth');
            expect(response.body.gender).toEqual('male');
            expect(response.body.shoeSize).toEqual(11);
            expect(response.body.donor).toEqual('testRunningShoeDistributor');
          });
        });
      });
    });
    test('GET - should return a 400 status code for missing required fields.', function () {
      return _superagent2.default.post(apiURL + '/shoes').send({
        shoeType: 'boots',
        age: 'adult',
        gender: 'male',
        shoeSize: 8,
        donor: 'testShoeDistributor'
      }).then(function () {
        return _superagent2.default.post(apiURL + '/shoes').send({
          shoeType: 'boots',
          age: 'youth',
          gender: 'female',
          shoeSize: 11,
          donor: 'testRunningShoeDistributor'
        }).then(function (postedRunningShoes) {
          return _superagent2.default.get(apiURL + '/shoes/?shoeType=' + postedRunningShoes.body.shoeType + '&age=' + postedRunningShoes.body.age + '&gender=' + postedRunningShoes.body.gender).then(Promise.reject).catch(function (error) {
            expect(error.status).toEqual(400);
          });
        });
      });
    });
  });
});