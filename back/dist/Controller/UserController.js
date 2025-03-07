"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const PrismaClient_1 = require("../Databases/PrismaClient");
const apiErrors_1 = require("../helpers/apiErrors");
const PassportMiddleware_1 = require("../middleware/PassportMiddleware");
class UserController {
    async create(req, res) {
        const [name, email, password] = req.body;
        if (!email || !password || !name) {
            throw new apiErrors_1.BadResquestError("Data is required");
        }
        const varifyEmail = await PrismaClient_1.prismaClient.user.findUnique({ where: { email: email } });
        if (varifyEmail) {
            throw new apiErrors_1.BadResquestError(("Email exist"));
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await PrismaClient_1.prismaClient.user.create({
            data: {
                email: email,
                name: name,
                password: hashPassword,
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        const token = (0, PassportMiddleware_1.generateToken)(newUser);
        return res.status(201).json({ newUser, token });
    }
    ;
    async read(req, res) {
        const [id, name, email] = req.body;
        if (id) {
            const user = await PrismaClient_1.prismaClient.user.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return res.json({ user });
        }
        if (email) {
            const user = await PrismaClient_1.prismaClient.user.findUnique({
                where: { email: email.toLowerCase().trim() },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return res.json({ user });
        }
        if (name) {
            const users = await PrismaClient_1.prismaClient.user.findMany({
                where: {
                    name: {
                        contains: name
                    }
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return res.json({ users });
        }
        const users = await PrismaClient_1.prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        return res.json({ users });
    }
    ;
    async update(req, res) {
    }
    ;
    async delete(req, res) {
        const id = req.body.id;
        try {
            const user = await PrismaClient_1.prismaClient.user.delete({
                where: { id },
            });
            return res.json({ success: true });
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        }
        catch (err) {
            if (err.code === 'P2025') {
                return res.json({ "Error": "Registro não encontrado" });
            }
        }
    }
    ;
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map