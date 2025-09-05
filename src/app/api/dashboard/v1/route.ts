import { Status } from "@/client/prisma";
import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const info = await db.$transaction([
        db.order.count({
            where: {
                OR: [
                    {
                        status: Status.SHIPPING,
                    },
                    {
                        status: Status.OUT_FOR_DELIVERY,
                    },
                    {
                        status: Status.ORDERED,
                    },
                ],
            },
        }),
        db.product.count(),
        db.contact.count(),
        db.session.count(),
        db.user.count(),
    ]);

    return NextResponse.json({
        message: "Welcome to Clozit Dashboard",
        data: {
            totalOrders: info[0],
            totalProducts: info[1],
            totalContacts: info[2],
            totalSessions: info[3],
            totalUsers: info[4],
        },
    });
}
