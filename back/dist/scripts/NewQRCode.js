"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQRCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const createQRCode = async (fileName) => {
    const qrCodeData = `http://192.168.0.2:4000/${fileName}`;
    const qrCode = await qrcode_1.default.toBuffer(qrCodeData, { type: "png" });
    return qrCode;
};
exports.createQRCode = createQRCode;
//# sourceMappingURL=NewQRCode.js.map