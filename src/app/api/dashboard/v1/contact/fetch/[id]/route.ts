import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const contact = await db.contact.findUnique({
            where: {
                id: id,
            },
        });

        if (!contact) {
            return NextResponse.json(
                { message: "Contact was not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "This is fetch a single contact",
            data: contact,
        });
    } catch (error) {
        return NextResponse.json({ error }, { status: 404 });
    }
}
