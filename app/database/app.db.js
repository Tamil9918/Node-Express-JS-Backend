const masterPool = require("../config");
const { getData } = require("../controllers/app.controller");

module.exports = {
  getData: async () => {
    let client = await masterPool.connect();
    try {
      let response = await client.query("SELECT __sp_get_data()");
      return response?.rows[0]?.__sp_get_data;
    } catch ({ message }) {
      throw new Error(message);
    } finally {
      await client.release();
    }
  },
  getDataById: async (id) => {
    let client = await masterPool.connect();
    try {
      let response = await client.query("SELECT __sp_get_data_by_id($1)", [id]);
      return response?.rows[0]?.__sp_get_data_by_id;
    } catch ({ message }) {
      throw new Error(message);
    } finally {
      await client.release();
    }
  },
};
