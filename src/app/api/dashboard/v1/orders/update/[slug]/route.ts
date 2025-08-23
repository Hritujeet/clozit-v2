import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    return NextResponse.json("This is update order status")
}