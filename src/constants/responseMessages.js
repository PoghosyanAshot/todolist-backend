"use strict";

const deepFreeze = require("../utils/deepFreeze");

const MESSAGES = deepFreeze({
    // Success Messages
    SUCCESS: {
        GENERAL: {
            code: "SUC_GEN_001",
            message: "Operation completed successfully.",
        },
        AUTH: {
            REGISTER: {
                code: "SUC_AUTH_001",
                message: "User registered successfully.",
            },
            LOGIN: {
                code: "SUC_AUTH_002",
                message: "User logged in successfully.",
            },
            LOGOUT: {
                code: "SUC_AUTH_003",
                message: "User logged out successfully.",
            },
            TOKEN_REFRESHED: {
                code: "SUC_AUTH_004",
                message: "Token refreshed successfully.",
            },
        },
        TODO: {
            CREATED: {
                code: "SUC_TODO_001",
                message: "To-Do item created successfully.",
            },
            FETCHED: {
                code: "SUC_TODO_002",
                message: "To-Do items retrieved successfully.",
            },
            UPDATED: {
                code: "SUC_TODO_003",
                message: "To-Do item updated successfully.",
            },
            DELETED: {
                code: "SUC_TODO_004",
                message: "To-Do item deleted successfully.",
            },
            STATUS_CHANGED: {
                code: "SUC_TODO_005",
                message: "To-Do status updated successfully.",
            },
        },
    },

    // Error Messages
    ERROR: {
        GENERAL: {
            SERVER_ERROR: {
                code: "ERR_GEN_500",
                message: "Internal server error occurred.",
            },
            BAD_REQUEST: {
                code: "ERR_GEN_400",
                message: "Invalid request data provided.",
            },
            NOT_FOUND: {
                code: "ERR_GEN_404",
                message: "Requested resource not found.",
            },
            UNAUTHORIZED: {
                code: "ERR_GEN_401",
                message: "Unauthorized access.",
            },
            FORBIDDEN: {
                code: "ERR_GEN_403",
                message: "You do not have permission for this action.",
            },
        },

        // JWT & Authentication Errors
        AUTH: {
            INVALID_CREDENTIALS: {
                code: "ERR_AUTH_001",
                message: "Invalid email or password.",
            },
            TOKEN_MISSING: {
                code: "ERR_AUTH_002",
                message: "Authentication token is missing.",
            },
            TOKEN_EXPIRED: {
                code: "ERR_AUTH_003",
                message:
                    "Authentication token has expired. Please login again.",
            },
            TOKEN_INVALID: {
                code: "ERR_AUTH_004",
                message: "Authentication token is invalid.",
            },
            REFRESH_TOKEN_INVALID: {
                code: "ERR_AUTH_005",
                message:
                    "Invalid or expired refresh token. Please login again.",
            },
            REFRESH_TOKEN_MISSING: {
                code: "ERR_AUTH_006",
                message: "Refresh token is missing.",
            },
        },

        // User specific Errors
        USER: {
            EMAIL_EXISTS: {
                code: "ERR_USR_001",
                message: "User with this email already exists.",
            },
            USERNAME_EXISTS: {
                code: "ERR_USR_002",
                message: "User with this username already exists.",
            },
            NOT_FOUND: {
                code: "ERR_USR_003",
                message: "User not found.",
            },
        },

        // To-Do specific Errors
        TODO: {
            NOT_FOUND: {
                code: "ERR_TODO_001",
                message: "To-Do item not found.",
            },
            ACCESS_DENIED: {
                code: "ERR_TODO_002",
                message:
                    "You do not have permission to access or modify this To-Do item.",
            },
        },

        // Database / MongoDB Specific Errors
        DATABASE: {
            DUPLICATE_KEY: {
                code: "ERR_DB_11000",
                message: "A duplicate record was found in the database.",
            },
            VALIDATION_FAILED: {
                code: "ERR_DB_VAL",
                message: "Database schema validation failed.",
            },
            CAST_ERROR: {
                code: "ERR_DB_CAST",
                message: "Invalid ID format provided.",
            },
        },
    },

    // Validation Messages (Joi & Mongoose)
    VALIDATION: {
        GENERAL: {
            INVALID_ID: "The provided ID is invalid.",
        },
        AUTH: {
            EMAIL_REQUIRED: "Email is required.",
            EMAIL_INVALID: "Please provide a valid email address.",
            PASSWORD_REQUIRED: "Password is required.",
            PASSWORD_LENGTH: "Password must be at least 6 characters long.",
            PASSWORD_INVALID: "Invalid password format",
            USERNAME_REQUIRED: "Username is required.",
            USERNAME_LENGTH: "Username must be between 3 and 30 characters.",
            USERNAME_INVALID:
                "Invalid username format. Only letters, numbers, and underscores are allowed.",
        },
        TODO: {
            TITLE_REQUIRED: "To-Do title is required.",
            TITLE_LENGTH: "To-Do title cannot exceed 100 characters.",
            DESCRIPTION_MAX_LENGTH: "Description cannot exceed 500 characters.",
            NO_HTML_TAGS: "Text cannot contain HTML tags (< or >).",
            IS_COMPLETED_BOOLEAN:
                "Status (completed) must be a boolean value (true or false).",
        },
    },
});

module.exports = MESSAGES;
