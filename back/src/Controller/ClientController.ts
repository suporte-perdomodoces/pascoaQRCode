import type { Request, Response } from 'express';
import  { prismaClient } from '../Databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';
import { checkNumberPhone } from '../scripts/checkNumberPhone';



type ClientType = {
  name: string;
  phone: string
}

export class ClientController {

  async create(req: Request, res: Response) {
    const dataClient: ClientType = req.body;

    if (!dataClient.name || !dataClient.phone) {
      throw new BadResquestError("Name and phone is required");
    }

    const isCheckedPhone = checkNumberPhone(dataClient.phone);

    if (!isCheckedPhone) {
      throw new BadResquestError("Invalid phone number");
    }

    const client = await prismaClient.client.create({
      data: {
        name: dataClient.name,
        phone: dataClient.phone
      }
    })

    return res.status(201).json(client);


  };
}