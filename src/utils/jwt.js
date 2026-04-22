"use strict";

const jwt = require("jsonwebtoken");
const ENV = require("../configs/env");

class JWT {
    static generateAccessToken(payload) {
        return jwt.sign(payload, ENV.JWT.JWT_ACCESS_SECRET, {
            expiresIn: ENV.JWT.JWT_ACCESS_EXPIRES_IN,
        });
    }

    static generateRefreshToken(payload) {
        return jwt.sign(payload, ENV.JWT.JWT_REFRESH_SECRET, {
            expiresIn: ENV.JWT.JWT_REFRESH_EXPIRES_IN,
        });
    }

    static verifyAccessToken(accessToken) {
        return jwt.verify(accessToken, ENV.JWT.JWT_ACCESS_SECRET);
    }

    static verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, ENV.JWT.JWT_REFRESH_SECRET);
    }
}

module.exports = JWT;
