import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 hover:scale-[1.02] hover:-translate-y-[1px]",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(to_right,_hsl(var(--background))_0%,_#024d3f_50%,_#02DFA6_100%)] text-primary-foreground shadow-sm shadow-primary/10 hover:shadow-md hover:shadow-primary/15 hover:bg-[linear-gradient(to_right,_hsl(var(--background))_0%,_#02DFA6_50%,_#024d3f_100%)] border border-primary/10",
        destructive:
          "bg-gradient-to-r from-destructive via-destructive/90 to-destructive/80 text-destructive-foreground shadow-sm hover:shadow-md hover:shadow-destructive/15",
        outline:
          "border border-input bg-gradient-to-r from-background to-background/80 shadow-sm hover:bg-gradient-to-r hover:from-accent hover:to-accent/80 hover:text-accent-foreground",
        secondary:
          "bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 text-secondary-foreground shadow-sm hover:shadow-md hover:from-secondary/90 hover:via-secondary hover:to-secondary",
        ghost: "hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
