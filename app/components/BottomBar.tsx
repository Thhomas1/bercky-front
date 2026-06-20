import Link from "next/link";
import { Home, FileText, User } from "lucide-react";

export default function BottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-6">
      <nav
        className="
          flex items-center gap-2
          rounded-full
          border border-white/20
          bg-white/40
          px-6 py-3
          shadow-lg shadow-black/10
          backdrop-blur-xl
          dark:border-white/10
          dark:bg-black/40
        "
      >
        <Link
          href="/"
          className="
            flex flex-col items-center gap-0.5
            rounded-full px-4 py-1.5
            text-foreground/70
            transition-colors
            hover:text-foreground
          "
        >
          <Home className="h-6 w-6" strokeWidth={1.75} />
        </Link>

        <Link
          href="/report"
          className="
            flex flex-col items-center gap-0.5
            rounded-full px-4 py-1.5
            text-foreground/70
            transition-colors
            hover:text-foreground
          "
        >
          <FileText className="h-6 w-6" strokeWidth={1.75} />
        </Link>

        <Link
          href="/profile"
          className="
            flex flex-col items-center gap-0.5
            rounded-full px-4 py-1.5
            text-foreground/70
            transition-colors
            hover:text-foreground
          "
        >
          <User className="h-6 w-6" strokeWidth={1.75} />
        </Link>
      </nav>
    </div>
  );
}