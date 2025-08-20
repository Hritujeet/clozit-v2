import { PrismaClient } from "@/client/prisma";
import {withAccelerate} from "@prisma/extension-accelerate"

const global = globalThis as unknown as {
  prisma: PrismaClient;
};
export const db = global.prisma || new PrismaClient().$extends(withAccelerate());
