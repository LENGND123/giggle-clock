import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm transition-colors disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        ghost:
          "bg-[var(--pill)] px-3.5 py-1.5 text-[var(--ink)] shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:brightness-105",
        active: "bg-[var(--ink)] px-3.5 py-1.5 text-[var(--bg)]",
        icon: "size-10 bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:scale-[1.03]",
      },
      size: {
        sm: "",
        md: "",
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
