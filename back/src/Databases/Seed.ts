import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
      },
    });

    console.log('Usuário admin criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });