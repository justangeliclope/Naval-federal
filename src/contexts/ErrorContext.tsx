import * as React from "react"
import { ErrorDialog } from "@/components/ui/error-dialog"

interface ErrorContextType {
  showError: (message: string, onRetry?: () => void) => void
  clearError: () => void
}

const ErrorContext = React.createContext<ErrorContextType | null>(null)

export function useError() {
  const context = React.useContext(ErrorContext)
  if (!context) {
    throw new Error("useError must be used within ErrorProvider")
  }
  return context
}

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState<{ message: string; onRetry?: () => void } | null>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearError = React.useCallback(() => {
    setError(null)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const showError = React.useCallback((message: string, onRetry?: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    setError({ message, onRetry })
    
    timeoutRef.current = setTimeout(() => {
      setError(null)
      timeoutRef.current = null
    }, 3000)
  }, [])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <ErrorContext.Provider value={{ showError, clearError }}>
      {children}
      {error && (
        <ErrorDialog
          open={true}
          onOpenChange={clearError}
          message={error.message}
          onRetry={() => {
            error.onRetry?.()
            clearError()
          }}
        />
      )}
    </ErrorContext.Provider>
  )
}