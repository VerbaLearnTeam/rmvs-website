import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ message: "Name is required." })
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(80, { message: "Name must be 80 characters or fewer." }),
  email: z
    .string({ message: "Email is required." })
    .trim()
    .max(254, { message: "Enter a valid email address." })
    .email({ message: "Enter a valid email address." }),
  subject: z
    .string({ message: "Subject is required." })
    .trim()
    .min(2, { message: "Subject must be at least 2 characters." })
    .max(120, { message: "Subject must be 120 characters or fewer." }),
  message: z
    .string({ message: "Message is required." })
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(2000, { message: "Message must be 2000 characters or fewer." })
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const contactMessages = {
  success: "Thanks for reaching out! I'll get back to you as soon as possible.",
  genericError: "Something went wrong. Please try again or email directly."
} as const;

export function zodFieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
