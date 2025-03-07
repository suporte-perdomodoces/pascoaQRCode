"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.privateRouter = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const PrismaClient_1 = require("../Databases/PrismaClient");
const apiErrors_1 = require("../helpers/apiErrors");
dotenv_1.default.config();
const expireTime = "30m";
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
passport_1.default.use(new passport_jwt_1.Strategy(options, async (payload, done) => {
    const user = await PrismaClient_1.prismaClient.user.findUnique({ where: { id: payload.user.id } });
    return user ? done(null, user) : done(new apiErrors_1.UnauthorazedError("Unauthorazed user"), false);
}));
const privateRouter = (req, res, next) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    passport_1.default.authenticate("jwt", (_err, user) => {
        const { password: _, ...dataUser } = user;
        req.user = dataUser;
        return user ? next() : next(new apiErrors_1.UnauthorazedError("Unauthorazed user"));
    })(req, res, next);
};
exports.privateRouter = privateRouter;
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign({ user: data }, process.env.JWT_SECRET, { expiresIn: expireTime });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return user.user;
    }
    catch (error) {
        throw new apiErrors_1.UnauthorazedError("Invalid token!");
    }
};
exports.verifyToken = verifyToken;
exports.default = passport_1.default;
//# sourceMappingURL=PassportMiddleware.js.map