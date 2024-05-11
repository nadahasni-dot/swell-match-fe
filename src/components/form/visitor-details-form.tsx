"use client";

import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldErrors, useFormContext } from "react-hook-form";
import { z } from "zod";
import { VisitorDetailsSchema } from "./form-config";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/services/country";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export default function VisitorDetailsForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: (isValid: boolean) => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState<string>();
  const [country, setCountry] = useState<{
    label: string;
    value: string;
  }>();

  const { data, isLoading } = useQuery({
    ...getCountries(),
  });

  const getCountryList = (search: string) => {
    if (isLoading || !data) return [];
    if (!search) return data.data;

    return data.data.filter((e) =>
      e.country_name.toLowerCase().includes(search)
    );
  };

  const { handleSubmit, setValue, watch } =
    useFormContext<z.infer<typeof VisitorDetailsSchema>>();

  const handleOnValid = (data: z.infer<typeof VisitorDetailsSchema>) => {
    onSubmitSuccess(true);
  };

  const handleOnError = (
    errors: FieldErrors<{
      name: string;
      country: number;
      email: string;
      whatsapp: string;
    }>
  ) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsDropdownOpen(open);
  };

  return (
    <form onSubmit={handleSubmit(handleOnValid, handleOnError)}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-14">
        <div className="relative">
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={watch("name")}
            placeholder="Enter your name"
            onChange={(e) => setValue("name", e.target.value)}
          />
          <Label htmlFor="name">Name</Label>
          {watch("name") && (
            <Cross2Icon
              className="w-5 h-5 absolute top-4 right-2"
              onClick={() => setValue("name", "")}
            />
          )}
        </div>
        <Popover open={isDropdownOpen} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <div className="relative h-full">
              <div
                className={cn(
                  "block px-2.5 w-full bg-zinc-800 h-full ",
                  country ? "pt-1" : "pt-3 pb-3"
                )}
              >
                <p
                  className={cn(
                    "",
                    country ? "text-gray-300 text-xs" : "text-gray-400"
                  )}
                >
                  Country
                </p>
                {country && (
                  <div className="flex mt-0.5 gap-2 items-center">
                    <ReactCountryFlag countryCode={country.value} svg />
                    <p>{country.label}</p>
                  </div>
                )}
              </div>
              <ChevronDownIcon className="absolute right-2 top-4 w-5 h-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent sideOffset={4} className="p-0 flex flex-col">
            <input
              autoComplete="off"
              placeholder="Search"
              className="block px-2.5 pb-2.5 pt-2.5 w-auto m-3 text-sm placeholder:opacity-0 focus:placeholder:opacity-100 transition text-white bg-zinc-700 dark:bg-gray-700 border-0 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 peer"
              onChange={(e) => setSearch(e.target.value)}
            />
            {getCountryList(search || "").length < 1 && (
              <div className="flex items-center gap-2 w-full px-3 py-3 cursor-pointer hover:bg-zinc-700">
                <p className="text-white text-base">No country found</p>
              </div>
            )}
            {getCountryList(search || "").map((data) => (
              <button
                key={data.id}
                onClick={() => {
                  setValue("country", data.id);
                  setCountry({
                    value: data.country_code,
                    label: data.country_name,
                  });
                  setIsDropdownOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-3 cursor-pointer hover:bg-zinc-700"
              >
                <ReactCountryFlag countryCode={data.country_code} svg />
                <p className="text-white text-base">{data.country_name}</p>
              </button>
            ))}
          </PopoverContent>
        </Popover>

        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            value={watch("email")}
            placeholder="Enter your email"
            onChange={(e) => setValue("email", e.target.value)}
          />
          <Label htmlFor="email">Email</Label>
          {watch("email") && (
            <Cross2Icon
              className="w-5 h-5 absolute top-4 right-2"
              onClick={() => setValue("email", "")}
            />
          )}
        </div>
        <div className="relative">
          <Input
            id="whatsapp"
            name="whatsapp"
            type="text"
            autoComplete="off"
            value={watch("whatsapp")}
            placeholder="Your active number"
            onChange={(e) => setValue("whatsapp", e.target.value)}
          />
          <Label htmlFor="whatsapp">Whatsapp</Label>
          {watch("whatsapp") && (
            <Cross2Icon
              className="w-5 h-5 absolute top-4 right-2"
              onClick={() => setValue("whatsapp", "")}
            />
          )}
        </div>
      </div>
      <Button className="dark self-start font-bold" size="lg">
        Next
      </Button>
    </form>
  );
}
