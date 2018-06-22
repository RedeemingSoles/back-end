'use strict';

// ----------------------------------------------------------------------------------
// Shoes are added via the Admin input form and represent inventory.
// ----------------------------------------------------------------------------------

import mongoose from 'mongoose';

const shoesSchema = mongoose.Schema({
  shoeType: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  shoeSize: {
    type: Number,
    required: true,
  },
  donor: {
    type: String,
  },
  receivedDate: { 
    type: Date,
    default: () => new Date(),
  },
  distributedDate: {
    type: Date,
  },
});

export default mongoose.model('shoes', shoesSchema);
