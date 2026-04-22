"use strict";

const { UserController } = require("../controllers");
const isAuth = require("../middlewares/auth.middleware");
const UserSchema = require("../validators/user.validator");
const validate = require("../middlewares/validation.middleware");
const router = require("express").Router();

router.use(isAuth());

// (GET /api/users/me)
router.get("/me", UserController.getMe);

// (PATCH /api/users/me)
router.patch(
    "/me",
    validate(UserSchema.updateProfile),
    UserController.updateMe,
);

// (PATCH /api/users/password)
router.patch(
    "/password",
    validate(UserSchema.updatePassword),
    UserController.updatePassword,
);

// (DELETE /api/users/me)
router.delete("/me", UserController.deleteMe);

module.exports = router;
