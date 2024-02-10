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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.user.findMany();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                notes: true,
            },
        });
        return user;
    });
}
exports.getUserById = getUserById;
function updateUser(id, name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = yield prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                password,
            },
        });
        return updatedUser;
    });
}
exports.updateUser = updateUser;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.delete({
            where: {
                id,
            },
        });
    });
}
exports.deleteUser = deleteUser;
