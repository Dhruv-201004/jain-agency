import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <section className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-center text-3xl font-bold text-slate-900">
        Admin Login
      </h1>
      <LoginForm />
    </section>
  );
}
