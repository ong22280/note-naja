"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Set up storage for uploaded files
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../../uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + req.body.avatar.originalname);
    },
});
// Create the multer instance
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
