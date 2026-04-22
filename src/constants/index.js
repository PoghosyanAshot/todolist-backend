"use strict";

const REGEX = require("./regex");
const MESSAGES = require("./responseMessages");
const LIMITS = require("./validationLimits");
const ROLES = require("./roles");
const JOI_KEYS = require("./joiKeys");
const HTTP_STATUS = require("./httpStatuses");

module.exports = {
    REGEX,
    MESSAGES,
    LIMITS,
    ROLES,
    JOI_KEYS,
    HTTP_STATUS,
};
