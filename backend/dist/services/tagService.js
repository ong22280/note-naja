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
exports.getAllNotesOfTag = exports.deleteTag = exports.getTagByName = exports.getAllTags = exports.createTag = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createTag(name) {
    return __awaiter(this, void 0, void 0, function* () {
        // if tag already exists, return the tag
        const tag = yield prisma.tag.findUnique({
            where: {
                name,
            },
        });
        if (tag) {
            return tag;
        }
        else {
            const newTag = yield prisma.tag.create({
                data: {
                    name,
                },
            });
            return newTag;
        }
    });
}
exports.createTag = createTag;
function getAllTags() {
    return __awaiter(this, void 0, void 0, function* () {
        const tags = yield prisma.tag.findMany();
        return tags;
    });
}
exports.getAllTags = getAllTags;
function getTagByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const tag = yield prisma.tag.findUnique({
            where: {
                name,
            },
            include: {
                notes: true,
            },
        });
        return tag;
    });
}
exports.getTagByName = getTagByName;
function deleteTag(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.tag.delete({
            where: {
                name,
            },
        });
    });
}
exports.deleteTag = deleteTag;
function getAllNotesOfTag(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const tag = yield prisma.tag.findUnique({
            where: {
                name,
            },
            include: {
                notes: true,
            },
        });
        return tag;
    });
}
exports.getAllNotesOfTag = getAllNotesOfTag;
