'use strict';

// ----------------------------------------------------------------------------------
// Orders are saved to the requesting client and contain a list of the individual request items.
// ----------------------------------------------------------------------------------

import mongoose from 'mongoose';
import HttpError from 'http-errors';
import Client from './client';

const shoesRequestFormSchema = mongoose.Schema({
  receivedDated: { 
    type: Date,
    default: () => new Date(),
  },
  orderCompleteDate: {
    type: Date,
  },
  requestItems: [],
  client: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
}, {
  usePushEach: true,
});

function shoeRequestFormPreHook(done) {
  return Client.findById(this.client)
    .then((clientFound) => {
      if (!clientFound) {
        throw new HttpError(404, 'Client not found');
      }
      clientFound.clientRequests.push(this._id);
      return clientFound.save();
    })
    .then(() => done());
}

shoesRequestFormSchema.pre('save', shoeRequestFormPreHook);

export default mongoose.model('shoesRequestForm', shoesRequestFormSchema);
