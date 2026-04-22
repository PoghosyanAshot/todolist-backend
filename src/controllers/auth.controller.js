"use strict";

const { AuthService } = require("../services");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const { MESSAGES, HTTP_STATUS } = require("../constants");
const ENV = require("../configs/env");

const register = asyncHandler(async (req, res) => {
    const userData = req.body;

    const newUser = await AuthService.register(userData);

    return successResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.SUCCESS.AUTH.REGISTER.code,
        MESSAGES.SUCCESS.AUTH.REGISTER.message,
        newUser,
    );
});

const login = asyncHandler(async (req, res) => {
    const userData = req.body;

    const { accessToken, refreshToken } = await AuthService.login(userData);

    res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: ENV.DB.REDIS_EX * 1000,
        secure: ENV.SERVER.NODE_ENV === "production",
    });

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.AUTH.LOGIN.code,
        MESSAGES.SUCCESS.AUTH.LOGIN.message,
        { accessToken },
    );
});

const logout = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await AuthService.logout(userId);

    res.clearCookie("refresh-token");
    return res.status(HTTP_STATUS.NO_CONTENT).end();
});

const refreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies["refresh-token"];

    const { accessToken, refreshToken } = await AuthService.refreshToken(token);

    res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: ENV.DB.REDIS_EX * 1000,
        secure: ENV.SERVER.NODE_ENV === "production",
    });

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.AUTH.LOGIN.code,
        MESSAGES.SUCCESS.AUTH.LOGIN.message,
        { accessToken },
    );
});

module.exports = {
    register,
    login,
    logout,
    refreshToken,
};
