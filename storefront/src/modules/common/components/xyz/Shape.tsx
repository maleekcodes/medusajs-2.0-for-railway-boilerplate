import type { CSSProperties, ReactNode } from "react"

import type { ShapeType } from "@/types/xyz"

interface ShapeProps {
  type: ShapeType
  className?: string
  children?: ReactNode
}

export function Shape({ type, className = "", children }: ShapeProps) {
  const baseClasses =
    "flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-105"

  let style: CSSProperties = {}
  let shapeClasses = ""

  switch (type) {
    case "circle":
      shapeClasses = "rounded-full aspect-square"
      break
    case "square":
      shapeClasses = "aspect-square"
      break
    case "triangle":
      style = { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }
      shapeClasses = "aspect-square"
      break
    case "rhombus":
      style = { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }
      shapeClasses = "aspect-square"
      break
    case "trapezoid":
      style = { clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }
      shapeClasses = "aspect-[4/3]"
      break
    case "pentagon":
      style = {
        clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
      }
      shapeClasses = "aspect-square"
      break
    case "hexagon":
      style = {
        clipPath:
          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      }
      shapeClasses = "aspect-[1/1.15]"
      break
    case "octagon":
      style = {
        clipPath:
          "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      }
      shapeClasses = "aspect-square"
      break
    case "ellipse":
      shapeClasses = "rounded-[50%] aspect-[3/2]"
      break
    case "curve":
      shapeClasses = "rounded-t-full aspect-[4/3]"
      break
    default:
      shapeClasses = "aspect-square"
  }

  return (
    <div
      className={`${baseClasses} ${shapeClasses} ${className}`}
      style={style}
    >
      {children}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/20 pointer-events-none mix-blend-overlay" />
    </div>
  )
}
