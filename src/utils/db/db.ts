import { PrismaClient } from "@/client/prisma";

const global = globalThis as unknown as {
  prisma: PrismaClient;
};
export const db = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = db;
