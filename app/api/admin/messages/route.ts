import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { toMessageDTO } from "@/lib/serializers";
import { Message } from "@/models/Message";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });

    return NextResponse.json({
      messages: messages.map((item) => toMessageDTO(item)),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch messages." },
      { status: 500 },
    );
  }
}
