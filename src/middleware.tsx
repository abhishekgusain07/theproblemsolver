import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";


//todo : shift authentication to clerk
export default function middleware(req: NextRequest) {
    return withAuth(req)
}
export const config = {
    matcher: ['/create-post']
}