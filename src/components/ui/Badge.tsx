import { cva, type VariantProps } from 'class-variance-authority';

const badge = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
  {
    variants: {
      variant: {
        green: 'bg-brand/10 text-brand border-brand/20',
        red:   'bg-red-50 text-red-600 border-red-200',
        gray:  'bg-gray-100 text-gray-500 border-gray-200',
      },
    },
    defaultVariants: {
      variant: 'gray',
    },
  }
);

interface BadgeProps extends VariantProps<typeof badge> {
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={badge({ variant })}>
      {children}
    </span>
  );
}