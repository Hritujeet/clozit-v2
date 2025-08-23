import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const info = await db.$transaction([
        db.order.count(),
        db.product.count(),
        db.contact.count(),
    ]);

    return NextResponse.json({message: "Welcome to Clozit Dashboard", data: info});
}
