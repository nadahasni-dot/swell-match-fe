import { z } from "zod";

export const VisitorDetailsSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name length can not exceed 100 characters" }),
  country: z.number({ message: "Country is required" }),
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email length can not exceed 100 characters" })
    .email({ message: "Please provide valid email" }),
  whatsapp: z
    .string({ message: "Whatsapp is required" })
    .min(1, { message: "Whatsapp is required" })
    .max(16, { message: "Whatsapp length can not exceed 16 characters" }),
});

export const SurfingExperienceSchema = z.object({
  surfing_experience: z.number({ message: "Surfing experience is required" }),
  visit_date: z.date({ message: "Visit date is required" }),
  board_type: z.number({ message: "Board type is required" }),
});

export const IdVerificationSchema = z.object({
  id_card: z.instanceof(File, { message: "ID Card is required" }),
});
