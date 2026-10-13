"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  }

  if (status === "sent") {
    return (
      <div className="animate-pop-in rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <span className="text-2xl">✅</span>
        <p className="mt-2 font-semibold text-emerald-800">Message sent</p>
        <p className="mt-1 text-sm text-emerald-700">
          (This is a demo — nothing was actually sent anywhere.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-stone-600">
            Name
          </label>
          <input
            id="contact-name"
            required
            type="text"
            placeholder="Ada Obi"
            className="h-12 w-full rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-stone-600">
            Email
          </label>
          <input
            id="contact-email"
            required
            type="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-stone-600">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          placeholder="How can we help?"
          className="w-full resize-none rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-5 text-sm font-bold text-white shadow-glow transition hover:brightness-105 disabled:opacity-70 sm:w-auto sm:px-8"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
