import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const allContacts = await db.contact.findMany({})
    return NextResponse.json({message: "This is fetch contacts", data: allContacts})
}