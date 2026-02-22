import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const recruiter = await prisma.recruiter.upsert({
      where: { email: body.recruiterEmail },
      update: {},
      create: {
        email: body.recruiterEmail,
      },
    });

    const job = await prisma.job.create({
      data: {
        title: body.title,
        description: body.description,
        recruiterId: recruiter.id,
      },
    });

    return Response.json(job);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        recruiter: true,
        applications: true,
      },
    });

    return Response.json(jobs);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}