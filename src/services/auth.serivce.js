"use strict";
const { UserRepository } = require("../repositories");
const JWT = require("../utils/jwt");
const { ENV, redisClient } = require("../configs");
const {
    ConflictError,
    NotFoundError,
    AuthenticationError,
    UnauthorizedError,
} = require("../errors");

class AuthService {
    static async register(userData) {
        const existByEmail = await UserRepository.existsByEmail(userData.email);

        if (existByEmail) {
            throw new ConflictError();
        }

        const user = await UserRepository.create(userData);
        return user;
    }

    static async login(userData) {
        const { email, password } = userData;
        const user = await UserRepository.getUserByEmail(email, true);

        if (!user) {
            throw new AuthenticationError();
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new AuthenticationError();
        }

        const accessToken = JWT.generateAccessToken({
            id: user._id,
            role: user.role,
        });
        const refreshToken = JWT.generateRefreshToken({
            id: user._id,
            role: user.role,
        });

        await redisClient.set(`refreshToken:${user._id}`, refreshToken, {
            EX: ENV.DB.REDIS_EX,
        });

        return { accessToken, refreshToken };
    }

    static async logout(userId) {
        await redisClient.del(`refreshToken:${userId}`);
    }

    static async refreshToken(userToken) {
        if (!userToken) {
            throw new UnauthorizedError();
        }

        const payload = JWT.verifyRefreshToken(userToken);
        const oldToken = await redisClient.get(`refreshToken:${payload.id}`);

        if (userToken !== oldToken) {
            await redisClient.del(`refreshToken:${payload.id}`);
            throw new UnauthorizedError(`refreshToken:${payload.id}`);
        }

        const accessToken = JWT.generateAccessToken({
            id: payload.id,
            role: payload.role,
        });
        const refreshToken = JWT.generateRefreshToken({
            id: payload.id,
            role: payload.role,
        });

        await redisClient.set(`refreshToken:${payload.id}`, refreshToken, {
            EX: ENV.DB.REDIS_EX,
        });

        return { accessToken, refreshToken };
    }
}

module.exports = AuthService;
