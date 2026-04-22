import type { ShapeType } from "@/types/xyz"

const VALID: ShapeType[] = [
  "circle",
  "square",
  "triangle",
  "rhombus",
  "trapezoid",
  "pentagon",
  "hexagon",
  "octagon",
  "ellipse",
  "curve",
]

export function asShapeType(value: unknown, fallback: ShapeType): ShapeType {
  if (typeof value === "string" && VALID.includes(value as ShapeType)) {
    return value as ShapeType
  }
  return fallback
}
