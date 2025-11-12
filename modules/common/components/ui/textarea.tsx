"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/modules/common/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: string;
  label?: string;
}

function Textarea({ className, error, label, ...props }: TextareaProps) {
  return (
    <div className={cn("relative flex flex-col w-full", className)}>
      {label && (
        <label
          className="mb-1 text-sm font-medium text-neutral-900"
          htmlFor={props.id || props.name}
        >
          {label}
          {props.required && <span className="text-blue">*</span>}
        </label>
      )}
      <textarea
        data-slot="textarea"
        aria-invalid={!!error}
        className={cn(
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error
            ? "border-red-500 focus-visible:border-red-500"
            : "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          error
            ? "ring-red-500/20 dark:ring-red-500/40"
            : "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
        {...props}
      />
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export { Textarea };
