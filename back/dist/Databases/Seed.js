"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        const existingUserCount = await prisma.user.count();
        if (existingUserCount !== 0) {
            console.log('Usuário admin já existe. Nenhuma ação realizada.');
            return;
        }
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin'; // Use env var or default
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
        const adminName = process.env.ADMIN_NAME || 'admin';
        const hashedPassword = await bcrypt_1.default.hash(adminPassword, 10);
        await prisma.user.create({
            data: {
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
            },
        });
        console.log('Usuário admin criado com sucesso');
    }
    catch (error) {
        console.error('Erro ao criar usuário admin:', error);
    }
}
main()
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=Seed.js.map