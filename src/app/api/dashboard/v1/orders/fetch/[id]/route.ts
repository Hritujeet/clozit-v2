import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const order = await db.order.findUnique({
        where: {
            id,
        },
    });

    if (!order) {
        return NextResponse.json(
            {
                message: "The order was not found",
            },
            { status: 404 }
        );
    }

    return NextResponse.json({
        message: "This is fetch a single order",
        data: order,
    });
}
