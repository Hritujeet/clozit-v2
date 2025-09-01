import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Extract the admin header
  const adminHeader = req.headers.get("admin");  

  // Validate the header
  if (adminHeader !== process.env.ADMIN) {
    return new NextResponse(
      JSON.stringify({ error: "Unauthorized access" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply middleware only to API routes
export const config = {
  matcher: "/api/dashboard/v1/:path*"
};