import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

const productCatalog = {
    heart: { name: "قلب تزئینی", price: 850000 },
    painting: { name: "تابلو هنری", price: 1200000 },
    magnet: { name: "مگنت ایرانی", price: 350000 },
    souvenir: { name: "یادگاری میراث", price: 650000 },
};

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const fullName =
            typeof body.fullName === "string" ? body.fullName.trim() : "";
        const phone =
            typeof body.phone === "string" ? body.phone.trim() : "";
        const province =
            typeof body.province === "string" ? body.province.trim() : "";
        const city =
            typeof body.city === "string" ? body.city.trim() : "";
        const address =
            typeof body.address === "string" ? body.address.trim() : "";
        const postalCode =
            typeof body.postalCode === "string"
                ? body.postalCode.trim()
                : "";
        const note =
            typeof body.note === "string" ? body.note.trim() : "";

        if (
            !fullName ||
            !phone ||
            !province ||
            !city ||
            !address ||
            !postalCode
        ) {
            return NextResponse.json(
                { error: "لطفاً تمام اطلاعات ضروری گیرنده را وارد کنید." },
                { status: 400 }
            );
        }

        if (
            fullName.length > 100 ||
            phone.length > 30 ||
            province.length > 70 ||
            city.length > 70 ||
            address.length < 10 ||
            address.length > 500 ||
            postalCode.length > 20 ||
            note.length > 500
        ) {
            return NextResponse.json(
                { error: "یکی از اطلاعات واردشده معتبر نیست." },
                { status: 400 }
            );
        }

        if (!Array.isArray(body.items) || body.items.length === 0) {
            return NextResponse.json(
                { error: "سبد خرید خالی است." },
                { status: 400 }
            );
        }

        const orderItems: {
            productId: string;
            productName: string;
            unitPrice: number;
            quantity: number;
        }[] = [];
        for (const item of body.items) {
            if (
                !item ||
                typeof item.id !== "string" ||
                !Number.isSafeInteger(item.quantity) ||
                item.quantity < 1 ||
                item.quantity > 99
            ) {
                return NextResponse.json(
                    { error: "اطلاعات یکی از محصولات معتبر نیست." },
                    { status: 400 }
                );
            }

            const product =
                productCatalog[item.id as keyof typeof productCatalog];

            if (!product) {
                return NextResponse.json(
                    { error: "یکی از محصولات در فروشگاه معتبر نیست." },
                    { status: 400 }
                );
            }

            orderItems.push({
                productId: item.id,
                productName: product.name,
                unitPrice: product.price,
                quantity: item.quantity,
            });
        }

        const total = orderItems.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
        );

        if (!Number.isSafeInteger(total)) {
            return NextResponse.json(
                { error: "مبلغ سفارش معتبر نیست." },
                { status: 400 }
            );
        }

        const order = await db.orm.public.CustomerOrder.create({
            fullName,
            phone,
            province,
            city,
            address,
            postalCode,
            note: note || null,
            total,
            items: (items) => items.create(orderItems),
        });

        return NextResponse.json(
            {
                message: "سفارش با موفقیت ثبت شد.",
                order: {
                    id: order.id,
                    total: order.total,
                    status: order.status,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("ORDER CREATE ERROR:", error);

        return NextResponse.json(
            { error: "ثبت سفارش با خطا مواجه شد. لطفاً دوباره تلاش کنید." },
            { status: 500 }
        );
    }
}