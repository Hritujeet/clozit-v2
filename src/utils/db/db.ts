import { PrismaClient } from "@/client/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const global = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient>;
};

function createPrismaClient() {
  return new PrismaClient().$extends(withAccelerate());
}

export const db = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}