"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateAvatar = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getMe = exports.getAllUsers = void 0;
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModel = __importStar(require("../services/userService"));
const auth_1 = require("../utils/auth");
const getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel.getAllUsers();
    res.status(200).json(users);
}));
exports.getAllUsers = getAllUsers;
const getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = (0, auth_1.verifyToken)(req, res);
        if (!decoded || !decoded.userId) {
            throw new errorMiddleware_1.BadRequestError("UserId not found");
        }
        const userId = parseInt(decoded.userId);
        const user = yield UserModel.getUserById(userId);
        if (!user) {
            throw new errorMiddleware_1.BadRequestError("User not available");
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.getMe = getMe;
const getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const user = yield UserModel.getUserById(userId);
    if (!user) {
        throw new errorMiddleware_1.BadRequestError("User not found");
    }
    res.status(200).json(user);
}));
exports.getUserById = getUserById;
const updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const { name } = req.body;
    const updatedUser = yield UserModel.updateUser(userId, name);
    res.status(200).json(updatedUser);
}));
exports.updateUser = updateUser;
const deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    yield UserModel.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
}));
exports.deleteUser = deleteUser;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
// Set up multer storage configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // ใช้ path.join เพื่อรวมเส้นทางโฟลเดอร์เข้าด้วยกัน
        cb(null, path_1.default.join(__dirname, "../../uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
// Initialize multer upload middleware
const upload = (0, multer_1.default)({ storage: storage }).single("avatar");
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle the upload using multer middleware
    upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                // Handle any upload error
                return res.status(500).json({ message: "Avatar upload failed" });
            }
            try {
                // Get the user ID from request parameters
                const userId = parseInt(req.params.id);
                // Check if req.file is defined before accessing its properties
                if (!req.file) {
                    return res.status(400).json({ message: "No file uploaded" });
                }
                // Get the file path of the uploaded avatar
                const avatarPath = req.file.path;
                // Update the user's avatar path in the database
                const updatedUser = yield UserModel.updateAvatar(userId, avatarPath);
                // Respond with the updated user object
                res.status(200).json(updatedUser);
            }
            catch (error) {
                // Handle any other errors
                res.status(500).json({ message: "Internal server error" });
            }
        });
    });
});
exports.updateAvatar = updateAvatar;
