"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.AuthenticationError = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof AuthenticationError) {
        return res
            .status(401)
            .json({ message: err.message || "You're not authorized" });
    }
    else if (err instanceof BadRequestError) {
        return res.status(400).json({ message: err.message || "Request failed" });
    }
    else {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    // next();
};
exports.errorHandler = errorHandler;
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
    }
}
exports.AuthenticationError = AuthenticationError;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
    }
}
exports.BadRequestError = BadRequestError;
