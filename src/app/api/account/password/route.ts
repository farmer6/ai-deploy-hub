import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthPayload } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/password";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = getAuthPayload(request);
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword = String(body?.currentPassword ?? "");
    const newPassword = String(body?.newPassword ?? "");

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "Current and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ message: "New password must be at least 8 characters." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || !verifyPassword(currentPassword, user.passwordHash)) {
      return NextResponse.json({ message: "Current password is incorrect." }, { status: 401 });
    }

    const passwordHash = hashPassword(newPassword);
    await prisma.user.update({
      where: { id: payload.userId },
      data: { passwordHash },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
