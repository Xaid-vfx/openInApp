import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        const res = NextResponse.next()
        console.log(req);
    }
)

export const config = { matcher: ["/dashboard"] }