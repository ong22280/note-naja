"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.authenticateUser = exports.signupUser = void 0;
const client_1 = require("@prisma/client");
const auth_1 = require("../utils/auth");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const signupUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        // Check if user exists
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(409).json({ message: "The email already exists" });
            return; // Exit the function
        }
        // encrypt password
        const saltRounds = 10; // Number of salt rounds for hashing
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        const newUser = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        (0, auth_1.generateToken)(res, newUser.id.toString());
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        });
    }
    catch (error) {
        throw new errorMiddleware_1.BadRequestError(error);
    }
}));
exports.signupUser = signupUser;
const authenticateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new errorMiddleware_1.AuthenticationError("User not found / password incorrect");
    }
    const access_token = (0, auth_1.generateToken)(res, user.id.toString());
    const refresh_token = (0, auth_1.refreshToken)(res, user.id.toString());
    res.status(200).json({
        access_token,
        refresh_token,
    });
}));
exports.authenticateUser = authenticateUser;
const logoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_1.clearToken)(res);
    res.status(200).json({ message: "Successfully logged out" });
}));
exports.logoutUser = logoutUser;
