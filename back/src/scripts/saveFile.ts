import crypto from 'crypto';
import fs from 'node:fs';
import path from 'node:path';

export const saveFile = (fileBuffer: Buffer, originalName: string, id: string): string => {
  const filesDir = path.join(__dirname, "../../files");

  // Criar pasta caso não exista
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
  }

  // Criar hash único baseado no timestamp
  const timestamp = Date.now().toString();


  const hash = crypto.createHash("sha256").update(timestamp + id).digest("hex");


  const fileExtension = path.extname(originalName);


  const newFileName = `${hash}${fileExtension}`;


  const newPath = path.join(filesDir, newFileName);


  // Escrever o buffer no arquivo
  fs.writeFileSync(newPath, fileBuffer);

  console.log(`Arquivo salvo em: ${newPath}`);

  return newFileName;
};


export function salvarPNG(buffer: Buffer, nomeArquivo: string): void {
  /**
   * Salva um arquivo PNG em disco a partir de um buffer.
   *
   * @param buffer - O buffer contendo os dados do arquivo PNG.
   * @param nomeArquivo - O nome do arquivo a ser salvo, incluindo a extensão .png.
  **/

  // Garante que a pasta 'qrCodes' exista, se não, cria
  const pastaQrCodes = 'qrCodes';
  if (!fs.existsSync(pastaQrCodes)) {
    fs.mkdirSync(pastaQrCodes);
  }

  // Cria o caminho completo para o arquivo
  const caminhoArquivo = path.join(pastaQrCodes, nomeArquivo);

  // Salva o arquivo em disco
  fs.writeFile(caminhoArquivo, buffer, (err) => {
    if (err) {
      console.error(`Erro ao salvar o arquivo: ${err}`);
    } else {
      console.log(`Arquivo salvo com sucesso em: ${caminhoArquivo}`);
    }
  });
}
