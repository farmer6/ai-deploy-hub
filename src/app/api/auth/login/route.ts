import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const token = signToken({ userId: user.id, email: user.email });
    return NextResponse.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
