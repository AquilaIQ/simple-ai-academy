"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-xl";

    const variants = {
      primary:
        "bg-secondary-container text-white hover:bg-secondary-container/90 shadow-lg",
      secondary:
        "bg-primary text-white hover:bg-primary/90 shadow-lg",
      outline:
        "border-2 border-primary text-primary bg-transparent hover:bg-primary/10",
      ghost:
        "text-primary bg-transparent hover:bg-primary/10",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-10 px-6 text-base",
      lg: "h-12 px-8 text-base",
      xl: "h-14 px-10 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
