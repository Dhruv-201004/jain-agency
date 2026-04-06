import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Message } from "@/models/Message";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDB();
    const [inquiryCount, projectCount] = await Promise.all([
      Message.countDocuments(),
      Project.countDocuments(),
    ]);

    return NextResponse.json({ inquiryCount, projectCount });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch analytics." },
      { status: 500 },
    );
  }
}
