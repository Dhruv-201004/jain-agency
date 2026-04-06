"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className:
          "!bg-white !text-slate-800 !border !border-slate-200 !shadow-lg",
      }}
    />
  );
}
