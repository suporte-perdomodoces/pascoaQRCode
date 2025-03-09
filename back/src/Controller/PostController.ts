import fs from "node:fs"
import path from "node:path";
import type { Request, Response } from "express";
import { prismaClient } from "../Databases/PrismaClient";
import { BadResquestError, NotFoundError } from "../helpers/apiErrors";
import { createQRCode } from "../scripts/NewQRCode";
import { salvarPNG, saveFile } from "../scripts/saveFile";


type PostDataType = {
  name: string;
  phone: string;
  nf: string;
  mensagem?: string;
}

export class PostController {
  async create(req: Request, res: Response) {
    const file = req.file;

    const postData: PostDataType = req.body;
    console.log(postData);

    if (!postData.name || !postData.nf || !postData.phone) {
      throw new BadResquestError(`Data is required`);
    }
    

    if (!file) {
      throw new BadResquestError("File is required");
    }

    const dataClient = await prismaClient.client.upsert({
      where: { phone: postData.phone },
      update: {}, // Não há necessidade de atualizar nada caso já exista
      create: { 
        name: postData.name,
        phone: postData.phone

      },
    })
    

    //Lista de mimeType (extenssões aceitas)
    const allowedMimeTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "image/png",
      "image/jpeg",
      "audio/mpeg",
      "audio/ogg",
      "audio/wav",
      "audio/mp3"
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {

      throw new BadResquestError("Only video or audio files are allowed");
    }

    // Chamar a função saveFile com o buffer e o nome original do arquivo
    const fileName = saveFile(file.buffer, file.originalname, dataClient.id);

    const newQRCode = await createQRCode(fileName);

    await prismaClient.post.create({
      data: {
        fileName,
        nf: postData.nf,
        clientId: dataClient.id,
        message: postData?.mensagem
      }
    })

    //Apenas para teste
    salvarPNG(newQRCode, `${fileName}.png`);
    // 
    // return res.json({ newQRCode });
    return res.set('Content-Type', 'image/png').send(newQRCode);
  }

  async stream(req: Request, res: Response) {
    const postName: string = req.query.postName as string;

    const post = await prismaClient.post.findUnique({
        where: { fileName: postName },
    });

    if (!post) {
        throw new NotFoundError("Post not found");
    }

    const filePath = path.join(__dirname, "../../files", post.fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("Arquivo não encontrado no sistema de arquivos");
    }

    // Determinar o tipo MIME com base na extensão do arquivo
    const mimeTypes: Record<string, string> = {
        mp4: "video/mp4",
        webm: "video/webm",
        ogg: "video/ogg",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        mp3: "audio/mpeg",
        wav: "audio/wav",
        ogg_audio: "audio/ogg",
    };

    const extension = post.fileName.split(".").pop() || "";
    const mimeType = mimeTypes[extension] || "application/octet-stream";

    res.setHeader("Content-Type", mimeType);

    // Criar um stream de leitura e enviá-lo como resposta
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
}

}