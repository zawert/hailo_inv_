const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('Inventory');
//test
const summary = async (req, res) => {
  return res.status(200).json({
    success: true,
    result: finalResult,
    message: `Successfully found all inventory for the last ${defaultType}`,
  });
};

module.exports = summary;
