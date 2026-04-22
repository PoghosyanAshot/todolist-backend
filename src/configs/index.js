"use strict";

const ENV = require("./env");
const { redisClient, connectRedis } = require("./redis");
const connectMongoDb = require("./db");

module.exports = {
    ENV,
    redisClient,
    connectRedis,
    connectMongoDb,
};
