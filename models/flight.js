const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  cost_of_flight: {
    type: Number,
    required: true
  },
  selling_price_of_flight:{
    type: Number,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
})

module.exports = mongoose.model('Flight', flightSchema);