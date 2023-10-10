const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const inventorySchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  normalDiscountedPrice: {
    type: Number,
    required: true,
  },
  offerDiscountedPrice: {
    type: Number,
    required: true,
  },
  withoutTaxPrice: {
    type: Number,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

inventorySchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Inventory', inventorySchema);
