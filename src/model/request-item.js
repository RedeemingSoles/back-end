'use strict';

import mongoose from 'mongoose';
import HttpError from 'http-errors';
import ShoesRequestForm from './shoes-request-form';

const requestItemSchema = mongoose.Schema({
  childName: {
    type: String,
  },
  shoeType: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  requestedOnDate: { 
    type: Date,
    default: () => new Date(),
  },
  shoesRequestForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shoesRequestForm',
    required: true,
  },
});

function requestItemPreHook(done) {
  return ShoesRequestForm.findById(this.shoesRequestForm)
    .then((shoesRequestFormFound) => {
      if (!shoesRequestFormFound) {
        throw new HttpError(404, 'Shoe-request form not found');
      }
      shoesRequestFormFound.requestItems.push(this._id);
      return shoesRequestFormFound.save();
    })
    .then(() => done());
}

requestItemSchema.pre('save', requestItemPreHook);

export default mongoose.model('requestItem', requestItemSchema);
