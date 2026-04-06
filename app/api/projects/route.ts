import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { validateProjectPayload } from "@/lib/project-validation";
import { toProjectDTO } from "@/lib/serializers";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({
      projects: projects.map((item) => toProjectDTO(item)),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const validated = validateProjectPayload(body);

    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    await connectDB();
    const project = await Project.create(validated.data);

    return NextResponse.json(
      { project: toProjectDTO(project) },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 },
    );
  }
}
