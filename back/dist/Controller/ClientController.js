"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const PrismaClient_1 = require("../Databases/PrismaClient");
const apiErrors_1 = require("../helpers/apiErrors");
const checkNumberPhone_1 = require("../scripts/checkNumberPhone");
class ClientController {
    async create(req, res) {
        const dataClient = req.body;
        if (!dataClient.name || !dataClient.phone) {
            throw new apiErrors_1.BadResquestError("Name and phone is required");
        }
        const isCheckedPhone = (0, checkNumberPhone_1.checkNumberPhone)(dataClient.phone);
        if (!isCheckedPhone) {
            throw new apiErrors_1.BadResquestError("Invalid phone number");
        }
        const client = await PrismaClient_1.prismaClient.client.create({
            data: {
                name: dataClient.name,
                phone: dataClient.phone
            }
        });
        return res.status(201).json(client);
    }
    ;
}
exports.ClientController = ClientController;
//# sourceMappingURL=ClientController.js.map