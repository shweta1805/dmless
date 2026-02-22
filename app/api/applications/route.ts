import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, jobId, answers } = body;

  const job = await prisma.job.findUnique({
    where: { id: Number(jobId) },
    include: { questions: true },
  });

  if (!job) {
    return Response.json({ error: "Job not found" }, { status: 404 });
  }

  let knockedOut = false;

  job.questions.forEach((q) => {
    const candidateAnswer = answers?.[q.id];
    if (candidateAnswer !== q.correct) {
      knockedOut = true;
    }
  });

  const status = knockedOut ? "REJECTED" : "SHORTLISTED";

  const application = await prisma.application.create({
    data: {
      name,
      email,
      jobId: Number(jobId),
      status,
    },
  });

  return Response.json(application);
}

export async function PUT(request: Request) {
  const body = await request.json();

  const { applicationId, resumeUrl } = body;

  const updated = await prisma.application.update({
    where: { id: applicationId },
    data: { resumeUrl },
  });

  return Response.json(updated);
}