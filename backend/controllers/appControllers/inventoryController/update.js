const mongoose = require('mongoose');

const Model = mongoose.model('Inventory');

const update = async (req, res) => {
  try {
    let body = req.body;

    const { itemName, price, normalDiscountedPrice, offerDiscountedPrice, withoutTaxPrice } = body;

    body['itemName'] = itemName;
    body['price'] = price;
    body['normalDiscountedPrice'] = normalDiscountedPrice;
    body['offerDiscountedPrice'] = offerDiscountedPrice;
    body['withoutTaxPrice'] = withoutTaxPrice;

    const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, body, {
      new: true, // return the new result instead of the old one
    }).exec();

    // Returning successfull response
    return res.status(200).json({
      success: true,
      result,
      message: 'we update this document by this id: ' + req.params.id,
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        error: err,
        message: 'Required fields are not supplied',
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        error: err,
        message: 'Oops there is an Error',
      });
    }
  }
};

module.exports = update;
