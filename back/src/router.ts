
import { type Request, type Response, Router } from 'express';
import multer from 'multer';

import { AuthController } from './Controller/AuthControlle';
import { ClientController } from './Controller/ClientController';
import { ClientPostController } from './Controller/ClientPostController';
import { PostController } from './Controller/PostController';
import { QRCodeController } from './Controller/QRCodeController';
import { UserController } from './Controller/UserController';
import { privateRouter } from './middleware/PassportMiddleware';


const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


const userControlle = new UserController
const authController = new AuthController;
const postController = new PostController;
const clientController = new ClientController;
const clientPostController = new ClientPostController;
const qrCodeController = new QRCodeController


router.get("/ping", (req: Request, res: Response) => {
  return res.send("Pong");
})


router.post('/login', authController.login);
router.get('/token', authController.token);

router.post("user", privateRouter, userControlle.create)

router.post('/post', privateRouter, upload.single("file"), postController.create);
router.get('/post', postController.stream);

router.get('/qrcode', privateRouter, qrCodeController.read);

router.post('/client', privateRouter, clientController.create);
router.get('/client', privateRouter, clientController.read);

router.get('/clientPost', privateRouter, clientPostController.read);




export { router };
