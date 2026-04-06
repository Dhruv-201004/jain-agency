"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AdminLogoutButton() {
  const router = useRouter();

  async function onLogout() {
    const res = await fetch("/api/admin/logout", { method: "POST" });
    if (!res.ok) {
      toast.error("Unable to logout.");
      return;
    }

    toast.success("Logged out.");
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button onClick={onLogout} className="btn-outline px-3 py-2 text-xs">
      Logout
    </button>
  );
}
