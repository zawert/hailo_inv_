const mongoose = require('mongoose');
const XLSX = require('xlsx');
const Model = mongoose.model('Inventory');
const fs = require('fs');

const create = async (req, res) => {
  try {
    let body = req.body;

    // Creating a new document in the collection
    const result = await new Model(body).save();
    const updateResult = await Model.findOneAndUpdate(
      { _id: result._id },
      {
        new: true,
      }
    ).exec();
    // Returning successfull response
    return res.status(200).json({
      success: true,
      result: updateResult,
      message: 'Inventory Item created successfully',
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

const updateFromExcel = async (req, res) => {
  try {
    if (!req.files || !req.files.excelFile) {
      return res.status(400).json({
        success: false,
        message: 'No files were uploaded.',
      });
    }

    const excelFile = req.files.excelFile;
    const filePath = `${__dirname}/${excelFile.name}`;

    await excelFile.mv(filePath);

    const items = readExcel(filePath);

    // Loop through items and upsert each one
    for (let item of items) {
      await Model.findOneAndUpdate(
        {
          itemName: item['ITEM NAME'],
          price: item['MRP'],
          normalDiscountedPrice: item['NORMAL DP'],
          offerDiscountedPrice: item['OFFER DP'],
          withoutTaxPrice: item['WITHOUT TAX'],
        },
        {
          // Spread the item properties here
          ...item,
        },
        // use the unique identifier for upserting
        { upsert: true, new: true }
      ).exec();
    }

    // Optionally delete the file after reading its content
    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      message: 'Data from Excel processed successfully.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error processing Excel file.',
      error,
    });
  }
};

// Helper function

const readExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheet_name_list = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return data;
};

module.exports = {
  create,
  updateFromExcel,
};
