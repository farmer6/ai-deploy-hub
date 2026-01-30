import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
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

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Email is already registered." }, { status: 409 });
    }

    const passwordHash = hashPassword(password);
    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true },
    });

    const token = signToken({ userId: user.id, email: user.email });

    return NextResponse.json({ user, token }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
