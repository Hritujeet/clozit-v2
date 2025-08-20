import { stripe } from "@/lib/stripe";
import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { config, cart } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            metadata: {
                ...config,
            },
            line_items: Object.keys(cart).map((item: any) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: cart[item].productName,
                    },
                    unit_amount: Math.round(cart[item].price * 100),
                },
                quantity: cart[item].qty,
            })),
            success_url: `${req.headers.get(
                "origin"
            )}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get("origin")}/orders/cancel`,
        });

        const order = await db.order.create({
            data: {
                fullname: config.fullName,
                phone: config.phone,
                streetAddress: config.streetAddress,
                state: config.state,
                city: config.city,
                user: {
                    connect: {
                        id: config.id
                    }
                },
                products: JSON.parse(JSON.stringify(cart)),
                amount: session.amount_subtotal,
                stripePaymentId: session.id,
            }
        })

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: err.message });
    }
}
