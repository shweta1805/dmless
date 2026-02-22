"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  question: string;
  options: string[];
  correct: string;
};

export default function CreateJob() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [questions, setQuestions] = useState<Question[]>(
    Array(5).fill({
      question: "",
      options: ["", "", "", ""],
      correct: "",
    })
  );

  const handleChange = (
    qIndex: number,
    field: keyof Question,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex] = {
      ...updated[qIndex],
      [field]: value,
    };
    setQuestions(updated);
  };

  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCreate = async () => {
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        recruiterEmail: email,
        questions,
      }),
    });

    router.push("/dashboard");
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Create Hiring Link
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Job Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Job Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-6"
        placeholder="Recruiter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {questions.map((q: Question, i: number) => (
        <div key={i} className="border p-4 mb-6 rounded">
          <input
            className="border p-2 w-full mb-3"
            placeholder={`Question ${i + 1}`}
            onChange={(e) =>
              handleChange(i, "question", e.target.value)
            }
          />

          {q.options.map((opt: string, j: number) => (
            <input
              key={j}
              className="border p-2 w-full mb-2"
              placeholder={`Option ${j + 1}`}
              onChange={(e) =>
                handleOptionChange(i, j, e.target.value)
              }
            />
          ))}

          <input
            className="border p-2 w-full"
            placeholder="Correct Answer (exact text)"
            onChange={(e) =>
              handleChange(i, "correct", e.target.value)
            }
          />
        </div>
      ))}

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-6 py-2 rounded w-full"
      >
        Create Job
      </button>
    </div>
  );
}