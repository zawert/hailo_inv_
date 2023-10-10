const mongoose = require('mongoose');

const Model = mongoose.model('Client');
const QuoteModel = mongoose.model('Quote');
const InventoryModel = mongoose.model('Inventory');

const remove = async (req, res) => {
  // cannot delete client it it have one inventory or quotes:
  // check if client have inventory or quotes:
  const { id } = req.params;
  try {
    // first find if there alt least one quote or inventory exist corresponding to the client
    const quotes = await QuoteModel.findOne({ client: id, removed: false }).exec();
    if (quotes) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Cannot delete client if client have any quote  or inventory',
      });
    }
    const inventory = await InventoryModel.findOne({ client: id, removed: false }).exec();
    if (inventory) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Cannot delete client if client have any quote or inventory',
      });
    }

    // if no inventory or quote, delete the client
    const result = await Model.findOneAndUpdate(
      { _id: id, removed: false },
      {
        $set: {
          removed: true,
        },
      }
    ).exec();
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No client found by this id: ' + id,
      });
    }
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully Deleted the client by id: ' + id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Oops there is an Error',
      error: err,
    });
  }
};
module.exports = remove;
