import Link from "next/link";
import { HomeIcon } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-kufic opacity-5" />

      {/* Home button */}
      <Link
        href="/landing"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-lg glass hover:glass-strong transition-all duration-300 group"
      >
        <HomeIcon className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Accueil
        </span>
      </Link>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        {children}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
    </div>
  );
}
