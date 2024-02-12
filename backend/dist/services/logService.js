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
exports.deleteLog = exports.updateLog = exports.getLogById = exports.getAllLogs = exports.createLog = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createLog(title, content, noteId, category, tags) {
    return __awaiter(this, void 0, void 0, function* () {
        // if tags is undefined, create note without tags
        if (tags === undefined) {
            const log = yield prisma.log.create({
                data: {
                    title,
                    content,
                    noteId,
                    category,
                },
            });
            return log;
        }
        else {
            const log = yield prisma.log.create({
                data: {
                    title,
                    content,
                    noteId,
                    category,
                    tags: {
                        create: tags.map((name) => ({
                            name,
                        })),
                    },
                },
            });
            return log;
        }
    });
}
exports.createLog = createLog;
function getAllLogs() {
    return __awaiter(this, void 0, void 0, function* () {
        const logs = yield prisma.log.findMany({
            include: {
                note: true,
                tags: true,
            },
        });
        return logs;
    });
}
exports.getAllLogs = getAllLogs;
function getLogById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = yield prisma.log.findUnique({
            where: {
                id,
            },
            include: {
                note: true,
                tags: true,
            },
        });
        return log;
    });
}
exports.getLogById = getLogById;
function updateLog(id, title, content, category, tags) {
    return __awaiter(this, void 0, void 0, function* () {
        // if tags is undefined, update note without tags
        if (tags === undefined) {
            const updatedLog = yield prisma.log.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                    category,
                },
            });
            return updatedLog;
        }
        else {
            const updatedLog = yield prisma.log.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                    category,
                    tags: {
                        create: tags.map((name) => ({
                            name,
                        })),
                    },
                },
            });
            return updatedLog;
        }
    });
}
exports.updateLog = updateLog;
function deleteLog(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.log.delete({
            where: {
                id,
            },
        });
    });
}
exports.deleteLog = deleteLog;
