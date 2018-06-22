'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _client = require('../model/client');

var _client2 = _interopRequireDefault(_client);

var _bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

var _bearerAuthMiddleware2 = _interopRequireDefault(_bearerAuthMiddleware);

var _shoesRequestForm = require('../model/shoes-request-form');

var _shoesRequestForm2 = _interopRequireDefault(_shoesRequestForm);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonParser = (0, _bodyParser.json)();

var shoesRequestFormRouter = new _express.Router();

shoesRequestFormRouter.post('/request', _bearerAuthMiddleware2.default, jsonParser, function (request, response, next) {
  return _client2.default.findOne({ account: request.account._id }).then(function (client) {
    request.body.client = client._id;
  }).then(function () {
    return new _shoesRequestForm2.default(request.body).save().then(function (requestForm) {
      _logger2.default.log(_logger2.default.INFO, 'POST - responding with a 200 status code.');
      return response.json(requestForm);
    });
  }).catch(next);
});

exports.default = shoesRequestFormRouter;