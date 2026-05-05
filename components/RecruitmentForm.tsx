"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  role: "",
  experience: "",
  portfolioUrl: "",
  message: "",
};

export function RecruitmentForm() {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/recruitment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          experience: Number(values.experience),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Application submission failed.");
        return;
      }

      setValues(initialValues);
      toast.success("Application submitted successfully.");
    } catch {
      toast.error("Something went wrong while submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface space-y-5 rounded-3xl p-7">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Full Name</span>
        <input
          type="text"
          required
          value={values.name}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-400 transition focus:ring"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            required
            value={values.email}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Phone</span>
          <input
            type="tel"
            required
            value={values.phone}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Role Applying For
          </span>
          <input
            type="text"
            required
            value={values.role}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, role: e.target.value }))
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Experience (Years)
          </span>
          <input
            type="number"
            min={0}
            max={50}
            required
            value={values.experience}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, experience: e.target.value }))
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">
          Portfolio / LinkedIn (Optional)
        </span>
        <input
          type="url"
          placeholder="https://"
          value={values.portfolioUrl}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, portfolioUrl: e.target.value }))
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-400 transition focus:ring"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">
            Why do you want to join The Jain Agency?
        </span>
        <textarea
          required
          rows={5}
          value={values.message}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-400 transition focus:ring"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
