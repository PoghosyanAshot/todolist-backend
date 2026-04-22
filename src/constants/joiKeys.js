"use strict";

const deepFreeze = require("../utils/deepFreeze");

const JOI_KEYS = deepFreeze({
    // Triggered when a required field is completely missing from the request
    REQUIRED: "any.required",

    // Triggered when a field is present but empty (e.g., "")
    EMPTY: "string.empty",

    // Triggered when a string is shorter than the minimum allowed length
    MIN: "string.min",

    // Triggered when a string is longer than the maximum allowed length
    MAX: "string.max",

    // Triggered when a string fails a regular expression (Regex) check
    PATTERN: "string.pattern.base",

    // Triggered when the data type is completely wrong (e.g., sending a string instead of a boolean)
    BASE: "boolean.base",

    // Triggered when an email format is invalid (if using Joi's built-in .email() instead of regex)
    EMAIL: "string.email",
});

module.exports = JOI_KEYS;
