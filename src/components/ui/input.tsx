import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "block px-2.5 pb-2.5 pt-5 w-full text-sm placeholder:opacity-0 focus:placeholder:opacity-100 transition text-white bg-zinc-800 dark:bg-gray-700 border-0 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 peer",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
