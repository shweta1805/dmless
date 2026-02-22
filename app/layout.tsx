import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "DMless",
  description: "Hire smarter with knockout screening",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-sm">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-blue-600">DM</span>less
          </Link>

          <div className="flex gap-8 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
            <Link href="/create-job" className="hover:text-blue-600 transition">
              Create Job
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen px-6 md:px-12 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-gray-500 border-t bg-white">
          © 2026 DMless — Built for modern recruiters.
        </footer>

      </body>
    </html>
  );
}