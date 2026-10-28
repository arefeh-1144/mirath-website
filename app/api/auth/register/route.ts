import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const name = body.name?.trim();
        const phone = body.phone?.trim();

        if (!name || !phone) {
            return NextResponse.json(
                { error: "نام و شماره موبایل الزامی است." },
                { status: 400 }
            );
        }

        const existingUser = await db.orm.public.User
            .where({ phone })
            .first();

        if (existingUser) {
            return NextResponse.json(
                { error: "این شماره موبایل قبلاً ثبت شده است." },
                { status: 409 }
            );
        }

        const user = await db.orm.public.User.create({
            name,
            phone,
        });

        return NextResponse.json(
            {
                message: "ثبت‌نام با موفقیت انجام شد.",
                user: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return NextResponse.json(
            { error: "خطایی در ثبت‌نام رخ داد." },
            { status: 500 }
        );
    }
}