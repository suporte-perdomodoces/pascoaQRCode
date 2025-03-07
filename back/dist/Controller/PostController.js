"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const PrismaClient_1 = require("../Databases/PrismaClient");
const apiErrors_1 = require("../helpers/apiErrors");
const NewQRCode_1 = require("../scripts/NewQRCode");
const saveFile_1 = require("../scripts/saveFile");
class PostController {
    async create(req, res) {
        const file = req.file;
        const postData = req.body;
        console.log(postData);
        if (!postData.name || !postData.nf || !postData.phone) {
            throw new apiErrors_1.BadResquestError(`Data is required`);
        }
        if (!file) {
            throw new apiErrors_1.BadResquestError("File is required");
        }
        const dataClient = await PrismaClient_1.prismaClient.client.upsert({
            where: { phone: postData.phone },
            update: {}, // Não há necessidade de atualizar nada caso já exista
            create: {
                name: postData.name,
                phone: postData.phone
            },
        });
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
            throw new apiErrors_1.BadResquestError("Only video or audio files are allowed");
        }
        // Chamar a função saveFile com o buffer e o nome original do arquivo
        const fileName = (0, saveFile_1.saveFile)(file.buffer, file.originalname, dataClient.id);
        const newQRCode = await (0, NewQRCode_1.createQRCode)(fileName);
        await PrismaClient_1.prismaClient.post.create({
            data: {
                fileName,
                nf: postData.nf,
                clientId: dataClient.id,
                message: postData?.mensagem
            }
        });
        //Apenas para teste
        (0, saveFile_1.salvarPNG)(newQRCode, `${fileName}.png`);
        // 
        return res.send({ newQRCode });
    }
    async stream(req, res) {
        const postName = req.query.postName;
        const post = await PrismaClient_1.prismaClient.post.findUnique({
            where: { fileName: postName },
        });
        if (!post) {
            throw new apiErrors_1.NotFoundError("Post not found");
        }
        const filePath = node_path_1.default.join(__dirname, "../../files", post.fileName);
        if (!node_fs_1.default.existsSync(filePath)) {
            return res.status(404).send("Arquivo não encontrado no sistema de arquivos");
        }
        // Determinar o tipo MIME com base na extensão do arquivo
        const mimeTypes = {
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
        const fileStream = node_fs_1.default.createReadStream(filePath);
        fileStream.pipe(res);
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map