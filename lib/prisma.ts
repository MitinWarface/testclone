import { PrismaClient } from '../src/generated/prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
global.prisma = prisma;

export default prisma;