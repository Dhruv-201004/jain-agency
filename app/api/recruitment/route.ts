import { connectDB } from "@/lib/db";
import { RecruitmentApplication } from "@/models/RecruitmentApplication";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const phone = (body?.phone || "").trim();
    const role = (body?.role || "").trim();
    const portfolioUrl = (body?.portfolioUrl || "").trim();
    const message = (body?.message || "").trim();
    const experience = Number(body?.experience);

    if (!name || !email || !phone || !role || !message) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(experience) || experience < 0 || experience > 50) {
      return NextResponse.json(
        { error: "Experience must be between 0 and 50 years." },
        { status: 400 },
      );
    }

    await connectDB();
    await RecruitmentApplication.create({
      name,
      email,
      phone,
      role,
      experience,
      portfolioUrl,
      message,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit application." },
      { status: 500 },
    );
  }
}
