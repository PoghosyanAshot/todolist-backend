"use strict";

const Joi = require("joi");
const { LIMITS, REGEX, MESSAGES, JOI_KEYS } = require("../constants");

const authValidation = {
    register: {
        body: Joi.object({
            username: Joi.string()
                .trim()
                .lowercase()
                .min(LIMITS.USER.USERNAME_MIN_LENGTH)
                .max(LIMITS.USER.USERNAME_MAX_LENGTH)
                .pattern(REGEX.USERNAME)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.AUTH.USERNAME_REQUIRED,
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
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.AUTH.EMAIL_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.AUTH.EMAIL_REQUIRED,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.AUTH.EMAIL_INVALID,
                }),

            password: Joi.string()
                .min(LIMITS.USER.PASSWORD_MIN_LENGTH)
                .required()
                .pattern(REGEX.PASSWORD)
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED,
                    [JOI_KEYS.EMPTY]:
                        MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED,
                    [JOI_KEYS.MIN]: MESSAGES.VALIDATION.AUTH.PASSWORD_LENGTH,
                    [JOI_KEYS.PATTERN]:
                        MESSAGES.VALIDATION.AUTH.PASSWORD_INVALID,
                }),
        }),
    },

    login: {
        body: Joi.object({
            email: Joi.string()
                .pattern(REGEX.EMAIL)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.AUTH.EMAIL_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.AUTH.EMAIL_REQUIRED,
                }),

            password: Joi.string()
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED,
                    [JOI_KEYS.EMPTY]:
                        MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED,
                }),
        }),
    },
};

module.exports = authValidation;
