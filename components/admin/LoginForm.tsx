"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed.");
        return;
      }

      toast.success("Welcome back.");
      router.replace("/admin");
      router.refresh();
    } catch {
      toast.error("Unable to login right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface space-y-4 rounded-2xl p-6">
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-400 transition focus:ring"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
