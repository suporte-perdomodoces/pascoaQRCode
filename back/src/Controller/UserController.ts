import bcrypt from 'bcrypt';
import type { Request, Response, } from 'express';
import { prismaClient } from '../Databases/PrismaClient';

import { BadResquestError } from '../helpers/apiErrors';
import { generateToken } from '../middleware/PassportMiddleware';


export class UserController {

  async create(req: Request, res: Response) {

    const [name, email, password] = req.body;

    if(!email || !password || !name) {
      throw new BadResquestError("Data is required")
    }

    const varifyEmail = await prismaClient.user.findUnique({where: {email: email}})

    if(varifyEmail) {
      throw new BadResquestError(("Email exist"))
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await prismaClient.user.create({
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

    const token = generateToken(newUser);

    return res.status(201).json({ newUser, token });

  };

  async read(req: Request, res: Response) {

    const [ id, name, email ] = req.body;

    if (id) {
      const user = await prismaClient.user.findUnique({ 
        where: { id: id }, 
        select: {
        id: true,
        name: true,
        email: true
        }
      })

      
      return res.json( { user } )
    }

    if (email) {
      const user = await prismaClient.user.findUnique({
        where: { email: email.toLowerCase().trim() },
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      return res.json( { user } )
    }

    if (name) {
      const users = await prismaClient.user.findMany({
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
      })

      return res.json( { users } )
    }

    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return res.json( { users } )

  };

  async update(req: Request, res: Response) {
    

  };

  async delete(req: Request, res: Response) {
    const id = req.body.id as string;

    try {

      const user = await prismaClient.user.delete({
        where: { id },
      });

      return res.json({ success: true});

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {

      if(err.code === 'P2025') {
        return res.json({ "Error": "Registro não encontrado" });
      }

    }
      
  };

}