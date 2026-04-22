"use strict";

const { NotFoundError } = require("../errors");

const routNotFound = (req, res, next) => {
    next(
        new NotFoundError(`Route ${req.originalUrl} not found on this server`),
    );
};

module.exports = routNotFound;
