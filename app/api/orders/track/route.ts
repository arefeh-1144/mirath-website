
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

    // یکسان‌سازی پیش‌شماره ایران
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
            !("phone" in body)
        ) {
            return NextResponse.json(
                { error: "شماره سفارش و شماره موبایل الزامی هستند." },
                { status: 400 }
            );
        }

        const orderId = Number(body.orderId);
        const phone =
            typeof body.phone === "string" ? body.phone : "";

        if (
            !Number.isSafeInteger(orderId) ||
            orderId < 1 ||
            !phone.trim() ||
            phone.length > 30
        ) {
            return NextResponse.json(
                { error: "شماره سفارش یا شماره موبایل معتبر نیست." },
                { status: 400 }
            );
        }

        // پیدا کردن سفارش بر اساس شماره سفارش
        const order = await db.orm.public.CustomerOrder
            .where({ id: orderId })
            .include("items")
            .first();

        // بررسی تطبیق شماره موبایل بدون ثبت خود شماره در لاگ
        const phoneMatches =
            order != null &&
            normalizePhone(order.phone) === normalizePhone(phone);

        console.log("TRACK ORDER DIAGNOSTIC", {
            requestedOrderId: orderId,
            foundOrder: Boolean(order),
            phoneMatches,
        });

        if (!order || !phoneMatches) {
            return NextResponse.json(
                {
                    error: "سفارشی با این شماره سفارش و موبایل پیدا نشد.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            order: {
                id: order.id,
                status: order.status,
                total: order.total,
                createdAt: order.createdAt,
                items: (order.items || []).map((item) => ({
                    productName: item.productName,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                })),
            },
        });
    } catch (error) {
        console.error("ORDER TRACKING ERROR:", error);

        return NextResponse.json(
            { error: "پیگیری سفارش با خطا مواجه شد. دوباره تلاش کنید." },
            { status: 500 }
        );
    }
}