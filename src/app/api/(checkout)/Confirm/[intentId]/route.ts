import { prisma } from "@/utils/connect";

import { NextResponse,NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
  const requestBody = await req.json();
    const payment_intent = requestBody.payment_intent;
  if (payment_intent !== null) {
    try {
      await prisma.order.update({
        where: {
          intent_id: payment_intent,
        },
        data: { status: "Being prepared!" },
      });
      return new NextResponse(
        JSON.stringify({ message: "Order has been updated" }),
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }
};