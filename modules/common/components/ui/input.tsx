"use client";
import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  passwordToggle?: boolean;
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, passwordToggle, error, label, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const isPassword = type === "password" && passwordToggle;
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
        <div className="relative flex items-center w-full">
          {icon && (
            <span className="absolute left-3 flex items-center text-neutral-400 pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={isPassword ? (show ? "text" : "password") : type}
            data-slot="input"
            aria-invalid={!!error}
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              icon ? "pl-10" : "px-3",
              isPassword ? "pr-10" : "",
              error
                ? "border-red-500 focus-visible:border-red-500"
                : "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              error
                ? "ring-red-500/20 dark:ring-red-500/40"
                : "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 flex items-center text-neutral-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
              onClick={() => setShow((s) => !s)}
            >
              {show ? <LuEyeOff size={18} /> : <LuEye size={18} />}
            </button>
          )}
        </div>
        <AnimatePresence>
          {error ? (
            <motion.span
              className="text-xs text-red-500 mt-1 ml-1 capitalize"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
