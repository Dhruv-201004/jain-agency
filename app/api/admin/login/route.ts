import bcrypt from "bcryptjs";
import { ADMIN_COOKIE_NAME, signAdminToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const password = (body?.password || "").trim();

    const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || "").trim();
    const adminPasswordHash = (process.env.ADMIN_PASSWORD_HASH || "").trim();

    if (!adminEmail || (!adminPassword && !adminPasswordHash)) {
      return NextResponse.json(
        { error: "Admin credentials are not configured." },
        { status: 500 },
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 },
      );
    }

    let isPasswordValid = false;

    if (adminPasswordHash) {
      isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
    } else {
      isPasswordValid = password === adminPassword;
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }

    const token = signAdminToken({ email: adminEmail || "admin" });

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
