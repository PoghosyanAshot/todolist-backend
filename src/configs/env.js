"use strict";

require("dotenv").config({ quiet: true });

const assert = require("../utils/assert");
const deepFreeze = require("../utils/deepFreeze");

const ENV = deepFreeze({
    SERVER: {
        PORT: assert(Number(process.env.PORT)),
        HOST: assert(process.env.HOST),
        NODE_ENV: assert(process.env.NODE_ENV),
    },

    DB: {
        MONGO_URI: assert(process.env.MONGO_URI),
        REDIS_URL: assert(process.env.REDIS_URL),
        REDIS_EX: Number(assert(process.env.REDIS_EX)),
    },

    JWT: {
        JWT_ACCESS_SECRET: assert(process.env.JWT_ACCESS_SECRET),
        JWT_REFRESH_SECRET: assert(process.env.JWT_REFRESH_SECRET),
        JWT_ACCESS_EXPIRES_IN: assert(process.env.JWT_ACCESS_EXPIRES_IN),
        JWT_REFRESH_EXPIRES_IN: assert(process.env.JWT_REFRESH_EXPIRES_IN),
    },
});

module.exports = ENV;
