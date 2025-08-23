import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const product = await db.product.findUnique({
        where: {
            slug: slug,
        },
    });

    if (!product) {
        return NextResponse.json(
            {
                message: "The product was not found",
            },
            { status: 404 }
        );
    }

    return NextResponse.json({
        message: "This is fetch a single product",
        data: product,
    });
}
