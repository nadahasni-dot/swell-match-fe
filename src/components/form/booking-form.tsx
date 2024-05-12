"use client";

import React, { useEffect, useState } from "react";
import VisitorDetailsForm from "./visitor-details-form";
import { useForm } from "react-hook-form";
import {
  IdVerificationSchema,
  SurfingExperienceSchema,
  VisitorDetailsSchema,
} from "./form-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import { useMutation } from "@tanstack/react-query";
import SurfingExperienceForm from "./surfing-experience-form";
import IdVerificationForm from "./id-verification-form";
import { createBooking } from "@/services/booking";
import { AxiosError, AxiosResponse } from "axios";
import { CommonResponse } from "@/types/response/common";
import { Booking } from "@/types/response/booking";
import ReactCountryFlag from "react-country-flag";
import dayjs from "dayjs";
import { toast } from "sonner";

const getFormDescription = (step: number) => {
  if (step === 1) return "VISITOR DETAILS";
  if (step === 2) return "SURFING EXPERIENCES";
  return "ID VERIFICATION";
};

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [seconds, setSeconds] = useState(10);

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

  const formIdVerification = useForm<z.infer<typeof IdVerificationSchema>>({
    resolver: zodResolver(IdVerificationSchema),
    defaultValues: {
      id_card: undefined,
    },
  });

  const { data, mutate, isPending, isSuccess } = useMutation<
    AxiosResponse<CommonResponse<Booking>>,
    AxiosError<{ message: string }>,
    {
      formVisitorDetails: z.infer<typeof VisitorDetailsSchema>;
      formSurfingExperience: z.infer<typeof SurfingExperienceSchema>;
      formIdVerification: z.infer<typeof IdVerificationSchema>;
    }
  >({
    ...createBooking(),
    onSuccess: () => {
      toast.success("Success submit booking information");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (!err.response) {
        toast.error("File upload too large. Max file upload size is 2048 kb.");
        return;
      }

      toast.error(err.response.data.message as string);
    },
  });

  const handleSubmitAllFrom = (isValid: boolean) => {
    if (isValid) {
      mutate({
        formVisitorDetails: formVisitorDetails.getValues(),
        formSurfingExperience: formSurfingExperience.getValues(),
        formIdVerification: formIdVerification.getValues(),
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSuccess) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }

    if (seconds <= 0) {
      return () => clearInterval(interval);
    }
  }, [isSuccess, seconds]);

  useEffect(() => {
    if (seconds <= 0 && typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, [seconds]);

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
    if (step === 3)
      return (
        <Form {...formIdVerification}>
          <IdVerificationForm
            isSubmitting={isPending}
            onSubmitSuccess={handleSubmitAllFrom}
          />
        </Form>
      );
    return <></>;
  };

  return (
    <div className="flex-1 flex flex-col w-full p-10">
      <h1 className="text-4xl">
        {data ? `Thank You. ${data.data.data.name}` : "Book Your Visit"}
      </h1>
      {!data ? (
        <>
          <p className="mt-6 font-light mb-8 text-sm">
            {step} / 3: {getFormDescription(step)}
          </p>
          {getForm()}
        </>
      ) : (
        <>
          <p className="mt-6 font-light mb-8 text-sm">{"You're In!"}</p>
          <p className="font-light mb-8 text-sm mt-2">
            {
              "Your store visit is booked and you're ready to ride the shopping wave. Here’s your detail:"
            }
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-xs font-light text-gray-400">Name:</p>
              <p className="text-sm font-light">{data.data.data.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-light text-gray-400">Country:</p>
              <div className="flex gap-2 items-center">
                <ReactCountryFlag
                  countryCode={data.data.data.country.country_code}
                  svg
                />
                <p className="text-sm font-light">
                  {data.data.data.country.country_name}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-light text-gray-400">Email:</p>
              <p className="text-sm font-light">{data.data.data.email}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-light text-gray-400">Visit date:</p>
              <p className="text-sm font-light">
                {dayjs(data.data.data.visit_date).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
          <p className="font-light mt-8 text-sm">
            We look forward to seeing you at the #Swellmatch store! Your booking
            details already sent to your email and whatsapp
          </p>
          <p className="font-light mt-8 text-sm">
            This form will refresh automatically in {seconds} seconds
          </p>
        </>
      )}
    </div>
  );
}
