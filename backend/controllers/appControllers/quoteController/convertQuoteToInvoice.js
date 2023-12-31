const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('Quote');
const InventoryModel = mongoose.model('Inventory');

const convertQuoteToInventory = async (req, res) => {
  try {
    const quoteId = req.params.id; // Assuming the quote ID is passed in the URL

    // Fetch the quote from the database
    const quote = await Model.findById(quoteId);
    if (!quote) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Quote not found',
      });
    }

    // If the quote is already converted, prevent creating another inventory
    if (quote.converted) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'Quote is already converted to an inventory.',
      });
    }

    // Convert the quote details to inventory details
    const invoiceData = {
      number: quote.number,
      year: quote.year,
      date: moment(),
      expiredDate: moment().add(1, 'month'),
      client: quote.client,
      items: quote.items.map((item) => ({
        itemName: item.itemName,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),
      taxRate: quote.taxRate,
      subTotal: quote.subTotal,
      taxTotal: quote.taxTotal,
      total: quote.total,
      credit: quote.credit,
      discount: quote.discount,
      note: quote.note,
    };

    // Create the inventory document
    const inventory = await new InventoryModel(invoiceData).save();

    // Mark the quote as converted
    quote.converted = true;
    await quote.save();

    // Return the created inventory
    return res.status(200).json({
      success: true,
      result: quote,
      message: 'Successfully converted quote to inventory',
    });
  } catch (err) {
    // If error is because of Invalid ObjectId
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid ID format',
      });
    } else {
      return res.status(500).json({
        success: false,
        result: null,
        message: 'Oops there is an Errorr',
      });
    }
  }
};

module.exports = convertQuoteToInventory;
