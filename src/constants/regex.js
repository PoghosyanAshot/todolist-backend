"use strict";

const REGEX = {
    // Validates a real email format (e.g., example@mail.com)
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    // Password: At least 6 characters, contains both letters and numbers (milder security variant)
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,

    // Username: Only alphanumeric characters and underscores (_), between 3 and 30 characters
    USERNAME: /^[a-zA-Z0-9_]{3,30}$/,

    // Validates if the ID is a valid 24-character MongoDB ObjectId
    // CRITICAL: Prevents application crashes from unhandled cast errors when querying the DB
    OBJECT_ID: /^[0-9a-fA-F]{24}$/,

    // Disallows HTML tags (Basic XSS protection for inputs like titles or descriptions)
    NO_HTML_TAGS: /^[^<>]+$/,

    // Only alphanumeric characters and spaces (e.g., for clean To-Do titles)
    ALPHA_NUMERIC_SPACES: /^[a-zA-Z0-9 ]+$/,
};

module.exports = REGEX;
