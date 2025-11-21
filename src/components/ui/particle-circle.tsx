/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    p5: any
    gsap: any
  }
}

interface ParticleCircleProps {
  particleCount?: number
  shrinkDuration?: number
  growDuration?: number
  colors?: string[]
  baseRadius?: number
  particleSize?: [number, number]
  enableBlendMode?: boolean
  size?: number
}

export function ParticleCircle({
  particleCount,
  shrinkDuration = 8,
  growDuration = 8,
  colors = ["#393e46", "#00adb5", "#393e46", "#00adb5", "#e6eeef"],
  baseRadius = 0.35,
  particleSize = [2, 8],
  enableBlendMode = true,
  size,
}: ParticleCircleProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (sketchRef.current) return // hanya buat 1 canvas

    const loadScripts = async () => {
      if (typeof window === "undefined") return

      // Load p5.js
      if (!window.p5) {
        const p5Script = document.createElement("script")
        p5Script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"
        document.head.appendChild(p5Script)
        await new Promise((resolve) => (p5Script.onload = resolve))
      }

      // Load GSAP
      if (!window.gsap) {
        const gsapScript = document.createElement("script")
        gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        document.head.appendChild(gsapScript)
        await new Promise((resolve) => (gsapScript.onload = resolve))
      }

      initSketch()
    }

    const initSketch = () => {
      if (!window.p5 || !window.gsap) return

      const sketch = (p: any) => {
        const particles: any[] = []
        const amount =
          particleCount ?? (p.windowWidth < 600 || p.windowHeight < 600 ? 1000 : 2000)
        const durationShrink = shrinkDuration
        const durationGrow = growDuration
        const total = durationShrink + durationGrow
        const theme = colors
        const proxy = { progress: 1, val: 0 }

        let progress: any
        let interpolator: any

        class Particle {
          i: number
          cos: number
          sin: number
          r: number
          offset: number
          color: string

          constructor(i: number) {
            this.i = i
            this.cos = p.cos(i * p.TWO_PI)
            this.sin = p.sin(i * p.TWO_PI)
            this.r = p.floor(p.random(particleSize[0], particleSize[1]))
            this.offset = p.pow(p.random(1, 2), 2.5) * p.random(-0.015, 0.015)
            this.color = p.random(theme)
          }

          draw() {
            interpolator.progress((proxy.progress + this.i) % 1)
            const r = p.width * (baseRadius + proxy.val * this.offset)
            const x = this.cos * r + p.width / 2
            const y = this.sin * r + p.width / 2
            p.fill(this.color)
            p.circle(x, y, this.r)
          }
        }

        p.setup = () => {
          const canvasSize = size ?? p.min(p.windowWidth, p.windowHeight)
          const canvas = p.createCanvas(canvasSize, canvasSize)
          canvas.parent(containerRef.current)
          p.noStroke()

          if (enableBlendMode && navigator.userAgent.indexOf("Firefox") < 0) {
            p.blendMode(p.SCREEN)
          }

          const gsap = window.gsap
          progress = gsap.to(proxy, {
            progress: 0,
            ease: "none",
            duration: total,
            repeat: -1,
          })

          interpolator = gsap
            .timeline({ paused: true, reverse: true })
            .to(proxy, { val: 1, duration: durationShrink, ease: "elastic.in(1.5, 0.15)" })
            .to(proxy, { val: 0, duration: durationGrow, ease: "back.in(3)" })

          for (let i = 0; i < amount; i++) {
            particles.push(new Particle(i / amount))
          }
        }

        p.windowResized = () => {
          const canvasSize = size ?? p.min(p.windowWidth, p.windowHeight)
          p.resizeCanvas(canvasSize, canvasSize)
        }

        const onMove = (x: number, y: number) => {
          let mouseAngle = p.atan2(y - p.height / 2, x - p.width / 2)
          mouseAngle = mouseAngle < 0 ? mouseAngle + p.TWO_PI : mouseAngle
          mouseAngle = p.abs(mouseAngle / p.TWO_PI) * total
          progress.time(mouseAngle)
        }

        p.touchMoved = () => {
          if (p.touches.length === 0) return
          onMove(p.touches[0].x, p.touches[0].y)
        }

        p.draw = () => {
          p.clear()
          particles.forEach((particle) => particle.draw())
        }
      }

      // buat canvas
      sketchRef.current = new window.p5(sketch)
    }

    loadScripts()

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove()
        sketchRef.current = null
      }
    }
  }, [
    particleCount,
    shrinkDuration,
    growDuration,
    colors,
    baseRadius,
    particleSize,
    enableBlendMode,
    size,
  ])

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      ref={containerRef}
    />
  )
}
