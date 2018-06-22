'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shoesSchema = _mongoose2.default.Schema({
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
  donor: {
    type: String
  },
  receivedDate: {
    type: Date,
    default: function _default() {
      return new Date();
    }
  },
  distributedDate: {
    type: Date
  }
});

exports.default = _mongoose2.default.model('shoes', shoesSchema);