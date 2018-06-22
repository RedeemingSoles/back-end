'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _bodyParser = require('body-parser');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _client = require('../model/client');

var _client2 = _interopRequireDefault(_client);

var _bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

var _bearerAuthMiddleware2 = _interopRequireDefault(_bearerAuthMiddleware);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonParser = (0, _bodyParser.json)();
var clientRouter = new _express.Router();

clientRouter.post('/profile', _bearerAuthMiddleware2.default, jsonParser, function (request, response, next) {
  if (!request.account || !request.body.organizationName || !request.body.contactFirstName || !request.body.contactLastName || !request.body.title || !request.body.phoneNumber || !request.body.mailingAddress || !request.body.city || !request.body.state || !request.body.zipCode) {
    return next(new _httpErrors2.default(400, 'AUTH - invalid request'));
  }
  return new _client2.default(_extends({}, request.body, {
    account: request.account._id
  })).save().then(function (client) {
    _logger2.default.log(_logger2.default.INFO, 'Returning a 200 and a new Client');
    return response.json(client);
  }).catch(next);
});

clientRouter.get('/profile/me', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _client2.default.findOne({ account: request.account._id }).then(function (client) {
    if (!client) {
      return next(new _httpErrors2.default(404, 'Client not found'));
    }
    _logger2.default.log(_logger2.default.INFO, 'GET - responding with a 200 status code');
    return response.json(client);
  }).catch(next);
});

clientRouter.get('/profile/:id', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _client2.default.findById(request.params.id).then(function (client) {
    _logger2.default.log(_logger2.default.INFO, 'GET - responding with a 200 status code');
    return response.json(client);
  }).catch(next);
});

clientRouter.put('/profile/:id', _bearerAuthMiddleware2.default, jsonParser, function (request, response, next) {
  var options = { runValidators: true, new: true };
  return _client2.default.findByIdAndUpdate(request.params.id, request.body, options).then(function (updatedclient) {
    _logger2.default.log(_logger2.default.INFO, 'PUT - responding with a 200 status code');
    return response.json(updatedclient);
  }).catch(next);
});

exports.default = clientRouter;