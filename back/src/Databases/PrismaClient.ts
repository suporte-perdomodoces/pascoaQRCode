import { Prisma, PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient

export { prismaClient, Prisma }