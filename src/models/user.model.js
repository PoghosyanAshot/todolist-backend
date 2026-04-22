"use strict";

const { MESSAGES, LIMITS, REGEX, ROLES } = require("../constants");
const Hash = require("../utils/bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, MESSAGES.VALIDATION.AUTH.USERNAME_REQUIRED],
            trim: true,
            lowercase: true,
            minlength: [
                LIMITS.USER.USERNAME_MIN_LENGTH,
                MESSAGES.VALIDATION.AUTH.USERNAME_LENGTH,
            ],
            maxlength: [
                LIMITS.USER.USERNAME_MAX_LENGTH,
                MESSAGES.VALIDATION.AUTH.USERNAME_LENGTH,
            ],
            match: [REGEX.USERNAME, MESSAGES.VALIDATION.AUTH.USERNAME_INVALID],
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: [true, MESSAGES.VALIDATION.AUTH.EMAIL_REQUIRED],
            match: [REGEX.EMAIL, MESSAGES.VALIDATION.AUTH.EMAIL_INVALID],
            maxlength: [
                LIMITS.USER.EMAIL_MAX_LENGTH,
                MESSAGES.VALIDATION.AUTH.EMAIL_INVALID,
            ],
        },

        password: {
            type: String,
            trim: true,
            required: [true, MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED],
            minlength: [
                LIMITS.USER.PASSWORD_MIN_LENGTH,
                MESSAGES.VALIDATION.AUTH.PASSWORD_LENGTH,
            ],
            select: false,
        },

        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (_, ret) {
                delete ret.password;
                delete ret.__v;
                return ret;
            },
        },
    },
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;

    this.password = await Hash.hashPassword(this.password);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await Hash.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
