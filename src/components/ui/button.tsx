import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border text-[11px] font-medium tracking-[0.18em] uppercase transition-colors disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        ghost:
          "border-transparent bg-transparent text-white/45 hover:text-white",
        active: "border-white/15 bg-white/10 text-white",
        outline:
          "border-white/15 bg-transparent text-white/70 hover:border-white/40 hover:text-white",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "sm",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
