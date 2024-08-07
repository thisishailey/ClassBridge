import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  await updateSession(request);

  const supabase = createClient();
  const session = await supabase.auth.getSession();
  const isNotLoggedIn = !session.data.session;

  if (request.nextUrl.pathname.endsWith("/my") && isNotLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/redirect")) {
    const type = request.nextUrl.searchParams.get("type");

    if (type === "login") {
      const newUser = request.nextUrl.searchParams.get("newUser");
      if (newUser === "true") {
        return NextResponse.redirect(
          new URL("/account/signup?page=info", request.url),
        );
      }
    }

    if (type === "payment") {
      const success = request.nextUrl.searchParams.get("success");
      if (success === "true") {
        const classId = request.nextUrl.searchParams.get("classId");
        const reservationId = request.nextUrl.searchParams.get("reservationId");
        return NextResponse.redirect(
          new URL(
            `/class/${classId}/checkout/${reservationId}/success`,
            request.url,
          ),
        );
      }
    }
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
