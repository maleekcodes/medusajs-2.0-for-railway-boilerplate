import type { ReactNode } from "react"
import type { PortableTextComponents } from "@portabletext/react"

export const introPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-xl md:text-2xl font-light leading-relaxed text-deepBlack">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-deepBlack">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({
      value,
      children,
    }: {
      value?: { href?: string }
      children?: ReactNode
    }) => (
      <a
        href={value?.href}
        className="underline decoration-neutral-300 underline-offset-4 hover:decoration-deepBlack"
      >
        {children}
      </a>
    ),
  },
}
