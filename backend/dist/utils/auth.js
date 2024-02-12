"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.refreshToken = exports.clearToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const generateToken = (res, userId) => {
    const jwtSecret = process.env.ACCESS_TOKEN_SECRET || "";
    const token = jsonwebtoken_1.default.sign({ userId }, jwtSecret, {
        expiresIn: "1d",
        algorithm: "HS256",
    });
    return token;
};
exports.generateToken = generateToken;
const refreshToken = (res, userId) => {
    const jwtSecret = process.env.REFRESH_TOKEN_SECRET || "";
    const token = jsonwebtoken_1.default.sign({ userId }, jwtSecret, {
        expiresIn: "1d",
        algorithm: "HS256",
    });
    return token;
};
exports.refreshToken = refreshToken;
const clearToken = (res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
};
exports.clearToken = clearToken;
const verifyToken = (req, res) => {
    try {
        if (!req.headers["authorization"]) {
            return res.status(401).json({ message: "You are not authenticated" });
        }
        const token = req.headers["authorization"].split(" ")[1];
        const jwtSecret = process.env.ACCESS_TOKEN_SECRET || "";
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!decoded || !decoded.userId) {
            throw new errorMiddleware_1.BadRequestError("UserId not found");
        }
        return decoded;
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.verifyToken = verifyToken;
