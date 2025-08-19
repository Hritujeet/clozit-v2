import { auth } from "@/lib/auth";
import { db } from "@/utils/db/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
    try {
        const {
            amount,
            orderData: { config, cart },
        } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        const { id } = (
            await auth.api.getSession({
                headers: await headers(),
            })
        ).user;

        const alreadyOrder = await db.order.findUnique({
            where: {
                paymentIntent: paymentIntent.id,
            },
        });

        if (!alreadyOrder) {
            const order = await db.order.create({
                data: {
                    userId: id,
                    paymentIntent: paymentIntent.client_secret,
                    fullname: config.fullName,
                    phone: config.phone,
                    amount: amount,
                    city: config.city,
                    state: config.state,
                    streetAddress: config.streetAddress,
                    products: {
                        orderItems: JSON.parse(JSON.stringify(cart)),
                    },
                },
            });
        }

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error("Stripe Error:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}
