"use strict";

class AppError extends Error {
    constructor(message, statusCode, code, errors = null, cause = null) {
        super(message);

        this.code = code;
        this.statusCode = statusCode;
        this.errors = errors;
        this.cause = cause;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
