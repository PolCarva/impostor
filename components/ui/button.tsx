import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-base font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] select-none",
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-primary-foreground',
          'rounded-[255px_15px_225px_15px/15px_225px_15px_255px]',
          'border-[3px] border-primary-foreground/30',
          'shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]',
          'rotate-[-0.5deg]',
          'hover:rotate-[0.5deg] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]',
          'active:rotate-0 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]',
        ],
        destructive: [
          'bg-destructive text-white',
          'rounded-[255px_15px_225px_15px/15px_225px_15px_255px]',
          'border-[3px] border-destructive-foreground/30',
          'shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]',
          'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]',
          'active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]',
        ],
        outline: [
          'bg-background text-foreground',
          'rounded-[100px_10px_100px_10px/10px_100px_10px_100px]',
          'border-[3px] border-border',
          'shadow-[3px_3px_0_0_var(--border)]',
          'hover:border-primary hover:shadow-[4px_4px_0_0_var(--primary)] hover:translate-x-[-1px] hover:translate-y-[-1px]',
          'active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_var(--border)]',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'rounded-[100px_15px_100px_15px/15px_100px_15px_100px]',
          'border-[3px] border-secondary-foreground/20',
          'shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]',
          'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.2)]',
          'active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]',
        ],
        ghost: [
          'rounded-[20px_5px_20px_5px/5px_20px_5px_20px]',
          'border-2 border-transparent',
          'hover:bg-accent/50 hover:border-accent hover:text-accent-foreground',
          'active:scale-95',
        ],
        link: 'text-primary underline-offset-4 hover:underline decoration-wavy',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-4 py-1.5 text-sm',
        lg: 'h-14 px-8 py-3 text-lg',
        icon: 'size-11 rounded-[20px_8px_20px_8px/8px_20px_8px_20px]',
        'icon-sm': 'size-9 rounded-[15px_5px_15px_5px/5px_15px_5px_15px]',
        'icon-lg': 'size-14 rounded-[25px_10px_25px_10px/10px_25px_10px_25px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
