"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const { MESSAGES, HTTP_STATUS } = require("../constants");
const { UserService } = require("../services");

const getMe = asyncHandler(async (req, res) => {
    const user = await UserService.findById(req.user.id);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        { user },
    );
});

const updateMe = asyncHandler(async (req, res) => {
    const updatedUser = await UserService.updateMe(req.user.id, req.body);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        { updatedUser },
    );
});

const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const updatedUser = await UserService.updatePassword(
        req.user.id,
        oldPassword,
        newPassword,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        { updatedUser },
    );
});

const deleteMe = asyncHandler(async (req, res) => {
    await UserService.deleteUser(req.user.id);

    res.clearCookie("refresh-token");

    return res.status(HTTP_STATUS.NO_CONTENT).end();
});

module.exports = {
    getMe,
    updateMe,
    updatePassword,
    deleteMe,
};
