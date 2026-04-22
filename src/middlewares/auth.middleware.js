"use strict";

const { UnauthorizedError, ForbiddenError } = require("../errors");
const JWT = require("../utils/jwt");

const isAuth = (allowRoles = []) => {
    return (req, res, next) => {
        try {
            const [type, token] = req.headers.authorization?.split(" ") || [];

            if (type !== "Bearer" || !token) {
                return next(new UnauthorizedError());
            }

            const payload = JWT.verifyAccessToken(token);

            if (allowRoles.length && !allowRoles.includes(payload.role)) {
                throw new ForbiddenError();
            }

            req.user = Object.freeze({
                id: payload.id,
                role: payload.role,
            });

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = isAuth;
