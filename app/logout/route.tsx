import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("admin-role", "", {
    maxAge: 0,
    path: "/admin",
  });

  return res;
}


// export async function GET() {
//   const cookieStore = await cookies();
//   cookieStore.delete("admin-auth");

//   return NextResponse.redirect(new URL("/admin", ""));
// }