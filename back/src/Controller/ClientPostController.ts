import type { Request, Response } from 'express';
import  { prismaClient } from '../Databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';
import { checkNumberPhone } from '../scripts/checkNumberPhone';



type ClientType = {
  name: string;
  phone: string
}

export class ClientPostController {

  async read(req: Request, res: Response) {
    const clientId = req.query.clientId as string;

    if (!clientId) {
      throw new BadResquestError("clientId is required");
    }

    const client = await prismaClient.client.findUnique({
      where: { id: clientId },
      include: { 
        _count: true,
        post: true 
      },
    });

    if (!client) {
        throw new BadResquestError("Client not found");
    }

    return res.json(client);

  };
}