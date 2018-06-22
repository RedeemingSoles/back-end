'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _requestItem = require('../model/request-item');

var _requestItem2 = _interopRequireDefault(_requestItem);

var _client = require('../model/client');

var _client2 = _interopRequireDefault(_client);

var _bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

var _bearerAuthMiddleware2 = _interopRequireDefault(_bearerAuthMiddleware);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonParser = (0, _bodyParser.json)();
var requestItemRouter = new _express.Router();

requestItemRouter.post('/request-item', _bearerAuthMiddleware2.default, jsonParser, function (request, response, next) {
  if (!request.body.shoesRequestForm) {
    return next(new _httpErrors2.default(400, 'REQUEST ITEM - invalid request'));
  }
  return _client2.default.findOne({ account: request.account._id }).then(function (client) {
    request.body.client = client._id;
  }).then(function () {
    return new _requestItem2.default(request.body).save().then(function (requestItem) {
      _logger2.default.log(_logger2.default.INFO, 'POST - responding with a 200 status code.');
      return response.json(requestItem);
    });
  }).catch(next);
});

// TODO:  requestItemRouter.get('/profile/:id', (request, response, next) => {

exports.default = requestItemRouter;