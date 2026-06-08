"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Home, User, Upload, LogOut } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2" prefetch>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 shadow-lg shadow-fuchsia-900/40">
            <Home className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Reels<span className="text-fuchsia-400">Pro</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {session && (
            <Link
              href="/upload"
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:inline-flex"
            >
              <Upload className="h-4 w-4" /> Upload
            </Link>
          )}

          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
              aria-label="Account menu"
            >
              <User className="h-5 w-5" />
            </button>

            {open && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpen(false)}
                />
                <div className="absolute right-0 z-20 mt-3 w-60 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
                  {session ? (
                    <>
                      <div className="border-b border-white/10 px-4 py-3">
                        <p className="text-xs text-zinc-500">Signed in as</p>
                        <p className="truncate text-sm font-medium">
                          {session.user?.email}
                        </p>
                      </div>
                      <Link
                        href="/upload"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/5"
                      >
                        <Upload className="h-4 w-4" /> Video Upload
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-rose-400 transition hover:bg-white/5"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/5"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
