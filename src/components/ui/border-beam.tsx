"use client"

import { motion, Transition } from "framer-motion"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  /**
   * The size of the border beam.
   */
  size?: number
  /**
   * The duration of the border beam.
   */
  duration?: number
  /**
   * The delay of the border beam.
   */
  delay?: number
  /**
   * The color of the border beam from.
   */
  colorFrom?: string
  /**
   * The color of the border beam to.
   */
  colorTo?: string
  /**
   * The motion transition of the border beam.
   */
  transition?: Transition
  /**
   * The class name of the border beam.
   */
  className?: string
  /**
   * The style of the border beam.
   */
  style?: React.CSSProperties
  /**
   * Whether to reverse the animation direction.
   */
  reverse?: boolean
  /**
   * The initial offset position (0-100).
   */
  initialOffset?: number
  /**
   * The border width of the beam.
   */
  borderWidth?: number
}

export const BorderBeam = ({
  className,
  size = 100,
  delay = 0,
  duration = 8,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  transition,
  style,
  reverse = false,
  borderWidth = 2,
}: BorderBeamProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
          borderRadius: "inherit",
        } as React.CSSProperties
      }
    >
      {/* Top beam */}
      <motion.div
        className={cn(
          "absolute h-[var(--border-beam-width)] w-full",
          "bg-gradient-to-r from-transparent via-[var(--color-from)] to-transparent",
          "opacity-60",
          className
        )}
        style={
          {
            "--color-from": colorFrom,
            "--color-to": colorTo,
            top: 0,
            left: 0,
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
            ...style,
          } as React.CSSProperties
        }
        initial={{ x: reverse ? "100%" : "-100%" }}
        animate={{
          x: reverse ? ["100%", "-100%"] : ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
      {/* Right beam */}
      <motion.div
        className={cn(
          "absolute w-[var(--border-beam-width)] h-full",
          "bg-gradient-to-b from-transparent via-[var(--color-to)] to-transparent",
          "opacity-60",
          className
        )}
        style={
          {
            "--color-from": colorFrom,
            "--color-to": colorTo,
            top: 0,
            right: 0,
            borderTopRightRadius: "inherit",
            borderBottomRightRadius: "inherit",
            ...style,
          } as React.CSSProperties
        }
        initial={{ y: reverse ? "-100%" : "100%" }}
        animate={{
          y: reverse ? ["-100%", "100%"] : ["100%", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay + duration / 4,
          ...transition,
        }}
      />
      {/* Bottom beam */}
      <motion.div
        className={cn(
          "absolute h-[var(--border-beam-width)] w-full",
          "bg-gradient-to-l from-transparent via-[var(--color-from)] to-transparent",
          "opacity-60",
          className
        )}
        style={
          {
            "--color-from": colorFrom,
            "--color-to": colorTo,
            bottom: 0,
            left: 0,
            borderBottomLeftRadius: "inherit",
            borderBottomRightRadius: "inherit",
            ...style,
          } as React.CSSProperties
        }
        initial={{ x: reverse ? "-100%" : "100%" }}
        animate={{
          x: reverse ? ["-100%", "100%"] : ["100%", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay + duration / 2,
          ...transition,
        }}
      />
      {/* Left beam */}
      <motion.div
        className={cn(
          "absolute w-[var(--border-beam-width)] h-full",
          "bg-gradient-to-t from-transparent via-[var(--color-to)] to-transparent",
          "opacity-60",
          className
        )}
        style={
          {
            "--color-from": colorFrom,
            "--color-to": colorTo,
            top: 0,
            left: 0,
            borderTopLeftRadius: "inherit",
            borderBottomLeftRadius: "inherit",
            ...style,
          } as React.CSSProperties
        }
        initial={{ y: reverse ? "100%" : "-100%" }}
        animate={{
          y: reverse ? ["100%", "-100%"] : ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay + (duration * 3) / 4,
          ...transition,
        }}
      />
    </div>
  )
}

