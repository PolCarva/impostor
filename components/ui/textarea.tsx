import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
        'border-[3px] border-border bg-background/80 text-foreground',
        'min-h-[100px] w-full min-w-0 px-4 py-3 text-base font-playful',
        'rounded-[30px_10px_30px_10px/10px_30px_10px_30px]',
        'shadow-[3px_3px_0_0_var(--border)]',
        'transition-all duration-200',
        'outline-none resize-none',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus:border-primary focus:shadow-[4px_4px_0_0_var(--primary)] focus:translate-x-[-1px] focus:translate-y-[-1px]',
        'aria-invalid:border-destructive aria-invalid:shadow-[3px_3px_0_0_var(--destructive)]',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
