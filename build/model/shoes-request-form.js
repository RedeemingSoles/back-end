'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shoesRequestFormSchema = _mongoose2.default.Schema({
  receivedDated: {
    type: Date,
    default: function _default() {
      return new Date();
    }
  },
  orderCompleteDate: {
    type: Date
  },
  requestItems: [],
  client: {
    type: _mongoose2.default.Schema.ObjectId,
    required: true
  }
}, {
  usePushEach: true
});

function shoeRequestFormPreHook(done) {
  var _this = this;

  return _client2.default.findById(this.client).then(function (clientFound) {
    if (!clientFound) {
      throw new _httpErrors2.default(404, 'Client not found');
    }
    clientFound.clientRequests.push(_this._id);
    return clientFound.save();
  }).then(function () {
    return done();
  });
}

shoesRequestFormSchema.pre('save', shoeRequestFormPreHook);

exports.default = _mongoose2.default.model('shoesRequestForm', shoesRequestFormSchema);