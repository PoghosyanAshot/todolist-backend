"use strict";

const Joi = require("joi");
const { LIMITS, REGEX, MESSAGES, JOI_KEYS } = require("../constants");

const userValidation = {
    updateProfile: {
        body: Joi.object({
            username: Joi.string()
                .trim()
                .lowercase()
                .min(LIMITS.USER.USERNAME_MIN_LENGTH)
                .max(LIMITS.USER.USERNAME_MAX_LENGTH)
                .pattern(REGEX.USERNAME)
                .messages({
                    [JOI_KEYS.EMPTY]:
                        MESSAGES.VALIDATION.AUTH.USERNAME_REQUIRED,
                    [JOI_KEYS.MIN]: MESSAGES.VALIDATION.AUTH.USERNAME_LENGTH,
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.AUTH.USERNAME_LENGTH,
                    [JOI_KEYS.PATTERN]:
                        MESSAGES.VALIDATION.AUTH.USERNAME_INVALID,
                }),

            email: Joi.string()
                .trim()
                .lowercase()
                .pattern(REGEX.EMAIL)
                .messages({
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.AUTH.EMAIL_REQUIRED,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.AUTH.EMAIL_INVALID,
                }),
        }).min(1),
    },

    updatePassword: {
        body: Joi.object({
            oldPassword: Joi.string()
                .min(LIMITS.USER.PASSWORD_MIN_LENGTH)
                .required()
                .pattern(REGEX.PASSWORD)
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED,
                    [JOI_KEYS.EMPTY]:
                        MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED,
                    [JOI_KEYS.MIN]: MESSAGES.VALIDATION.AUTH.PASSWORD_LENGTH,
                }),
            newPassword: Joi.string()
                .invalid(Joi.ref("oldPassword"))
                .min(LIMITS.USER.PASSWORD_MIN_LENGTH)
                .required()
                .pattern(REGEX.PASSWORD)
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED,
                    [JOI_KEYS.EMPTY]:
                        MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED,
                    [JOI_KEYS.MIN]: MESSAGES.VALIDATION.AUTH.PASSWORD_LENGTH,
                }),
        }),
    },
};

module.exports = userValidation;
