const appDb = require("../database/app.db");
const { handleResponse, handleError } = require("../Utils");
const { fetchSuccessful, uploadSuccessful, error } =
  require("../constants").messages;
const { publishVectorToDb } = require("../models/vectorUpload.model");
exports.getData = async (req, res) => {
  try {
    const response = await appDb.getData();
    return handleResponse(res, fetchSuccessful, response);
  } catch ({ message }) {
    return handleError(res, message, 404);
  }
};
exports.getDataById = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await appDb.getDataById(id);
    return handleResponse(res, fetchSuccessful, response);
  } catch ({ message }) {
    return handleError(res, message, 404);
  }
};
exports.publishVector = async (req, res) => {
  try {
    const { lyrPath, lyrName, schema } = req.body;
    const response = await publishVectorToDb(lyrPath, lyrName, schema);
    if (response?.layerUploaded) {
      return handleResponse(res, uploadSuccessful, response);
    } else {
      return handleResponse(res, error, response);
    }
  } catch ({ message }) {
    return handleError(res, message, 404);
  }
};
