require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");

const corsOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  OptionsSuccessStatus: 204,
};

app.use(cors(corsOption));

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(helmet.xssFilter());

app.use("/", routes);

app.use((err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send("Forbidden");
  } else if (res.status === 404) {
    res.status(404).send("Page Not Found");
  } else if (res.status === 500 || !err.status) {
    res.status(500).send(err?.message);
  } else {
    res.status(err?.status).send(err?.message);
  }
});
module.exports = app;
