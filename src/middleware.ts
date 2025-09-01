import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // 1. Add CORS headers to all responses
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Admin');
    response.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight response for 24 hours

    // 2. Handle the CORS preflight request
    if (req.method === 'OPTIONS') {
        // Return a successful response for the preflight check
        return NextResponse.json({}, { status: 200, headers: response.headers });
    }

    // 3. Extract and validate the custom 'admin' header
    const adminHeader = req.headers.get("admin");
    if (adminHeader !== process.env.ADMIN) {
        return new NextResponse(
            JSON.stringify({ error: "Unauthorized access" }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }

    // 4. If everything passes, allow the request to proceed
    return NextResponse.next();
}

// Apply middleware only to API routes
export const config = {
    matcher: "/api/dashboard/v1/:path*"
};