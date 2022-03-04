const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { checkToken } = require("./users/middleware");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

const userEndpoints = require("./users/router");
const potlucksEndpoints = require("./potlucks/router");
const guestEndpoints = require("./guests/router");
const foodsEndpoints = require("./foods/router");

server.use("/api/users", userEndpoints);
server.use("/api/potlucks", checkToken, potlucksEndpoints);
server.use("/api/guests", guestEndpoints);
server.use("/api/foods", foodsEndpoints);

server.use((err, req, res, next) => {
  const { status, message, stack } = err;
  res.status(status || 500).json({
    message,
    stack,
  });
});

module.exports = server;
