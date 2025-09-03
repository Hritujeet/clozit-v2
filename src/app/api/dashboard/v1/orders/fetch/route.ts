import { Status } from "@/client/prisma";
import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const allOrders = await db.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            OR: [
                { status: Status.ORDERED },
                { status: Status.SHIPPING },
                { status: Status.OUT_FOR_DELIVERY },
            ],
        },
    });
    return NextResponse.json({
        message: "Welcome to Clozit Dashboard",
        data: allOrders,
    });
}
