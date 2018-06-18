'use strict';

import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  contactFirstName: {
    type: String,
    required: true,
  },
  contactLastName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  mailingAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
  },
  clientRequests: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'shoesRequestForm',
    },
  ],
  account: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },
}, {
  usePushEach: true,
});

export default mongoose.model('client', clientSchema);
