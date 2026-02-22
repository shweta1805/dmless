"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CandidatesPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const storedApps = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );

    const filtered = storedApps.filter(
      (app: any) => app.jobId === jobId
    );

    setApplications(filtered);
  }, [jobId]);

  return (
    <div className="min-h-screen bg-gray-100 p-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Candidates
      </h1>

      {applications.length === 0 && (
        <p>No candidates applied yet.</p>
      )}

      {applications.map((app, index) => (
        <div
          key={app.id}
          className="bg-white p-6 rounded shadow space-y-3"
        >
          <h2 className="font-semibold">
            Application #{index + 1}
          </h2>

          <p><strong>Name:</strong> {app.name}</p>
          <p><strong>Email:</strong> {app.email}</p>

          <p
            className={
              app.status === "shortlisted"
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {app.status === "shortlisted"
              ? "✅ Shortlisted"
              : "❌ Knocked Out"}
          </p>

          {app.resumeName && (
            <div className="space-y-2">
              <p className="text-blue-600">
                📄 {app.resumeName}
              </p>

              <a
                href={app.resumeData}
                target="_blank"
                className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}