require("dotenv").config();

module.exports = {
  handleResponse: async (res, message, data) => {
    return res
      .status(200)
      .json({ status: "Success!", message: message, data: data });
  },
  handleError: async (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
      status: "Failure!",
      message:
        statusCode === 500
          ? "Something went wrong. Please contact the administrator!"
          : message,
    });
  },
};
