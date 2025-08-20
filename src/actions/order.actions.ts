"use server";
import { Status } from "@/client/prisma";
import { auth } from "@/lib/auth";
import { db } from "@/utils/db/db";
import { headers } from "next/headers";

export const confirmOrder = async (sessionId: string) => {
    try {
        const user_session = await auth.api.getSession({
            headers: await headers(),
        });
        if (user_session.user.id) {
            const updatedOrder = await db.order.updateManyAndReturn({
                where: {
                    stripePaymentId: sessionId,
                    status: Status.PENDING,
                },
                data: {
                    status: Status.ORDERED,
                },
            });
            if (updatedOrder.length <= 0) return { redirectUrl: "/orders" };

            return { redirectUrl: `/orders/${updatedOrder[0].id}` };
        } else {
            return { redirectUrl: "/auth/sign-in" };
        }
    } catch (error) {
        console.log(error);
        throw new Error("An error occured, plz try again later");
    }
};
