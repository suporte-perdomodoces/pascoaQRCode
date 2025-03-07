
import { type Request, type Response, Router } from 'express';
import multer from 'multer';

import { AuthController } from './Controller/AuthControlle';
import { ClientController } from './Controller/ClientController';
import { PostController } from './Controller/PostController';
import { UserController } from './Controller/UserController';
import { privateRouter } from './middleware/PassportMiddleware';


const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


const userControlle = new UserController
const authController = new AuthController;
const postController = new PostController;
const clientController = new ClientController;



router.get("/ping", (req: Request, res: Response) => {
  return res.send("Pong");
})


router.post('/login', authController.login);
router.get('/token', authController.token);

router.post("user", privateRouter, userControlle.create)

router.post('/post', privateRouter, upload.single("file"), postController.create);
router.get('/post', privateRouter, postController.stream);

router.post('/client', privateRouter, clientController.create);





export { router };
