import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000 // 5 seconds auto-remove

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: "default" | "destructive";
  className?: string;
};

type Action =
  | {
      type: "ADD_TOAST"
      toast: ToasterToast
    }
  | {
      type: "UPDATE_TOAST"
      toast: Partial<ToasterToast>
    }
  | {
      type: "DISMISS_TOAST"
      toastId?: ToasterToast["id"]
    }
  | {
      type: "REMOVE_TOAST"
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

let memoryState: State = { toasts: [] }
const listeners: Array<(state: State) => void> = []

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(-TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div 
      className={cn(
        "fixed right-4 top-4 z-[100] flex flex-col-reverse gap-2 p-4 sm:flex-col sm:flex-col-reverse md:flex-row md:flex-row-reverse",
        "sm:top-8 sm:right-8 md:top-10 md:right-10 lg:top-12 lg:right-12"
      )} 
      onClick={(e) => {
        // Click outside all toasts to dismiss
        if (!(e.target as Element).closest('[class*=group]')) dismiss();
      }}

    >
{toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        open,
        onOpenChange,
        className
      }) {
        return (
            <ToasterToast 
            key={id} 
            id={id}
            variant={variant}
            className={cn(
              "group pointer-events-auto relative w-80 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-[margin] duration-200 [&>svg~*]:pl-7",
              variant === "destructive" ? "destructive bg-destructive/10 border-destructive/50" : "",
              className ?? "",
              open && "animate-in slide-in-from-top-2 md:slide-in-from-right-2",
              open === false && "animate-out slide-out-to-top-2 md:slide-out-to-right-2"
            )} 
            open={open}
            onOpenChange={onOpenChange}
          >

            <div className={cn(
              "flex flex-col gap-1", variant === "destructive" ? "text-destructive-foreground text-red-400 font-semibold" : ""
            )}>
              {title && <div className="font-medium">{title}</div>}
              {description && <div className="text-sm opacity-90">{description}</div>}
            </div>
            {action}


          </ToasterToast>
        )
      })}

    </div>
  )
}

interface ToasterToastProps {
  id: string;
  className?: string;
  variant?: "default" | "destructive";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function ToasterToast({ children, ...props }: ToasterToastProps) {
  return (
    <div className={cn(props.className, "max-h-56 w-full overflow-auto")}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child) || Array.isArray(child)) {
          return child
        }
        if (child.type === "string" || child.type === "number") {
          return (
            <div>
              {child}
            </div>
          )
        }

        return child
      })}
    </div>
  )
}

export { Toaster, ToasterToast }
