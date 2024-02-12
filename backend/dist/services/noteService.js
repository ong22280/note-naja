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
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getAllNotes = exports.createNote = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createNote(title, content, userId, category, tags) {
    return __awaiter(this, void 0, void 0, function* () {
        // if tags is undefined, create note without tags
        if (tags === undefined) {
            const note = yield prisma.note.create({
                data: {
                    title,
                    content,
                    userId,
                    category,
                    logs: {
                        create: [
                            {
                                title: title,
                                content: content,
                                category: category,
                            },
                        ],
                    },
                },
            });
            return note;
        }
        else {
            // check if tag already exists, if not, create tag
            const existingTags = yield prisma.tag.findMany({
                where: {
                    name: {
                        in: tags,
                    },
                },
            });
            const existingTagNames = existingTags.map((tag) => tag.name);
            const newTags = tags.filter((tag) => !existingTagNames.includes(tag));
            yield prisma.tag.createMany({
                data: newTags.map((name) => ({
                    name,
                })),
                skipDuplicates: true,
            });
            const createdTags = yield prisma.tag.findMany({
                where: {
                    name: {
                        in: tags,
                    },
                },
            });
            const allTags = [...existingTags, ...createdTags];
            const note = yield prisma.note.create({
                data: {
                    title,
                    content,
                    userId,
                    category,
                    tags: {
                        connect: allTags.map((tag) => ({
                            id: tag.id,
                        })),
                    },
                    logs: {
                        create: [
                            {
                                title: title,
                                content: content,
                                category: category,
                                tags: {
                                    connect: allTags.map((tag) => ({
                                        id: tag.id,
                                    })),
                                },
                            },
                        ],
                    },
                },
            });
            return note;
        }
    });
}
exports.createNote = createNote;
function getAllNotes() {
    return __awaiter(this, void 0, void 0, function* () {
        const notes = yield prisma.note.findMany({
            include: {
                user: true,
                logs: true,
                tags: true,
            },
        });
        return notes;
    });
}
exports.getAllNotes = getAllNotes;
function getNoteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield prisma.note.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                logs: true,
                tags: true,
            },
        });
        return note;
    });
}
exports.getNoteById = getNoteById;
function updateNote(id, title, content, category, tags) {
    return __awaiter(this, void 0, void 0, function* () {
        // if tags is undefined, update note without tags
        if (tags === undefined) {
            const updatedNote = yield prisma.note.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                    category,
                },
            });
            // create log
            yield prisma.log.create({
                data: {
                    title: title,
                    content: content,
                    noteId: id,
                    category: category,
                },
            });
            return updatedNote;
        }
        else if (tags.length === 0) {
            const updatedNote = yield prisma.note.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                    category,
                    tags: { set: [] },
                },
            });
            // create log
            yield prisma.log.create({
                data: {
                    title: title,
                    content: content,
                    noteId: id,
                    category: category,
                },
            });
            return updatedNote;
        }
        else {
            // before update, check if tag is unused, if unused, disconnect tag
            const unusedTags = yield prisma.tag.findMany({
                where: {
                    name: {
                        notIn: tags,
                    },
                },
            });
            console.log("unusedTags: ", unusedTags);
            // check if tag already exists, if not, create tag
            const existingTags = yield prisma.tag.findMany({
                where: {
                    name: {
                        in: tags,
                    },
                },
            });
            const existingTagNames = existingTags.map((tag) => tag.name);
            const newTags = tags.filter((tag) => !existingTagNames.includes(tag));
            if (unusedTags.length > 0) {
                yield prisma.note.update({
                    where: {
                        id,
                    },
                    data: {
                        tags: {
                            disconnect: unusedTags.map((tag) => ({
                                id: tag.id,
                            })),
                        },
                    },
                });
            }
            yield prisma.tag.createMany({
                data: newTags.map((name) => ({
                    name,
                })),
                skipDuplicates: true,
            });
            const createdTags = yield prisma.tag.findMany({
                where: {
                    name: {
                        in: tags,
                    },
                },
            });
            const allTags = [...existingTags, ...createdTags];
            const updatedNote = yield prisma.note.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                    category,
                    tags: {
                        connect: allTags.map((tag) => ({
                            id: tag.id,
                        })),
                    },
                },
            });
            // create log
            yield prisma.log.create({
                data: {
                    title: title,
                    content: content,
                    noteId: id,
                    category: category,
                    tags: {
                        connect: allTags.map((tag) => ({
                            id: tag.id,
                        })),
                    },
                },
            });
            return updatedNote;
        }
    });
}
exports.updateNote = updateNote;
function deleteNote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.log.deleteMany({
            where: {
                noteId: id,
            },
        });
        yield prisma.note.delete({
            where: {
                id,
            },
        });
    });
}
exports.deleteNote = deleteNote;
