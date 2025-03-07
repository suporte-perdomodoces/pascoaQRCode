"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const AuthControlle_1 = require("./Controller/AuthControlle");
const ClientController_1 = require("./Controller/ClientController");
const PostController_1 = require("./Controller/PostController");
const UserController_1 = require("./Controller/UserController");
const PassportMiddleware_1 = require("./middleware/PassportMiddleware");
const router = (0, express_1.Router)();
exports.router = router;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const userControlle = new UserController_1.UserController;
const authController = new AuthControlle_1.AuthController;
const postController = new PostController_1.PostController;
const clientController = new ClientController_1.ClientController;
router.get("/ping", (req, res) => {
    return res.send("Pong");
});
router.post('/login', authController.login);
router.get('/token', authController.token);
router.post("user", PassportMiddleware_1.privateRouter, userControlle.create);
router.post('/post', PassportMiddleware_1.privateRouter, upload.single("file"), postController.create);
router.get('/post', PassportMiddleware_1.privateRouter, postController.stream);
router.post('/client', PassportMiddleware_1.privateRouter, clientController.create);
//# sourceMappingURL=router.js.map