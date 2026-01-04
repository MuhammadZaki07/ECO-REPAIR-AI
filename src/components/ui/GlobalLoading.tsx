import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import Logo from "../Logo"

export default function GlobalLoading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let value = 0

    const interval = setInterval(() => {
      value += Math.random() * 10

      if (value >= 90) {
        setProgress(90)
        clearInterval(interval)
      } else {
        setProgress(value)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md">
      <div className="w-[300px] space-y-3">
        <div className="w-20 mx-auto animate-pulse">
            <Logo />
        </div>

        <p className="text-center text-sm font-medium text-muted-foreground">
          Loading {Math.floor(progress)}%
        </p>
        <Progress value={progress} />
      </div>
    </div>
  )
}
