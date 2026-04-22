"use strict";

const assert = (p) => {
    if (p === undefined) throw new Error("Property must be initialized");
    return p;
};

module.exports = assert;
