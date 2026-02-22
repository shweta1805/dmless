export default function JobApplications({
  applications,
}: any) {
  if (!applications.length) {
    return (
      <p className="mt-6 text-gray-500">
        No applications yet.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {applications.map((app: any) => (
        <div
          key={app.id}
          className="border p-4 rounded bg-gray-50"
        >
          <p className="font-semibold">{app.name}</p>
          <p className="text-sm text-gray-600">
            {app.email}
          </p>

          <p
            className={
              app.status === "SHORTLISTED"
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {app.status}
          </p>

          {app.resumeUrl && (
            <p className="text-blue-600 text-sm">
              Resume: {app.resumeUrl}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}