"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const apiErrors_1 = require("./helpers/apiErrors");
const ErrorMiddleware_1 = require("./middleware/ErrorMiddleware");
const router_1 = require("./router");
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use(express_1.default.static(node_path_1.default.join(__dirname, '../files')));
;
server.use(router_1.router);
server.use((req, res) => {
    throw new apiErrors_1.NotFoundError("Router Not Found");
});
server.use(ErrorMiddleware_1.ErrorMiddleware);
server.listen(process.env.PORT ?? 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map