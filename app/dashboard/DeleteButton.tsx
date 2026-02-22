"use client";

export default function DeleteButton({ jobId }: any) {
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Delete this job?"
    );
    if (!confirmDelete) return;

    await fetch(`/api/jobs/${jobId}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  );
}