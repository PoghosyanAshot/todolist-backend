"use strict";

const { AuthController } = require("../controllers");
const AuthSchema = require("../validators/auth.validator");
const validate = require("../middlewares/validation.middleware");
const isAuth = require("../middlewares/auth.middleware");
const router = require("express").Router();

// (POST /api/auth/register)
router.post(
    "/register",
    validate(AuthSchema.register),
    AuthController.register,
);

// (POST /api/auth/login)
router.post("/login", validate(AuthSchema.login), AuthController.login);

// (POST /api/auth/logout)
router.post("/logout", isAuth(), AuthController.logout);

// (POST /api/auth/refresh-token)
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
