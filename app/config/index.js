require("dotenv").config();
const { Pool } = require("pg/lib");

const getDbInfo = () => {
  if (process.env.NODE_ENV && process.env.NODE_ENV.includes("development")) {
    return {
      host: process.env.DEV_DB_HOST,
      port: process.env.DEV_DB_PORT,
      user: process.env.DEV_DB_USERNAME,
      password: process.env.DEV_DB_PASSWORD,
      database: process.env.DEV_DB_DATABASE,
    };
  } else {
    return {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };
  }
};

const masterDbPool = new Pool(getDbInfo());

masterDbPool.on("error", function (err, client) {
  console.error("Unexpected error in idle client!...", err);
  process.exit(-1);
});

module.exports = masterDbPool;
