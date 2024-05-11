import React, { useState } from "react";
import { SurfingExperienceSchema } from "./form-config";
import { FieldErrors, useFormContext } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "@/services/board";
import { Button } from "../ui/button";

export default function SurfingExperienceForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: (isValid: boolean) => void;
}) {
  const [isShowDropdownBoard, setIsShowDropdownBoard] = useState(false);
  const [date, setDate] = useState<Date>();
  const [board, setBoard] = useState<{
    value: number;
    label: string;
  }>();

  const { data } = useQuery({
    ...getBoards(),
  });

  const { handleSubmit, setValue, watch } =
    useFormContext<z.infer<typeof SurfingExperienceSchema>>();

  const handleOnValid = (data: z.infer<typeof SurfingExperienceSchema>) => {
    onSubmitSuccess(true);
  };

  const handleOnError = (
    errors: FieldErrors<{
      surfing_experience: number;
      visit_date: Date;
      board_type: number;
    }>
  ) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  };

  const handleOpenBoardChange = (open: boolean) => {
    setIsShowDropdownBoard(open);
  };

  return (
    <form onSubmit={handleSubmit(handleOnValid, handleOnError)}>
      <p className="font-light text-sm">Your Surfing Experience</p>
      <div className="grid grid-cols-2 gap-8 mb-14">
        <div className="col-span-2">
          <div className="flex items-end justify-between mx-0 my-3">
            {Object.values(Array.from(Array(11).keys())).map((val) => (
              <p
                key={val}
                className={cn(
                  "transition",
                  val === watch("surfing_experience")
                    ? "text-white text-base -translate-y-1"
                    : "text-sm text-gray-400"
                )}
              >
                {val}
              </p>
            ))}
          </div>
          <Slider
            value={[watch("surfing_experience")]}
            max={10}
            step={1}
            onValueChange={(value) => setValue("surfing_experience", value[0])}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative h-full">
              <div
                className={cn(
                  "block px-2.5 w-full bg-zinc-800 h-full ",
                  date ? "pt-1" : "pt-3 pb-3"
                )}
              >
                <p
                  className={cn(
                    "",
                    date ? "text-gray-300 text-xs" : "text-gray-400"
                  )}
                >
                  Visit Date
                </p>
                {date && <p>{dayjs(date).format("DD/MM/YYYY")}</p>}
              </div>
              {date && (
                <Cross2Icon
                  className="w-5 h-5 absolute top-3 right-2"
                  onClick={() => setDate(undefined)}
                />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                if (!date) return;
                setValue("visit_date", date);
                setDate(date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover
          open={isShowDropdownBoard}
          onOpenChange={handleOpenBoardChange}
        >
          <PopoverTrigger asChild>
            <div className="relative h-full">
              <div
                className={cn(
                  "block px-2.5 w-full bg-zinc-800 h-full ",
                  board ? "pt-1" : "pt-3 pb-3"
                )}
              >
                <p
                  className={cn(
                    "",
                    board ? "text-gray-300 text-xs" : "text-gray-400"
                  )}
                >
                  Your desired board
                </p>
                {board && <p>{board.label}</p>}
              </div>
              <ChevronDownIcon className="absolute right-2 top-3 w-5 h-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent sideOffset={4} className="p-0 flex flex-col">
            {!data || data.data.length < 1 ? (
              <div className="flex items-center gap-2 w-full px-3 py-3 cursor-pointer hover:bg-zinc-700">
                <p className="text-white text-base">No country found</p>
              </div>
            ) : (
              data.data.map((data) => (
                <button
                  key={data.id}
                  onClick={() => {
                    setValue("board_type", data.id);
                    setBoard({
                      value: data.id,
                      label: data.board_name,
                    });
                    setIsShowDropdownBoard(false);
                  }}
                  className="flex w-full px-3 py-3 cursor-pointer hover:bg-zinc-700"
                >
                  <p className="text-white text-base">{data.board_name}</p>
                </button>
              ))
            )}
          </PopoverContent>
        </Popover>
      </div>
      <Button className="dark self-start font-bold" size="lg">
        Next
      </Button>
    </form>
  );
}
