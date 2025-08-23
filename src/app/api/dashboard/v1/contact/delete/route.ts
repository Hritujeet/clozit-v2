import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const id = request.headers.get("id");
        if (!id) {
            return NextResponse.json(
                { message: "ID is needed" },
                { status: 400 }
            );
        }

        const deletedProduct = await db.contact.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({
            message: "This is delete contacts",
            data: deletedProduct,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
