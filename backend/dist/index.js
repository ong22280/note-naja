"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const logRouter_1 = __importDefault(require("./routes/logRouter"));
const noteRouter_1 = __importDefault(require("./routes/noteRouter"));
const tagRouter_1 = __importDefault(require("./routes/tagRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.static("../uploads"));
app.use(body_parser_1.default.json()); // To recognize the req obj as a json obj
app.use(body_parser_1.default.urlencoded({ extended: true })); // To recognize the req obj as strings or arrays. extended true to handle nested objects also
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(authRouter_1.default);
app.use("/users", authMiddleware_1.authenticate, userRouter_1.default);
app.use("/logs", authMiddleware_1.authenticate, logRouter_1.default);
app.use("/notes", authMiddleware_1.authenticate, noteRouter_1.default);
app.use("/tags", authMiddleware_1.authenticate, tagRouter_1.default);
app.use(errorMiddleware_1.errorHandler);
