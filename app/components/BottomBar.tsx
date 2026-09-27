"use client";

import Link from "next/link";
import { Home, FileText, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supa";

export const Bottombar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkUser();
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-6">
      {isLoggedIn ? (
        <nav className="flex items-center gap-2 rounded-full border border-white/20 bg-white/40 px-6 py-3 shadow-lg shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <Link
            href="/"
            className="text-foreground/70 hover:text-foreground flex flex-col items-center gap-0.5 rounded-full px-4 py-1.5 transition-colors"
          >
            <Home className="h-6 w-6" strokeWidth={1.75} />
          </Link>

          <Link
            href="/report"
            className="text-foreground/70 hover:text-foreground flex flex-col items-center gap-0.5 rounded-full px-4 py-1.5 transition-colors"
          >
            <FileText className="h-6 w-6" strokeWidth={1.75} />
          </Link>

          <Link
            href="/profile"
            className="text-foreground/70 hover:text-foreground flex flex-col items-center gap-0.5 rounded-full px-4 py-1.5 transition-colors"
          >
            <User className="h-6 w-6" strokeWidth={1.75} />
          </Link>
        </nav>
      ) : null}
    </div>
  );
};

export default Bottombar;
