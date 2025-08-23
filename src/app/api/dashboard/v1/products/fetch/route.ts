import { db } from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const allProducts = await db.product.findMany({})
    return NextResponse.json({message: "Welcome to Clozit Dashboard", data: allProducts})
}