import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { validateProjectPayload } from "@/lib/project-validation";
import { toProjectDTO } from "@/lib/serializers";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  try {
    const { id } = await params;

    await connectDB();
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ project: toProjectDTO(project) });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch project." },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<Params> },
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const validated = validateProjectPayload(body);

    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    await connectDB();
    const project = await Project.findByIdAndUpdate(id, validated.data, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ project: toProjectDTO(project) });
  } catch {
    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;

    await connectDB();
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 },
    );
  }
}
