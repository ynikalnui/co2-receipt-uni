import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold rounded-2xl cursor-pointer',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/20 active:scale-95',
        outline: 'border-2 border-brand text-brand hover:bg-brand/10 active:scale-95',
        ghost:   'text-brand hover:bg-brand/10 active:scale-95',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-7 py-3.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant,
  size,
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={button({ variant, size, className })}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}