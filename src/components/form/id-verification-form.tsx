import React, { useState, useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { FieldErrors, useFormContext } from "react-hook-form";
import { IdVerificationSchema } from "./form-config";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Cross2Icon, FileIcon } from "@radix-ui/react-icons";

export default function IdVerificationForm({
  onSubmitSuccess,
  isSubmitting,
}: {
  onSubmitSuccess: (isValid: boolean) => void;
  isSubmitting: boolean;
}) {
  const [file, setFile] = useState<FileWithPath>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });

  const { handleSubmit, setValue, resetField } =
    useFormContext<z.infer<typeof IdVerificationSchema>>();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setValue("id_card", acceptedFiles[0]);
    }
  }, [acceptedFiles, setValue]);

  const handleOnValid = (data: z.infer<typeof IdVerificationSchema>) => {
    onSubmitSuccess(true);
  };

  const handleOnError = (
    errors: FieldErrors<{
      id_card: File;
    }>
  ) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  };

  const handleResetFile = () => {
    setFile(undefined);
    resetField("id_card", { defaultValue: undefined });
  };

  return (
    <form onSubmit={handleSubmit(handleOnValid, handleOnError)}>
      <p className="text-sm font-light">
        Help us verify your identity by uploading a photo of your ID/KTP or
        Passport
      </p>
      <div className="my-10">
        {file ? (
          <div className="bg-zinc-900 flex px-6 items-center py-5 gap-6">
            <FileIcon className="w-6 h-6 text-lime-400" />
            <div className="flex-1">
              <p className="text-sm">{file.path}</p>
              <p className="text-sm text-gray-400">{file.size / 100}KB</p>
            </div>
            <Cross2Icon
              className="text-red-500 w-6 h-6"
              onClick={handleResetFile}
            />
          </div>
        ) : (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className="bg-zinc-900 flex flex-col text-center justify-center p-4 gap-2">
              <p className="font-semibold">Drag & Drop</p>
              <p className="font-light text-gray-400 text-sm">
                or select files from device max. 2MB
              </p>
              <p className="font-light underline mt-4">Upload</p>
            </div>
          </div>
        )}
      </div>

      <Button
        className="dark self-start font-bold"
        size="lg"
        disabled={isSubmitting}
      >
        Book My Visit
      </Button>
    </form>
  );
}
