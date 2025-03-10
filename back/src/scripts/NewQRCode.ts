import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import QRCode from 'qrcode';

dotenv.config();



export const createQRCode = async (fileName: string): Promise<Buffer> => {
  
  const url =  process.env.URL_QRCODE ?? "localhost";
  const port = process.env.PORT_QRCODE || 8888;
  
  const qrCodeData = `${url}:${port}/client?${fileName}`;


  const qrCode = await QRCode.toBuffer(qrCodeData, { type: "png" })

  return qrCode;
}