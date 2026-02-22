import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center px-6">

      <div className="max-w-4xl">

        {/* Brand */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-blue-600 mb-6 tracking-tight">
          DMless
        </h1>

        {/* Tagline */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Hire Smarter. Screen Instantly.
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          DMless helps recruiters create intelligent hiring links with
          knockout screening logic. Automatically eliminate unqualified
          candidates and focus only on top talent — no friction.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/create-job"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Hiring Link
          </Link>

          <Link
            href="/dashboard"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
          >
            View Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}