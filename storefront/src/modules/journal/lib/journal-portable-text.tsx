import type { ReactNode } from "react"
import type { PortableTextComponents } from "@portabletext/react"

export const journalPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { url?: string; caption?: string; alt?: string }
    }) => (
      <figure className="my-16 md:my-20 -mx-4 md:-mx-12 lg:-mx-24">
        <div className="border border-neutral-200">
          {value.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value.url}
              alt={value.alt || "Article image"}
              className="w-full h-auto"
              loading="lazy"
            />
          ) : null}
        </div>
        {value.caption ? (
          <figcaption className="mt-4 text-center text-sm font-mono text-neutral-400 px-4">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-20 mb-8 border-l-4 border-deepBlack pl-4 -ml-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold tracking-tight mt-16 mb-6 text-neutral-800">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold tracking-tight mt-12 mb-4 text-neutral-700">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-16 py-8 px-8 md:px-12 bg-concrete/50 border-l-4 border-deepBlack relative">
        <span
          className="absolute top-4 left-4 text-6xl text-neutral-200 font-serif leading-none select-none"
          aria-hidden
        >
          &ldquo;
        </span>
        <div className="text-xl md:text-2xl font-light italic text-neutral-700 leading-relaxed relative z-10">
          {children}
        </div>
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-lg md:text-xl leading-[1.8] text-neutral-600 mb-8 selection:bg-deepBlack selection:text-white">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-deepBlack">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-neutral-700">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-sm bg-concrete px-2 py-1 rounded text-deepBlack">
        {children}
      </code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string }
      children?: ReactNode
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-deepBlack underline decoration-2 underline-offset-4 decoration-neutral-300 hover:decoration-deepBlack transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-deepBlack focus-visible:ring-offset-2 rounded"
      >
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-8 space-y-3 pl-6 list-disc marker:text-deepBlack">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-8 space-y-3 pl-6 list-decimal marker:text-deepBlack">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg text-neutral-600 leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg text-neutral-600 leading-relaxed">{children}</li>
    ),
  },
}
