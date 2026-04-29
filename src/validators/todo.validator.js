"use strict";

const Joi = require("joi");
const { LIMITS, REGEX, MESSAGES, JOI_KEYS } = require("../constants");

const todoValidation = {
    create: {
        body: Joi.object({
            title: Joi.string()
                .trim()
                .min(LIMITS.TODO.TITLE_MIN_LENGTH)
                .max(LIMITS.TODO.TITLE_MAX_LENGTH)
                .pattern(REGEX.NO_HTML_TAGS)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.TODO.TITLE_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.TODO.TITLE_REQUIRED,
                    [JOI_KEYS.MIN]: MESSAGES.VALIDATION.TODO.TITLE_LENGTH,
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.TODO.TITLE_LENGTH,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.TODO.NO_HTML_TAGS,
                }),

            description: Joi.string()
                .trim()
                .max(LIMITS.TODO.DESCRIPTION_MAX_LENGTH)
                .pattern(REGEX.NO_HTML_TAGS)
                .allow("")
                .optional()
                .messages({
                    [JOI_KEYS.MAX]:
                        MESSAGES.VALIDATION.TODO.DESCRIPTION_MAX_LENGTH,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.TODO.NO_HTML_TAGS,
                }),
        }),
    },

    update: {
        body: Joi.object({
            title: Joi.string()
                .trim()
                .min(LIMITS.TODO.TITLE_MIN_LENGTH)
                .max(LIMITS.TODO.TITLE_MAX_LENGTH)
                .pattern(REGEX.NO_HTML_TAGS)
                .messages({
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.TODO.TITLE_REQUIRED,
                    [JOI_KEYS.MIN]: MESSAGES.VALIDATION.TODO.TITLE_LENGTH,
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.TODO.TITLE_LENGTH,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.TODO.NO_HTML_TAGS,
                }),

            description: Joi.string()
                .trim()
                .max(LIMITS.TODO.DESCRIPTION_MAX_LENGTH)
                .pattern(REGEX.NO_HTML_TAGS)
                .allow("")
                .messages({
                    [JOI_KEYS.MAX]:
                        MESSAGES.VALIDATION.TODO.DESCRIPTION_MAX_LENGTH,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.TODO.NO_HTML_TAGS,
                }),

            completed: Joi.boolean().messages({
                [JOI_KEYS.BASE]: MESSAGES.VALIDATION.TODO.IS_COMPLETED_BOOLEAN,
            }),
        }).min(1),
    },
};

module.exports = todoValidation;
