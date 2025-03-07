"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const PrismaClient_1 = require("../Databases/PrismaClient");
const PassportMiddleware_1 = require("../middleware/PassportMiddleware");
const apiErrors_1 = require("../helpers/apiErrors");
class AuthController {
    async login(req, res) {
        console.log(req.body);
        // const { email, password } = loginSchema.parse(req.body);
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            throw new apiErrors_1.BadResquestError("Data Not Found");
        }
        const data = await PrismaClient_1.prismaClient.user.findUnique({ where: { email: email } });
        if (!data) {
            throw new apiErrors_1.UnauthorazedError("Email or password not found");
        }
        const varifyPassword = await bcrypt_1.default.compare(password, data.password);
        if (!varifyPassword) {
            throw new apiErrors_1.UnauthorazedError("Email or password not found");
        }
        const { password: _, ...user } = data;
        const token = (0, PassportMiddleware_1.generateToken)(user);
        return res.status(200).json({ user, token: token });
    }
    ;
    async token(req, res) {
        const userToken = req.query.token;
        if (!userToken) {
            throw new apiErrors_1.BadResquestError("Token not found");
        }
        const user = (0, PassportMiddleware_1.verifyToken)(userToken);
        return res.json({ user });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthControlle.js.map