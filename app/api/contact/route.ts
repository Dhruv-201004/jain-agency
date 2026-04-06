import { connectDB } from "@/lib/db";
import { Message } from "@/models/Message";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const phone = (body?.phone || "").trim();
    const message = (body?.message || "").trim();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    await connectDB();
    await Message.create({ name, email, phone, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit your message." },
      { status: 500 },
    );
  }
}
