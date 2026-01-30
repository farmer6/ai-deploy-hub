import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthPayload } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = getAuthPayload(request);
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const query = String(body?.query ?? "").trim();

    if (!query) {
      const orders = await prisma.order.findMany({
        where: { userId: payload.userId },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          orderNumber: true,
          productName: true,
          amountCny: true,
          status: true,
          createdAt: true,
        },
      });
      return NextResponse.json({ orders });
    }

    if (query.includes("@") && query.toLowerCase() !== payload.email.toLowerCase()) {
      return NextResponse.json({ message: "Email does not match the logged-in account." }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: payload.userId,
        OR: [
          { orderNumber: query },
          { paymentRef: query },
        ],
      },
      orderBy: { createdAt: "desc" },
      select: {
        orderNumber: true,
        productName: true,
        amountCny: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Order query error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
