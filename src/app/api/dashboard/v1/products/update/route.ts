import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const slug = request.headers.get("slug");
        if (!slug) {
            return NextResponse.json(
                { message: "ID is needed" },
                { status: 400 }
            );
        }

        const data = await request.json();

        const updateProduct = await db.product.update({
            where: { slug: slug },
            data: {
                ...data,
            },
        });

        if (!updateProduct) {
            return NextResponse.json(
                { message: "The product was not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            message: "The product was not found",
            data: updateProduct,
        });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
