'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clientSchema = _mongoose2.default.Schema({
  organizationName: {
    type: String,
    required: true
  },
  contactFirstName: {
    type: String,
    required: true
  },
  contactLastName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  mailingAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  clientRequests: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'shoesRequestForm'
  }],
  account: {
    type: _mongoose2.default.Schema.ObjectId,
    required: true,
    unique: true
  }
}, {
  usePushEach: true
});

exports.default = _mongoose2.default.model('client', clientSchema);