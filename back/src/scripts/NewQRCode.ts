import fs from 'node:fs';
import path from 'node:path';
import QRCode from 'qrcode';



export const createQRCode = async (fileName: string): Promise<Buffer> => {
  const qrCodeData = `http://192.168.0.2:4000/${fileName}`;

  const qrCode = await QRCode.toBuffer(qrCodeData, { type: "png" })

  return qrCode;
}