
import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

function normalizePhone(value: string): string {
  let phone = value
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    )
    .replace(/\D/g, "");

  if (phone.startsWith("0098")) {
    phone = "0" + phone.slice(4);
  } else if (phone.startsWith("98") && phone.length === 12) {
    phone = "0" + phone.slice(2);
  } else if (phone.length === 10 && phone.startsWith("9")) {
    phone = "0" + phone;
  }

  return phone;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("orderId" in body) ||
      !("phone" in body) ||
      !("paymentReference" in body)
    ) {
      return NextResponse.json(
        { error: "اطلاعات پرداخت ناقص است." },
        { status: 400 }
      );
    }

    const orderId = Number(body.orderId);
    const phone =
      typeof body.phone === "string" ? body.phone : "";
    const paymentReference =
      typeof body.paymentReference === "string"
        ? body.paymentReference.trim()
        : "";

    if (
      !Number.isSafeInteger(orderId) ||
      orderId < 1 ||
      !phone.trim() ||
      phone.length > 30 ||
      paymentReference.length < 3 ||
      paymentReference.length > 100
    ) {
      return NextResponse.json(
        { error: "شماره سفارش، موبایل یا شماره پیگیری معتبر نیست." },
        { status: 400 }
      );
    }

    const order = await db.orm.public.CustomerOrder
      .where({ id: orderId })
      .first();

    if (
      !order ||
      normalizePhone(order.phone) !== normalizePhone(phone)
    ) {
      return NextResponse.json(
        { error: "سفارش با اطلاعات واردشده مطابقت ندارد." },
        { status: 404 }
      );
    }

    if (
      order.paymentStatus === "paid" ||
      order.status === "cancelled"
    ) {
      return NextResponse.json(
        {
          error: "برای این سفارش امکان ثبت شماره پیگیری وجود ندارد.",
        },
        { status: 409 }
      );
    }

    await db.orm.public.CustomerOrder
      .where({ id: orderId })
      .update({
        paymentReference,
        paymentStatus: "pending_review",
      });

    return NextResponse.json({
      message: "شماره پیگیری ثبت شد و منتظر بررسی مدیر است.",
      paymentStatus: "pending_review",
    });
  } catch (error) {
    console.error("PAYMENT REFERENCE ERROR:", error);

    return NextResponse.json(
      { error: "ثبت اطلاعات پرداخت انجام نشد. دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}