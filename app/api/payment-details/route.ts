
import { NextResponse } from "next/server";

export async function GET() {
  const cardNumber = process.env.TRANSFER_CARD_NUMBER?.trim();
  const accountName = process.env.TRANSFER_ACCOUNT_NAME?.trim();
  const bankName = process.env.TRANSFER_BANK_NAME?.trim();

  if (!cardNumber || !accountName || !bankName) {
    return NextResponse.json(
      { error: "اطلاعات حساب مقصد هنوز تنظیم نشده است." },
      { status: 503 }
    );
  }

  return NextResponse.json({
    cardNumber,
    accountName,
    bankName,
  });
}