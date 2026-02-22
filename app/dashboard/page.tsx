import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import JobApplications from "./JobApplications";

export default async function Dashboard() {
  const jobs = await prisma.job.findMany({
    include: { applications: true },
  });

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">
          Recruiter Dashboard
        </h1>

        <Link
          href="/create-job"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Job
        </Link>
      </div>

      {jobs.map((job) => {
        const total = job.applications.length;
        const shortlisted = job.applications.filter(
          (a) => a.status === "SHORTLISTED"
        ).length;
        const rejected = job.applications.filter(
          (a) => a.status === "REJECTED"
        ).length;

        const rate = total
          ? ((shortlisted / total) * 100).toFixed(1)
          : 0;

        return (
          <div
            key={job.id}
            className="border p-6 rounded mb-10 shadow bg-white"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  {job.title}
                </h2>
                <p className="text-gray-600">
                  {job.description}
                </p>
              </div>

              <DeleteButton jobId={job.id} />
            </div>

            <div className="mt-4 flex gap-6 text-sm font-semibold">
              <p>Applicants: {total}</p>
              <p>Shortlisted: {shortlisted}</p>
              <p>Rejected: {rejected}</p>
              <p>Shortlist Rate: {rate}%</p>
            </div>

            <JobApplications applications={job.applications} />
          </div>
        );
      })}
    </div>
  );
}