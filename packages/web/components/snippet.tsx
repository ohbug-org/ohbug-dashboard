import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { useCopyToClipboard } from 'react-use'

import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { cn } from '~/libs/utils'

const snippetVariants = cva(
  'inline-flex items-center rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 dark:focus:ring-stone-300',
  {
    variants: {
      variant: {
        default:
          'bg-stone-100 text-stone-900 hover:bg-stone-100/80 dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-800/80',
        destructive:
          'bg-red-500 text-stone-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/80',
        outline: 'text-stone-950 dark:text-stone-50',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof snippetVariants> {
  children: string
}

function Snippet({ className, variant, children, ...props }: BadgeProps) {
  const [state, copyToClipboard] = useCopyToClipboard()
  const [copied, setCopied] = React.useState(false)
  const handleCopy = React.useCallback(() => {
    copyToClipboard(children)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }, [children])

  return (
    <div
      className={cn(snippetVariants({ variant }), className)}
      {...props}
    >
      {children}
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center ml-2">
            {
              copied
                ? state.error
                  ? (
                    <i
                      className={cn('i-ri-error-warning-fill !h-5 !w-5')}
                      onClick={handleCopy}
                    />
                    )
                  : (
                    <i className={cn('i-ri-check-line !h-5 !w-5')} />
                    )
                : (
                  <i
                    className={cn('i-ri-file-copy-line !h-5 !w-5')}
                    onClick={handleCopy}
                  />
                  )
            }
          </div>
        </TooltipTrigger>
        <TooltipContent>{state.error?.message || 'Copy to clipboard'}</TooltipContent>
      </Tooltip>
    </div>
  )
}

export { Snippet, snippetVariants }
