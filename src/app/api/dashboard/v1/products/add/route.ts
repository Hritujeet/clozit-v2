import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const createdProduct = await db.product.create({
            data,
        });

        return NextResponse.json({
            message: "This is add products",
            data: createdProduct,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
