'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _bodyParser = require('body-parser');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _shoes = require('../model/shoes');

var _shoes2 = _interopRequireDefault(_shoes);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonParser = (0, _bodyParser.json)();

var shoesRouter = new _express.Router();

shoesRouter.post('/shoes', jsonParser, function (request, response, next) {
  if (!request.body.shoeType || !request.body.age || !request.body.gender || !request.body.shoeSize) {
    return next(new _httpErrors2.default(400, 'SHOES - invalid request'));
  }
  return new _shoes2.default(_extends({}, request.body)).save().then(function (shoes) {
    _logger2.default.log(_logger2.default.INFO, 'Returning a 200 and a new Shoes');
    return response.json(shoes);
  }).catch(next);
});

shoesRouter.get('/shoes', jsonParser, function (request, response, next) {
  if (!request.query.shoeType || !request.query.age || !request.query.gender || !request.query.shoeSize) {
    return next(new _httpErrors2.default(400, 'SHOES - invalid request'));
  }

  return _shoes2.default.findOne(request.query).then(function (shoes) {
    _logger2.default.log(_logger2.default.INFO, 'GET - responding with a 200 status code and a matched pair of shoes');
    return response.json(shoes);
  }).catch(next);
});

exports.default = shoesRouter;