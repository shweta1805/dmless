"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ApplyPage() {
  const { jobId } = useParams();

  const [job, setJob] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [applicationId, setApplicationId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`/api/jobs/${jobId}`);
      const data = await res.json();
      setJob(data);
    }

    if (jobId) fetchJob();
  }, [jobId]);

  if (!job) return <p className="p-10">Loading...</p>;

  const handleSubmit = async () => {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        jobId,
        answers,
      }),
    });

    const data = await res.json();

    setApplicationId(data.id);
    setResult(data.status);
  };

  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();

    await fetch("/api/applications", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationId,
        resumeUrl: uploadData.url,
      }),
    });

    alert("Resume uploaded successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">
        Apply for {job.title}
      </h1>

      {!result && (
        <>
          <input
            className="border p-2 w-full mb-3"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2 w-full mb-6"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {job.questions.map((q: any) => {
            const options = JSON.parse(q.options);

            return (
              <div key={q.id} className="mb-6">
                <p className="font-semibold mb-2">
                  {q.question}
                </p>

                {options.map((opt: string, idx: number) => (
                  <label key={idx} className="block">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [q.id]: opt,
                        })
                      }
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
            );
          })}

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit Application
          </button>
        </>
      )}

      {result === "SHORTLISTED" && (
        <div className="mt-6">
          <p className="text-green-600 font-bold">
            You are shortlisted!
          </p>

          <p className="mt-4">Upload your resume:</p>

          <input
            type="file"
            className="mt-2"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleResumeUpload(file);
            }}
          />
        </div>
      )}

      {result === "REJECTED" && (
        <p className="text-red-600 font-bold mt-6">
          You are not shortlisted.
        </p>
      )}
    </div>
  );
}