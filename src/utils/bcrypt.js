"use strict";

const bcrypt = require("bcrypt");

class Hash {
    static async hashPassword(password) {
        return bcrypt.hash(password, 12);
    }

    static async compare(candidatePassword, originalPassowrd) {
        return bcrypt.compare(candidatePassword, originalPassowrd);
    }
}

module.exports = Hash;
