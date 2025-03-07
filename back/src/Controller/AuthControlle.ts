import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { prismaClient } from '../Databases/PrismaClient';

import { generateToken, verifyToken } from '../middleware/PassportMiddleware';

import { BadResquestError, UnauthorazedError } from '../helpers/apiErrors';
import { loginSchema } from '../helpers/types/Auth';


export class AuthController {
  async login(req: Request, res: Response) {

    console.log(req.body);

    // const { email, password } = loginSchema.parse(req.body);
    const { email, password } = req.body;

    console.log(email, password);

    if(!email || !password) {
      throw new BadResquestError("Data Not Found")
    }

    const data = await prismaClient.user.findUnique({where: {email: email}})
    
    if(!data) {
      throw new UnauthorazedError("Email or password not found")  
    }

    const varifyPassword = await bcrypt.compare(password, data.password)

    if(!varifyPassword) {
      throw new UnauthorazedError("Email or password not found")  
    }

    const { password:  _, ...user } = data

    const token = generateToken(user);
    return res.status(200).json({user, token: token});
  };

  async token(req: Request, res: Response) {    
    const userToken = req.query.token as string

    if(!userToken) {
      throw new BadResquestError("Token not found")
    }

    const user = verifyToken(userToken)
    
    return res.json({ user })
  }
}