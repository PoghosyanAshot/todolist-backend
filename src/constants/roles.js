"use strict";

const deepFreeze = require("../utils/deepFreeze");

const ROLES = deepFreeze({
    USER: "user",
    ADMIN: "admin",
});

module.exports = ROLES;
