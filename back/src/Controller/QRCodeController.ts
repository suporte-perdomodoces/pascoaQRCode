import type { Request, Response } from 'express';
import { prismaClient } from '../Databases/PrismaClient';
import { BadResquestError } from '../helpers/apiErrors';
import { createQRCode } from '../scripts/NewQRCode';

export class QRCodeController {

  async read(req: Request, res: Response) {
    const fileName = req.query.postName as string;

    const post = await prismaClient.post.findFirst({ where: {fileName: fileName }});

    if (!post) {
      throw new BadResquestError("File not found")
    }

    const qrCode = await createQRCode(post.fileName);

    return res.set('Content-Type', 'image/png').send(qrCode);
  };

}