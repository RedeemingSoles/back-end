'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _shoesRequestForm = require('./shoes-request-form');

var _shoesRequestForm2 = _interopRequireDefault(_shoesRequestForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestItemSchema = _mongoose2.default.Schema({
  childName: {
    type: String
  },
  shoeType: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  shoeSize: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  requestedOnDate: {
    type: Date,
    default: function _default() {
      return new Date();
    }
  },
  shoesRequestForm: {
    type: _mongoose2.default.Schema.ObjectId,
    required: true
  }
});

function requestItemPreHook(done) {
  var _this = this;

  return _shoesRequestForm2.default.findById(this.shoesRequestForm).then(function (shoesRequestFormFound) {
    if (!shoesRequestFormFound) {
      throw new _httpErrors2.default(404, 'Shoe-request form not found');
    }
    shoesRequestFormFound.requestItems.push(_this._id);
    return shoesRequestFormFound.save();
  }).then(function () {
    return done();
  });
}

requestItemSchema.pre('save', requestItemPreHook);

exports.default = _mongoose2.default.model('requestItem', requestItemSchema);