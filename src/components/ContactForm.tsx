"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, contactMessages, type ContactFormData } from "@/lib/forms/schemas";

export default function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  async function onSubmit(values: ContactFormData) {
    setServerMessage(null);
    setIsSuccess(false);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values)
    });
    
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (json?.fieldErrors) {
        Object.entries(json.fieldErrors as Record<string, string>).forEach(([field, message]) => {
          setError(field as keyof ContactFormData, { message });
        });
      }
      setServerMessage(json?.message || contactMessages.genericError);
      return;
    }

    setServerMessage(contactMessages.success);
    setIsSuccess(true);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
      <label className="field">
        <span className="muted">Name</span>
        <input className="input" placeholder="Your name" {...register("name")} />
        {errors.name?.message && <span className="error">{errors.name.message}</span>}
      </label>

      <label className="field">
        <span className="muted">Email</span>
        <input className="input" type="email" placeholder="your@email.com" {...register("email")} />
        {errors.email?.message && <span className="error">{errors.email.message}</span>}
      </label>

      <label className="field">
        <span className="muted">Subject</span>
        <input className="input" placeholder="What's this about?" {...register("subject")} />
        {errors.subject?.message && <span className="error">{errors.subject.message}</span>}
      </label>

      <label className="field">
        <span className="muted">Message</span>
        <textarea className="textarea" placeholder="Tell me more..." {...register("message")} />
        {errors.message?.message && <span className="error">{errors.message.message}</span>}
      </label>

      {serverMessage && (
        <div className={isSuccess ? "success" : "notice"}>
          {serverMessage}
        </div>
      )}

      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
