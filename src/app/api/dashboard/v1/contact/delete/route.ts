import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    return NextResponse.json(
        "This is delete contact by ft=etching ids of the contacts to be deleted via the request body"
    );
}
