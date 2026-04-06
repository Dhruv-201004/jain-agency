"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Submission failed.");
        return;
      }

      setValues(initialValues);
      toast.success("Message sent successfully.");
    } catch {
      toast.error("Something went wrong while sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface space-y-5 rounded-3xl p-7">
      {[
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
      ].map((field) => (
        <label key={field.name} className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">
            {field.label}
          </span>
          <input
            type={field.type}
            required
            value={values[field.name as keyof typeof values]}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-400 transition focus:ring"
          />
        </label>
      ))}

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Message</span>
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
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
