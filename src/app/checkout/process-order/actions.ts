"use server";
import { auth } from "@/lib/auth";
import { cartItem, checkoutSchema } from "@/lib/utils";
import { db } from "@/utils/db/db";
import { headers } from "next/headers";
import z from "zod";

export const placeOrder = async (
    data: z.infer<typeof checkoutSchema>,
    amount: number,
    productData: cartItem[]
) => {
    const { fullName, phone, city, state, streetAddress } = data;
    const { id } = (
        await auth.api.getSession({
            headers: await headers(),
        })
    ).user;

    const order = await db.order.create({
        data: {
            userId: id,
            fullname: fullName,
            phone: phone,
            amount: amount,
            city: city,
            state: state,
            streetAddress: streetAddress,
            products: {
                orderItems: JSON.parse(JSON.stringify(productData)),
            },
        },
    });
    console.log(order.id);
};
