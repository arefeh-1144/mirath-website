
import { NextResponse } from "next/server";
import {
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("password" in body) ||
      typeof body.password !== "string"
    ) {
      return NextResponse.json(
        { error: "رمز عبور معتبر نیست." },
        { status: 400 }
      );
    }

    if (!verifyAdminPassword(body.password)) {
      return NextResponse.json(
        { error: "رمز عبور اشتباه است." },
        { status: 401 }
      );
    }

    const session = createAdminSession();

    const response = NextResponse.json({
      message: "ورود مدیر موفق بود.",
    });

    response.cookies.set("miras_admin_session", session.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: session.maxAge,
    });

    return response;
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "خطایی در ورود مدیر رخ داد." },
      { status: 500 }
    );
  }
}