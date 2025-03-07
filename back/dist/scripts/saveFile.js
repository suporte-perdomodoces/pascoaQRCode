"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = void 0;
exports.salvarPNG = salvarPNG;
const crypto_1 = __importDefault(require("crypto"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const saveFile = (fileBuffer, originalName, id) => {
    const filesDir = node_path_1.default.join(__dirname, "../../files");
    // Criar pasta caso não exista
    if (!node_fs_1.default.existsSync(filesDir)) {
        node_fs_1.default.mkdirSync(filesDir, { recursive: true });
    }
    // Criar hash único baseado no timestamp
    const timestamp = Date.now().toString();
    const hash = crypto_1.default.createHash("sha256").update(timestamp + id).digest("hex");
    const fileExtension = node_path_1.default.extname(originalName);
    const newFileName = `${hash}${fileExtension}`;
    const newPath = node_path_1.default.join(filesDir, newFileName);
    // Escrever o buffer no arquivo
    node_fs_1.default.writeFileSync(newPath, fileBuffer);
    console.log(`Arquivo salvo em: ${newPath}`);
    return newFileName;
};
exports.saveFile = saveFile;
function salvarPNG(buffer, nomeArquivo) {
    /**
     * Salva um arquivo PNG em disco a partir de um buffer.
     *
     * @param buffer - O buffer contendo os dados do arquivo PNG.
     * @param nomeArquivo - O nome do arquivo a ser salvo, incluindo a extensão .png.
    **/
    // Garante que a pasta 'qrCodes' exista, se não, cria
    const pastaQrCodes = 'qrCodes';
    if (!node_fs_1.default.existsSync(pastaQrCodes)) {
        node_fs_1.default.mkdirSync(pastaQrCodes);
    }
    // Cria o caminho completo para o arquivo
    const caminhoArquivo = node_path_1.default.join(pastaQrCodes, nomeArquivo);
    // Salva o arquivo em disco
    node_fs_1.default.writeFile(caminhoArquivo, buffer, (err) => {
        if (err) {
            console.error(`Erro ao salvar o arquivo: ${err}`);
        }
        else {
            console.log(`Arquivo salvo com sucesso em: ${caminhoArquivo}`);
        }
    });
}
//# sourceMappingURL=saveFile.js.map