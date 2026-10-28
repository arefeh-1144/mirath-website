
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/src/prisma/db";
import { verifyAdminSession } from "@/lib/admin-auth";

const allowedStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
] as const;

type OrderStatus = (typeof allowedStatuses)[number];

async function isAdminAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get("miras_admin_session")?.value;

    return verifyAdminSession(token);
}

// دریافت فهرست سفارش‌ها
export async function GET() {
    try {
        if (!(await isAdminAuthenticated())) {
            return NextResponse.json(
                { error: "برای مشاهده سفارش‌ها ابتدا وارد پنل مدیریت شوید." },
                { status: 401 }
            );
        }

        const orders = await db.orm.public.CustomerOrder
            .include("items")
            .orderBy((order) => order.id.desc())
            .all();

        return NextResponse.json({ orders });
    } catch (error) {
        console.error("ADMIN ORDERS ERROR:", error);

        return NextResponse.json(
            { error: "دریافت سفارش‌ها با خطا مواجه شد." },
            { status: 500 }
        );
    }
}

// تغییر وضعیت یک سفارش
export async function PATCH(request: Request) {
    try {
        if (!(await isAdminAuthenticated())) {
            return NextResponse.json(
                { error: "برای تغییر سفارش ابتدا وارد پنل مدیریت شوید." },
                { status: 401 }
            );
        }

        const body: unknown = await request.json();

        if (
            typeof body !== "object" ||
            body === null ||
            !("orderId" in body) ||
            !("status" in body) ||
            typeof body.orderId !== "number" ||
            !Number.isSafeInteger(body.orderId) ||
            body.orderId < 1 ||
            typeof body.status !== "string" ||
            !allowedStatuses.includes(body.status as OrderStatus)
        ) {
            return NextResponse.json(
                { error: "شماره سفارش یا وضعیت انتخاب‌شده معتبر نیست." },
                { status: 400 }
            );
        }

        const orderId = body.orderId;
        const status = body.status as OrderStatus;

        const updatedOrder = await db.orm.public.CustomerOrder
            .where({ id: orderId })
            .update({ status });

        if (!updatedOrder) {
            return NextResponse.json(
                { error: "سفارش موردنظر پیدا نشد." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "وضعیت سفارش با موفقیت تغییر کرد.",
            order: {
                id: updatedOrder.id,
                status: updatedOrder.status,
            },
        });
    } catch (error) {
        console.error("UPDATE ORDER STATUS ERROR:", error);

        return NextResponse.json(
            { error: "تغییر وضعیت سفارش با خطا مواجه شد." },
            { status: 500 }
        );
    }
}