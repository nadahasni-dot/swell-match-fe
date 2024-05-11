"use client";

import React, { useState } from "react";
import VisitorDetailsForm from "./visitor-details-form";
import { useForm } from "react-hook-form";
import { SurfingExperienceSchema, VisitorDetailsSchema } from "./form-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/utils";
import SurfingExperienceForm from "./surfing-experience-form";

const getFormDescription = (step: number) => {
  if (step === 1) return "VISITOR DETAILS";
  if (step === 2) return "SURFING EXPERIENCES";
  return "ID VERIFICATION";
};

export default function BookingForm() {
  const [step, setStep] = useState(1);

  const formVisitorDetails = useForm<z.infer<typeof VisitorDetailsSchema>>({
    resolver: zodResolver(VisitorDetailsSchema),
    defaultValues: {
      name: "",
      country: undefined,
      email: "",
      whatsapp: "",
    },
  });

  const formSurfingExperience = useForm<
    z.infer<typeof SurfingExperienceSchema>
  >({
    resolver: zodResolver(SurfingExperienceSchema),
    defaultValues: {
      surfing_experience: 0,
      board_type: undefined,
      visit_date: undefined,
    },
  });

  const getForm = () => {
    if (step === 1)
      return (
        <Form {...formVisitorDetails}>
          <VisitorDetailsForm
            onSubmitSuccess={(isSuccess) => {
              if (isSuccess) {
                setStep(2);
              }
            }}
          />
        </Form>
      );
    if (step === 2)
      return (
        <Form {...formSurfingExperience}>
          <SurfingExperienceForm
            onSubmitSuccess={(isSuccess) => {
              if (isSuccess) {
                setStep(3);
              }
            }}
          />
        </Form>
      );
    return <></>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex-1 flex flex-col w-full p-10">
        <h1 className="text-4xl">Book Your Visit</h1>
        <p className="mt-6 font-light mb-8 text-sm">
          {step} / 3: {getFormDescription(step)}
        </p>
        {getForm()}
      </div>
    </QueryClientProvider>
  );
}
