import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const id = request.headers.get("id");
        if (!id) {
            return NextResponse.json(
                { message: "ID is needed" },
                { status: 400 }
            );
        }

        const { status } = await request.json();

        const order = await db.order.update({
            where: {
                id: id,
            },
            data: {
                status,
            },
        });

        return NextResponse.json({
            message: "This is update order status",
            data: order,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
