import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
        'border-[3px] border-border bg-background/80 text-foreground',
        'h-12 w-full min-w-0 px-4 py-2 text-base font-playful',
        'rounded-[100px_15px_100px_15px/15px_100px_15px_100px]',
        'shadow-[3px_3px_0_0_var(--border)]',
        'transition-all duration-200',
        'outline-none',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus:border-primary focus:shadow-[4px_4px_0_0_var(--primary)] focus:translate-x-[-1px] focus:translate-y-[-1px] focus:scale-[1.01]',
        'aria-invalid:border-destructive aria-invalid:shadow-[3px_3px_0_0_var(--destructive)]',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
