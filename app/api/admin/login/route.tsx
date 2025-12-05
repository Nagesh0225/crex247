import { NextResponse } from "next/server";

// Hard-coded Admins
const ADMINS = [
  { email: "admin1@gmail.com", password: "123456", adminId: "admin1", role: "admin" },
  { email: "admin2@gmail.com", password: "123456", adminId: "admin2", role: "admin" },
  { email: "admin3@gmail.com", password: "123456", adminId: "admin3", role: "admin" },
  { email: "admin4@gmail.com", password: "123456", adminId: "admin4", role: "admin" },
];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Admin Match
    const admin = ADMINS.find(
      (a) => a.email === email && a.password === password
    );

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid Email or Password" },
        { status: 401 }
      );
    }

    // ✅ Create response
    const res = NextResponse.json({
      success: true,
      adminId: admin.adminId,
      role: admin.role,
      message: "Login Successful",
    });

    // ✅ Set cookies
    res.cookies.set("admin-auth", admin.adminId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    res.cookies.set("admin-role", admin.role, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    // ✅ Save admin email/name for client display
    res.cookies.set("admin-name", admin.email, {
      httpOnly: false, // client-side read ke liye
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
