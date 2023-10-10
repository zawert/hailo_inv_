const mongoose = require('mongoose');

const Model = mongoose.model('Inventory');

const remove = async (req, res) => {
  try {
    const deletedInventory = await Model.findOneAndUpdate(
      {
        _id: req.params.id,
        removed: false,
      },
      {
        $set: {
          removed: true,
        },
      }
    ).exec();

    if (!deletedInventory) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Inventory not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: deletedInventory,
      message: 'Inventory deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      error: err,
      message: 'Oops there is an Error',
    });
  }
};

module.exports = remove;
