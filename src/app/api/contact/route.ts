import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

import config from "@/payload/payload.config";
import { isValidEmail } from "@/utils/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "รูปแบบอีเมลไม่ถูกต้อง" },
        { status: 400 },
      );
    }

    const payload = await getPayload({ config });

    await payload.create({
      collection: "contact-submissions",
      data: {
        name,
        company: body.company || "",
        email,
        message,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "ส่งข้อความสำเร็จ เราจะติดต่อกลับเร็วๆ นี้",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" },
      { status: 500 },
    );
  }
}
