import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthPayload } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const payload = getAuthPayload(request);
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, company: true, region: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = getAuthPayload(request);
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const company = String(body?.company ?? "").trim();
    const region = String(body?.region ?? "").trim();

    const user = await prisma.user.update({
      where: { id: payload.userId },
      data: {
        name: name || null,
        company: company || null,
        region: region || null,
      },
      select: { id: true, email: true, name: true, company: true, region: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile POST error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
