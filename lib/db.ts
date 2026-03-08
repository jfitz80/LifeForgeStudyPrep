import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';

const prismaClientSingleton = () =>
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    }
  });

export const db = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}
