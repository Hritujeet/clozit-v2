"use server"

import { Status } from "@/client/prisma"
import { db } from "@/utils/db/db"

export const processOrder = async (userId: string) => {
    const order = await db.order.findFirst({
        where: {
            userId: userId,
        }
    })

    if (!order) {
        throw new Error("Order not found for user")
    }

    await db.order.update({
        where: {
            id: order.id
        },
        data: {
            status: Status.ORDERED
        }
    })
    return order.id
}