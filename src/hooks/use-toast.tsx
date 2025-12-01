import * as React from "react"
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toaster"

type ToastOptions = {
  title: string
  description?: string,
  variant?:string
}

const ToastContext = React.createContext<{ toast: (options: ToastOptions) => void } | undefined>(undefined)

export const ToastProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastOptions[]>([])

  const toast = (options: ToastOptions) => {
    setToasts(prev => [...prev, options])
    setTimeout(() => {
      setToasts(prev => prev.slice(1))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        {toasts.map((t, i) => (
          <Toast className="flex flex-col gap-1.5 justify-start items-start" key={i}>
            <ToastTitle>{t.title}</ToastTitle>
            {t.description && <ToastDescription>{t.description}</ToastDescription>}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within ToastProviderWrapper")
  return context
}
