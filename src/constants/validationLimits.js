"use strict";

const deepFreeze = require("../utils/deepFreeze");

const LIMITS = deepFreeze({
    // User & Authentication
    USER: {
        USERNAME_MIN_LENGTH: 3,
        USERNAME_MAX_LENGTH: 30,
        
        // Standard max length for email addresses as per RFC 5321
        EMAIL_MAX_LENGTH: 254, 
        
        PASSWORD_MIN_LENGTH: 6,
        // Prevents Denial of Service (DoS) attacks via overly long passwords during bcrypt hashing
        PASSWORD_MAX_LENGTH: 128, 
    },

    // To-Do Items
    TODO: {
        TITLE_MIN_LENGTH: 1,
        TITLE_MAX_LENGTH: 100,
        
        DESCRIPTION_MAX_LENGTH: 500,
    },

    // Pagination & Query Parameters
    PAGINATION: {
        // Default number of items returned if the client doesn't specify
        DEFAULT_LIMIT: 10,
        
        // Maximum number of items a client can request at once (prevents database overload)
        MAX_LIMIT: 100,
        
        // Default starting page
        DEFAULT_PAGE: 1,
    }
});

module.exports = LIMITS;